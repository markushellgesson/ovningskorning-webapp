#!/usr/bin/env tsx
/**
 * Exporterar läroplansinnehåll från granskad databas till JSON.
 *
 * Dumpar från den körande utvecklingsdatabasen, inte från seed-filer.
 * Innehållet har granskats två gånger av domänvakten — att härleda det
 * på nytt riskerar att återinföra fel som redan fångats. (ADR 0013)
 */

import { PrismaClient } from '../../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Använd samma DATABASE_URL som huvudappen
const connectionString = process.env.DATABASE_URL ||
  'postgresql://ovning:ovning@localhost:5432/ovningskorning?schema=public';

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function exportContent() {
  console.log('📖 Läser innehåll från databas...');

  try {
    // Hämta alla skills med relationer
    const skills = await prisma.skill.findMany({
      include: {
        prerequisites: {
          select: {
            prerequisiteSkillId: true,
            minimumState: true,
          },
        },
        theoryRelations: {
          select: {
            theoryTopicId: true,
            relationType: true,
          },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });

    // Hämta teoriämnen
    const theoryTopics = await prisma.theoryTopic.findMany({
      orderBy: { id: 'asc' },
    });

    // Hämta övningar
    const exercises = await prisma.exercise.findMany({
      orderBy: { id: 'asc' },
    });

    // Hämta trafikmiljöer
    const trafficEnvironments = await prisma.trafficEnvironment.findMany({
      orderBy: { id: 'asc' },
    });

    // Hämta handledarfraser
    const supervisorPhrases = await prisma.supervisorPhrase.findMany({
      orderBy: { id: 'asc' },
    });

    // Hämta regelkällor
    const regulatorySources = await prisma.regulatorySource.findMany({
      orderBy: { id: 'asc' },
    });

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
        requiredEnvironments: e.requiredEnvironments,
        sourceVersion: e.sourceVersion,
      })),
      trafficEnvironments: trafficEnvironments.map((te) => ({
        id: te.id,
        type: te.type,
        name: te.name,
        description: te.description,
        characteristics: te.characteristics,
        relevantSkills: te.relevantSkills,
        sourceVersion: te.sourceVersion,
      })),
      supervisorPhrases: supervisorPhrases.map((sp) => ({
        id: sp.id,
        skillId: sp.skillId,
        type: sp.type,
        text: sp.text,
        context: sp.context,
        sourceVersion: sp.sourceVersion,
      })),
      regulatorySources: regulatorySources.map((rs) => ({
        id: rs.id,
        authority: rs.authority,
        title: rs.title,
        url: rs.url,
        relevantSections: rs.relevantSections,
        sourceVersion: rs.sourceVersion,
      })),
      exportedAt: new Date().toISOString(),
      databaseVersion: '1.0',
    };

    // Skriv till content.json
    const outputPath = join(__dirname, '../src/content/content.json');
    writeFileSync(outputPath, JSON.stringify(content, null, 2), 'utf-8');

    console.log('✅ Export klar:');
    console.log(`   ${skills.length} moment`);
    console.log(`   ${theoryTopics.length} teoriämnen`);
    console.log(`   ${exercises.length} övningar`);
    console.log(`   ${trafficEnvironments.length} trafikmiljöer`);
    console.log(`   ${supervisorPhrases.length} handledarfraser`);
    console.log(`   ${regulatorySources.length} regelkällor`);
    console.log(`   → ${outputPath}`);
  } catch (error) {
    console.error('❌ Export misslyckades:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

exportContent();
