import { CATEGORY_LABELS } from '@/content/category-labels';
import { PageBody, PageHeader, PageShell } from '@/components/ui/page-shell';
import { RowLink } from '@/components/ui/list-row';
import { Hopfallbart } from '@/components/ui/section';
import { OrdningLista, type OrdningSteg } from '@/components/pass/ordning-lista';
import { skills, progressionMap, continuousByCategory, passSteg, stepTitle } from './plan-data';

const steg: OrdningSteg[] = progressionMap.levels.map((level, index) => ({
  nummer: index + 1,
  titel: stepTitle(level),
  antalPass: passSteg[index].grupper.length,
}));

const antalLopande = [...continuousByCategory.values()].reduce((n, v) => n + v.length, 0);

export const metadata = {
  title: 'Ordning',
};

/**
 * Ordning (docs/designsprak.md 7.3) — resan.
 *
 * Det livfulla är VÄGEN: ett lodrätt asfaltband 28 px brett, 20 px in från
 * vänsterkanten, med streckad mittlinje, som börjar under ingressen och
 * slutar efter steg 15 med rundad ände. På bandet står femton stolpar.
 * Ordningen är en resa, inte en lista — och en räls av hårfina linjer sa
 * "katalog" där bandet säger "sträcka".
 *
 * Bandet och mittlinjen ritas av `Vag` som två absolut placerade lager under
 * innehållet; stationerna ligger i eget lager ovanpå (`Vagstation`). Därför
 * behöver bandet aldrig känna till hur höga stationerna är: det tar sin
 * längd ur listan, inte tvärtom, och vägen kan inte gå av mellan två steg.
 *
 * Stolpen är 40 px bred och står med vänsterkanten i noll — bandet ligger
 * 6 px in och är 28 px brett, så båda har sin mitt på 20 px. Stolpen står
 * alltså PÅ bandet, inte bredvid det, och täcker asfalten bakom sig.
 *
 * Tryckåterkopplingen kan inte vara en bakgrund på hela raden: raden ligger
 * ovanför bandet och en ton över hela bredden hade målat över vägen vid
 * varje tryck. Tonen ritas därför som ett eget lager som börjar 40 px in —
 * exakt där stolpen slutar — så att asfalten aldrig skyms. Stationen är
 * 72 px hög över hela bredden, alltså långt över 48 px träffyta: det går
 * att träffa med tummen utan att sikta.
 *
 * Det lugna: allt utanför bandet. Den enda raden text ovanför vägen, och
 * "Tränas löpande" hopfälld bakom en rubrik, med en 3 px HELDRAGEN blå linje
 * till vänster — heldragen linje betyder att man inte lämnar den. Det är
 * samma grammatik som vägens streckade mittlinje, bara i motsats.
 *
 * Progress ritas nu, till skillnad från förut. Beslutet att låta bli
 * (designsprak.md 10) byggde på att appen saknade status att visa. Den har
 * en nu: avslutade poster i passloggen härleder nästa pass, och den är
 * därför sann och inte påhittad. Stolparna bär den — passerat grönt med
 * bock, nästa med grön bård.
 */
export default function PlanPage() {
  return (
    <PageShell>
      <PageHeader
        back={{ href: '/', label: 'Nästa pass' }}
        title="Ordning"
        lead={`En möjlig ordning genom de ${skills.length} momenten`}
      />

      <PageBody>
        <div>
          <p className="max-w-[var(--measure)] text-lg text-ink">
            Femton steg. Öva klart ett innan ni går vidare.
          </p>

          <OrdningLista steg={steg} passSteg={passSteg} />
        </div>

        {/* Hopfälld: 32 momentnamn i tio kategorier är en lista man slår
            upp, inte en man läser. Rubriken säger vad som finns bakom. */}
        <Hopfallbart title={`Tränas löpande — ${antalLopande} moment`} accent="var(--blue-text)">
          <div className="mt-6 space-y-6">
            {[...continuousByCategory.entries()].map(([category, categorySkills]) => (
              <div key={category}>
                <h3 className="text-lg leading-[1.35] font-semibold text-ink">
                  {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ?? category}
                </h3>
                {/* Den heldragna blå linjen: momenten här checkas inte av
                    och lämnas bakom, och linjen bryts därför inte. */}
                <ul className="mt-1.5 divide-y divide-line border-l-[3px] border-blue-text pl-3">
                  {categorySkills.map((skill) => (
                    <li key={skill.id}>
                      <RowLink href={`/skills/${skill.id}`}>
                        <span className="min-w-0 flex-1">
                          <span className="block text-base font-semibold text-ink">
                            {skill.name}
                          </span>
                        </span>
                      </RowLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Hopfallbart>

        {/* Råden om hur man lägger upp ett pass fanns som en egen sida på
            tusen ord. De står hos myndigheten, är korrekta där, och behöver
            inte hysas i appen. */}
        <p className="border-t border-line pt-7">
          <a
            href="https://www.transportstyrelsen.se/sv/vagtrafik/Korkort/ta-korkort/ovningskorning/planera-ovningskorningen/"
            className="text-base font-semibold text-blue-text"
          >
            Råd till handledaren — Transportstyrelsen → (öppnas på transportstyrelsen.se)
          </a>
        </p>

        <footer className="border-t border-line pt-5">
          <p className="text-sm text-ink-3">Framstegen sparas bara i den här webbläsaren.</p>
        </footer>
      </PageBody>
    </PageShell>
  );
}
