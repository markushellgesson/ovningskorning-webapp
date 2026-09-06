'use client';

import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';
import { RowLink } from '@/components/ui/list-row';
import { Stolpe } from '@/components/ui/stolpe';
import { getCurrentStep, saveCurrentStep } from '@/storage/storage';

export interface PassMoment {
  id: string;
  namn: string;
  continuous: boolean;
}

export interface PassGrupp {
  id: string;
  moment: PassMoment[];
}

export interface PassSteg {
  nummer: number;
  titel: string;
  grupper: PassGrupp[];
}

interface PassProps {
  steg: PassSteg[];
  /**
   * Sätt för stegsidan, som alltid visar ett bestämt steg. Utelämnas på
   * startsidan, som visar det steg paret är på just nu.
   */
  fastSteg?: number;
  /**
   * Plats mellan rubriken och momentlistan. Stegsidan sätter sin
   * sträckindikator här; startsidan lämnar den tom, eftersom stolpen och
   * "av 15" redan säger var man är och startsidan har en ordbudget.
   */
  underRubrik?: ReactNode;
  /**
   * Stegets titel är sidans h1 på stegsidan, men en h2 på startsidan, där
   * h1 är "Nästa pass". Nivån är alltså sidans att bestämma, inte vyns.
   */
  rubrikNivå?: 'h1' | 'h2';
}

/** Innan lagringen lästs vet vi inte vilket steg som gäller. */
type Läge = { status: 'laddar' } | { status: 'klar'; steg: number } | { status: 'ingen-lagring' };

/**
 * Passvyn — appens enda läge.
 *
 * Appen hade tre dörrar och ingen första handling: 75 moment, 15 steg och en
 * sida på tusen ord om upplägg, varav ingen sa "gör det här nu". Den här
 * vyn ersätter dem. Man öppnar appen och ser det steg man är på, momenten
 * som ingår, och en knapp som för en vidare. Inget annat.
 *
 * Att den är en klientkomponent följer av att appen är statiskt exporterad
 * (ADR 0013). Vilket steg som är aktuellt kan inte avgöras vid bygget, så
 * alla femton stegen skickas med som data och ett väljs i webbläsaren. Det
 * är billigt: ett steg är en titel och en handfull momentnamn.
 *
 * Under första renderingen står `laddar`, inte steg 1. Att visa steg 1 och
 * sedan byta till steg 7 hade blinkat fel innehåll i ansiktet på den som
 * öppnar appen, och det är just det ögonblick appen finns till för.
 */
export function Pass({ steg, fastSteg, underRubrik, rubrikNivå = 'h2' }: PassProps) {
  const [läge, setLäge] = useState<Läge>(
    fastSteg ? { status: 'klar', steg: fastSteg } : { status: 'laddar' },
  );

  useEffect(() => {
    if (fastSteg) return;
    const lagrat = getCurrentStep();
    setLäge(lagrat === null ? { status: 'ingen-lagring' } : { status: 'klar', steg: lagrat });
  }, [fastSteg]);

  const totalt = steg.length;
  const passerat = läge.status === 'klar' && läge.steg > totalt;
  const nummer = läge.status === 'klar' ? Math.min(läge.steg, totalt) : 1;
  const aktuellt = steg[nummer - 1];
  const Rubrik = rubrikNivå;

  function gåVidare() {
    const nästa = nummer + 1;
    saveCurrentStep(nästa);
    setLäge({ status: 'klar', steg: nästa });
    window.scrollTo({ top: 0 });
  }

  function börjaHär() {
    saveCurrentStep(nummer);
    setLäge({ status: 'klar', steg: nummer });
  }

  // Höjden hålls av innehållet som kommer, så sidan inte hoppar när
  // lagringen svarat. En spinner hade varit mer synlig än väntan är lång.
  if (läge.status === 'laddar') {
    return <div className="min-h-[60vh]" aria-busy="true" />;
  }

  if (passerat) {
    return (
      <div className="space-y-6">
        <p className="text-xl text-ink">Alla femton steg är passerade.</p>
        <Link href="/plan" className="inline-block text-lg font-semibold text-blue-text">
          Alla steg →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <div>
        <p className="flex items-center gap-3">
          <Stolpe number={nummer} />
          <span className="text-sm font-semibold tracking-wide text-ink-3 uppercase">
            <span className="sr-only">{`Steg ${nummer} `}</span>av {totalt}
          </span>
        </p>
        <Rubrik className="mt-3 text-3xl font-bold text-ink">{aktuellt.titel}</Rubrik>
        {underRubrik && <div className="mt-4">{underRubrik}</div>}
      </div>

      {/* Momentnamn, ett per rad, inga beskrivningar. Moment som hör ihop
          och kan tränas i samma pass står i samma lista; grupperna skiljs åt
          av en kraftigare linje. Rubriken "Hör ihop — kan tränas i samma
          pass" sa vad linjen visar, och kostade en rad per grupp. */}
      <div className="divide-y divide-line-strong border-y border-line">
        {aktuellt.grupper.map((grupp) => (
          <ul key={grupp.id} className="divide-y divide-line">
            {grupp.moment.map((moment) => (
              <li key={moment.id}>
                <RowLink href={`/skills/${moment.id}`}>
                  <span className="min-w-0 flex-1 text-base font-semibold text-ink">
                    {moment.namn}
                  </span>
                  {moment.continuous && (
                    <span className="shrink-0 text-sm text-ink-3">Tränas löpande</span>
                  )}
                </RowLink>
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Hela "Före"-avsnittet från den borttagna Upplägg-sidan, kokat till
          sina fem sakuppgifter. Det är det enda på skärmen som förklarar
          något, och det förklarar bara vad som ska ligga i bilen. */}
      <p className="max-w-[var(--measure)] text-base text-ink-2">
        Innan ni kör: körkortstillstånd, legitimation och handledargodkännande i bilen, skylten på,
        en snabb koll av bilen.
      </p>

      {läge.status === 'ingen-lagring' && (
        <p className="text-base text-ink-2">Kunde inte spara framsteget i den här webbläsaren.</p>
      )}

      {fastSteg ? (
        <Knapp onClick={börjaHär}>Börja här</Knapp>
      ) : (
        <Knapp onClick={gåVidare}>
          {nummer === totalt ? 'Vi har övat det här' : 'Vi har övat det här — nästa steg'}
        </Knapp>
      )}

      {!fastSteg && (
        <p className="flex gap-6">
          <Link href="/plan" className="text-base font-semibold text-blue-text">
            Alla steg →
          </Link>
          <Link href="/skills" className="text-base font-semibold text-blue-text">
            Alla moment →
          </Link>
        </p>
      )}
    </div>
  );
}

/**
 * Skärmens enda handling: grön, fullbredd, 56 px. Grönt betyder "vi" i
 * formspråket, och det här är det enda stället i appen där paret säger
 * något om sig själva.
 *
 * Tryck lägger --press-veil över fältet i stället för att byta kulör.
 * Knappen är skyltgrön, och skyltkulörer vänder inte — samma regel som
 * gäller vägvisaren (globals.css, avsnittet om tryckåterkoppling).
 */
function Knapp({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex min-h-14 w-full items-center justify-center overflow-hidden rounded-[var(--radius-sm)] bg-sign-green px-4 text-lg font-bold text-sign-white focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <span className="relative">{children}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[var(--press-veil)] opacity-0 transition-opacity duration-150 group-active:opacity-100 group-active:duration-0"
      />
    </button>
  );
}
