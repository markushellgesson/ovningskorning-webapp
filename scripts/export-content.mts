#!/usr/bin/env tsx
/**
 * Exporterar läroplansinnehåll från den körande, granskade databasen till
 * `src/content/content.json` (ADR 0013).
 *
 * Dumpar från databasen — härleds INTE ur `prisma/seed/*`. Innehållet har
 * redan granskats två gånger av domänvakten i huvudappen; att skriva om det
 * en tredje gång riskerar att återinföra fel som granskningarna redan
 * fångade. Se docs/decisions/0013-local-only-github-pages-variant.md.
 *
 * Körs med `npm run export-content` (i local-app/) eller `npm run
 * content:export` (i roten). Kräver att Postgres kör och är seedad
 * (`npm run db:seed` i roten).
 */

import { PrismaClient } from '../../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, '../src/content/content.json');

// Samma DATABASE_URL som huvudappen (se .env / .env.example i roten).
const connectionString =
  process.env.DATABASE_URL ??
  'postgresql://ovning:ovning@localhost:5432/ovningskorning?schema=public';

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function exportContent() {
  console.log('📖 Läser innehåll från databas...');

  const [skills, theoryTopics, exercises, trafficEnvironments, supervisorPhrases, regulatorySources] =
    await Promise.all([
      prisma.skill.findMany({
        include: {
          // Nästlade relationer sorteras explicit — Postgres ordnar annars
          // träffar efter fysisk radordning, inte efter innehåll, vilket gör
          // exporten icke-deterministisk för moment med flera förkunskaper.
          prerequisites: {
            select: { prerequisiteSkillId: true, minimumState: true },
            orderBy: { prerequisiteSkillId: 'asc' },
          },
          theoryRelations: {
            select: { theoryTopicId: true, relationType: true },
            orderBy: { theoryTopicId: 'asc' },
          },
        },
        orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
      }),
      prisma.theoryTopic.findMany({ orderBy: { id: 'asc' } }),
      prisma.exercise.findMany({ orderBy: { id: 'asc' } }),
      prisma.trafficEnvironment.findMany({ orderBy: { id: 'asc' } }),
      prisma.supervisorPhrase.findMany({ orderBy: { id: 'asc' } }),
      prisma.regulatorySource.findMany({ orderBy: { id: 'asc' } }),
    ]);

  // Fail loudly: en tom eller delvis tom databas får aldrig tyst skriva över
  // en fungerande content.json med ett tomt eller ofullständigt skal.
  const tables = { skills, theoryTopics, exercises, trafficEnvironments, supervisorPhrases, regulatorySources };
  for (const [name, rows] of Object.entries(tables)) {
    if (rows.length === 0) {
      throw new Error(
        `Databasen innehåller inga rader i "${name}". Har du kört ` +
          '`npm run db:seed` i roten? Avbryter utan att skriva content.json.',
      );
    }
  }

  // Fältnamnen i local-app/src/content/types.ts är inte identiska med
  // Prismas modeller överallt (t.ex. Exercise.environmentTypes heter
  // requiredEnvironments i typen). Dessutom saknar schema.prisma helt
  // kolumner för några fält typen förutsätter:
  //   - Exercise.sourceVersion
  //   - TrafficEnvironment.name / .characteristics / .relevantSkills / .sourceVersion
  //   - RegulatorySource.title / .relevantSections
  // De utelämnas här i stället för att fyllas i med påhittat innehåll — att
  // dumpa databasen, inte gissa, är hela poängen med det här skriptet.
  // Dokumenterad avvikelse mellan types.ts och schema.prisma, inte löst här.
  const content = {
    skills: skills.map((s) => ({
      id: s.id,
      parentId: s.parentId,
      category: s.category,
      name: s.name,
      description: s.description,
      goals: s.goals,
      practiceSteps: s.practiceSteps,
      commonErrors: s.commonErrors,
      supervisorObservations: s.supervisorObservations,
      continuous: s.continuous,
      safetyCritical: s.safetyCritical,
      applicableTransmissions: s.applicableTransmissions,
      sortOrder: s.sortOrder,
      sourceVersion: s.sourceVersion,
      prerequisites: s.prerequisites,
      theoryRelations: s.theoryRelations,
    })),
    theoryTopics: theoryTopics.map((t) => ({
      id: t.id,
      category: t.category,
      title: t.title,
      summary: t.summary,
      sourceId: t.sourceId,
      sourceVersion: t.sourceVersion,
    })),
    exercises: exercises.map((e) => ({
      id: e.id,
      skillId: e.skillId,
      title: e.title,
      description: e.description,
      difficulty: e.difficulty,
      estimatedMinutes: e.estimatedMinutes,
      requiredEnvironments: e.environmentTypes,
    })),
    trafficEnvironments: trafficEnvironments.map((te) => ({
      id: te.id,
      type: te.type,
      description: te.description,
    })),
    supervisorPhrases: supervisorPhrases.map((sp) => ({
      id: sp.id,
      skillId: sp.skillId,
      type: sp.instructionType,
      text: sp.recommendedPhrase,
      // Ingen exakt motsvarighet i schema. `reason` (varför frasen sägs) är
      // den närmaste matchningen till "context". `avoidSaying` har ingen
      // motsvarighet i typen och tappas här.
      context: sp.reason,
      sourceVersion: sp.sourceVersion,
    })),
    regulatorySources: regulatorySources.map((rs) => ({
      id: rs.id,
      authority: rs.authority,
      url: rs.sourceUrl,
      sourceVersion: rs.contentVersion,
    })),
    // Bryter medvetet determinismen — se motivering nedan.
    //
    // Alternativet vore att bara sätta exportedAt när innehållet faktiskt
    // ändrats (läsa gamla filen, jämföra, återanvända gammal tidsstämpel vid
    // oförändrat innehåll). Valt bort: det gör fältet till en proxy för
    // "innehållet ändrades" i stället för vad det säger att det är — när
    // exporten faktiskt kördes. Allt som behöver vara deterministiskt för
    // att diffar ska vara meningsfulla (sorteringen ovan) är det redan; att
    // frysa tidsstämpeln adderar bara komplexitet utan att lösa ett verkligt
    // problem, och skulle dölja att en export faktiskt kördes.
    exportedAt: new Date().toISOString(),
    // Ingen databaskolumn att hämta detta ifrån — statisk markör, som i den
    // tidigare handskrivna filen.
    databaseVersion: '1.0',
  };

  const jsonText = JSON.stringify(content, null, 2);
  const prettierConfig = (await prettier.resolveConfig(OUTPUT_PATH)) ?? {};
  const formatted = await prettier.format(jsonText, {
    ...prettierConfig,
    parser: 'json',
    filepath: OUTPUT_PATH,
  });

  writeFileSync(OUTPUT_PATH, formatted, 'utf-8');

  console.log('✅ Export klar:');
  console.log(`   ${skills.length} moment`);
  console.log(`   ${theoryTopics.length} teoriämnen`);
  console.log(`   ${exercises.length} övningar`);
  console.log(`   ${trafficEnvironments.length} trafikmiljöer`);
  console.log(`   ${supervisorPhrases.length} handledarfraser`);
  console.log(`   ${regulatorySources.length} regelkällor`);
  console.log(`   → ${OUTPUT_PATH}`);
}

exportContent()
  .catch((error) => {
    console.error('❌ Export misslyckades:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
