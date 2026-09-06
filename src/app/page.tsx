import { Asfaltband } from '@/components/ui/asfaltband';
import { PageShell } from '@/components/ui/page-shell';
import { Section, SectionTitle } from '@/components/ui/section';
import { Skylt } from '@/components/ui/skylt';
import { Vagvisare } from '@/components/ui/vagvisare';
import content from '@/content';
import { progressionMap } from './plan/plan-data';

export const metadata = {
  title: 'Hem',
};

/**
 * Startsidan (docs/designsprak.md 7.1) — vägen börjar.
 *
 * Det livfulla är hero-bandet: ett fullbrett asfaltband upptill i BÅDA
 * färglägena, med skylten överst, rubriken i display-grad i --marking och
 * ingressen i --marking-dim. Bandets underkant är ett körfältsstreck — det
 * är kanten, och den behöver ingen mjukning. I ljust läge är bandet mörkt
 * mot en ljus sida, som en väg genom en sommaräng; i mörkt läge smälter det
 * nästan in och det är strecket som lyser.
 *
 * Bandet dras ur sidskalets marginaler i sidled (Asfaltband `bleed`) och ur
 * dess toppmarginal i höjdled (den negativa marginalen nedan), så att det
 * går kant i kant och ända upp. Ett band som slutar 20 px från kanten är
 * ett kort, och startsidans hero är inget kort.
 *
 * Under bandet: tre vägvisare, alla blå. Tre olika skyltkulörer för de tre
 * destinationerna valdes bort — Ordning är inte mer "grön" än
 * Träningsmoment, och tre kulörer hade gjort kulören till dekor.
 *
 * Det lugna: "Vad är detta?" som ren löptext under en hårfin linje. Ingen
 * ram, inget kort, ingen tonad yta. Täck bandet med handen, och det som är
 * kvar ska se ut som en lugn, välsatt bok.
 *
 * Antalen räknas ur innehållet i stället för att stå i klartext: sidan sa
 * en gång 47 moment när det var 57, och ingen märkte det. De står kvar i
 * beskrivningen — meningen behöver dem för att gå ihop — och upprepas till
 * höger som stolpsiffra i en vit chip, för att antalet är det man jämför
 * destinationerna med. Upplägg har inget antal och får därför ingen chip:
 * en tom chip vore ett föremål utan innebörd.
 */
const DESTINATIONS = [
  {
    href: '/skills',
    title: 'Träningsmoment',
    description: `${content.skills.length} moment med mål, övningssteg och vanliga misstag, ordnade efter område`,
    count: content.skills.length,
  },
  {
    href: '/plan',
    title: 'Ordning',
    description: `En möjlig väg genom momenten, i ${progressionMap.levels.length} steg som bygger på varandra`,
    count: progressionMap.levels.length,
  },
  {
    href: '/upplagg',
    title: 'Upplägg',
    description:
      'Hur ni lägger upp ett pass, i vilken ordning ni går vidare, och vad ni gör före varje körning',
    count: undefined,
  },
] as const;

export default function HomePage() {
  return (
    <PageShell>
      <Asfaltband bleed edge className="-mt-6 pt-7 sm:-mt-10 sm:pt-10">
        <Skylt />
        <h1
          className="mt-[18px] text-4xl font-bold text-marking"
          style={{ textShadow: 'var(--glow-text)' }}
        >
          Övningskörning B
        </h1>
        <p className="mt-2.5 max-w-[var(--measure)] text-xl text-marking-dim">
          Strukturerat stöd för privat övningskörning till B-körkort
        </p>
      </Asfaltband>

      <div className="mt-5 space-y-8">
        <nav aria-label="Innehåll">
          <ul className="space-y-3">
            {DESTINATIONS.map((destination) => (
              <li key={destination.href}>
                <Vagvisare
                  href={destination.href}
                  title={destination.title}
                  description={destination.description}
                  count={destination.count}
                />
              </li>
            ))}
          </ul>
        </nav>

        <Section>
          <SectionTitle>Vad är detta?</SectionTitle>
          <div className="mt-4 max-w-[var(--measure)] space-y-3">
            <p className="text-lg text-ink">
              Ett verktyg för elev och handledare som strukturerar övningskörningen utifrån de
              kompetenser som krävs för B-körkort. Byggt på Transportstyrelsens kursplan.
            </p>
            <p className="text-lg text-ink-2">
              Den här versionen är en demo som klarar sig utan server och körs direkt i webbläsaren.
              All data lagras lokalt på din enhet — ingen server, inget konto, ingen inloggning.
              Data stannar kvar tills du rensar webbläsardata.
            </p>
          </div>
        </Section>
      </div>
    </PageShell>
  );
}
