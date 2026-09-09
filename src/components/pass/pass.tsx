'use client';

import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';
import { RowLink } from '@/components/ui/list-row';
import { Stolpe } from '@/components/ui/stolpe';
import { Subheading } from '@/components/ui/section';
import {
  avslutandePasspost,
  avmarkeraGjort,
  härledPosition,
  loggaPass,
  markeraGjort,
  ärPassAvslutat,
  senasteUtfallFör,
  senasteNastaGang,
  skjutUppSamtal,
  uppdateraNastaGang,
} from '@/storage/storage';
import type { Passposition, Passutfall } from '@/storage/types';
import type { PassGrupp, PassSteg } from './typer';

export type { PassGrupp, PassMoment, PassSteg } from './typer';

interface PassProps {
  steg: PassSteg[];
  /**
   * Sätt för stegsidan, som alltid visar ett bestämt steg — alla dess pass.
   * Utelämnas på startsidan, som visar det pass paret är på just nu.
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

/** Innan lagringen lästs vet vi inte vilket pass som gäller. */
type Läge = { status: 'laddar' } | { status: 'klar'; pos: Passposition; nastaGang: string | null };

/** Längsta anteckning: en rad, inte en dagbok. */
const MAX_ANTECKNING = 140;

/**
 * Passvyn — appens enda läge.
 *
 * Appen hade tre dörrar och ingen första handling. Den här vyn ersatte dem:
 * man öppnar appen och ser passet man är på, momenten som ingår, och en
 * knapp. Passet är en planerad grupp i ett steg — momenten som hör ihop och tränas
 * samma kväll. Steget är stolpen vägen passerar; föräldern räknar i pass.
 *
 * Efter knappen kommer en fråga, "Hur gick det?", med tre svar och en
 * frivillig rad, "Nästa gång". Svaret avslutar passet (eller låter dem ta
 * om), och nästa pass härleds därefter ur passloggen. Det är hela loggen:
 * ett tryck, och en rad om man vill. Bocken på vägen betyder nu något,
 * eftersom "ta om" finns.
 *
 * Att vyn är en klientkomponent följer av att appen är statiskt exporterad
 * (ADR 0013). Var paret är kan inte avgöras vid bygget, så alla stegen
 * skickas med som data och ett pass väljs i webbläsaren.
 *
 * Under första renderingen står `laddar`, inte pass 1. Att visa pass 1 och
 * sedan byta till pass 7 hade blinkat fel innehåll i ansiktet på den som
 * öppnar appen, och det är just det ögonblick appen finns till för.
 */
export function Pass({ steg, fastSteg, underRubrik, rubrikNivå = 'h2' }: PassProps) {
  const [läge, setLäge] = useState<Läge>({ status: 'laddar' });
  const [fas, setFas] = useState<'pass' | 'efter'>('pass');
  // localStorage kastar i privat läge och när kvoten är full. Appen fungerar
  // ändå — men den minns inte, och det ska den säga i stället för att tiga.
  const [sparfel, setSparfel] = useState(false);
  const [föreKontroller, setFöreKontroller] = useState<string[]>([]);

  useEffect(() => {
    const pos = härledPosition(steg);
    const nastaGang = senasteNastaGang();
    setLäge({ status: 'klar', pos, nastaGang });
  }, [steg]);

  // Höjden hålls av innehållet som kommer, så sidan inte hoppar när
  // lagringen svarat. En spinner hade varit mer synlig än väntan är lång.
  if (läge.status === 'laddar') {
    return <div className="min-h-[60vh]" aria-busy="true" />;
  }

  // Bundna här, efter spärren ovan: inne i funktionerna nedan vet
  // TypeScript inte längre att läget inte kan vara "laddar".
  const { status, nastaGang } = läge;
  const totalt = steg.length;
  const Rubrik = rubrikNivå;

  if (!fastSteg && läge.pos.steg > totalt) {
    return (
      <div className="space-y-6">
        <p className="text-xl text-ink">Alla steg är passerade.</p>
        <Link href="/plan" className="inline-block text-lg font-semibold text-blue-text">
          Ordning →
        </Link>
      </div>
    );
  }

  const stegnummer = fastSteg ?? läge.pos.steg;
  const aktuelltSteg = steg[stegnummer - 1];
  const grupp = fastSteg ? 0 : Math.min(läge.pos.grupp, aktuelltSteg.grupper.length - 1);
  const pos = { steg: stegnummer, grupp };
  const passet = aktuelltSteg.grupper[grupp];
  const momentIds = passet.moment.map((moment) => moment.id);
  const föregåendeUtfall = !fastSteg ? senasteUtfallFör(momentIds) : null;
  const kanSkjutaUppSamtal =
    !fastSteg &&
    passet.typ === 'samtal' &&
    steg.some((ettSteg, stegIndex) =>
      ettSteg.grupper.some(
        (enGrupp, gruppIndex) =>
          (stegIndex > pos.steg - 1 || (stegIndex === pos.steg - 1 && gruppIndex > pos.grupp)) &&
          !ärPassAvslutat(enGrupp.moment.map((moment) => moment.id)),
      ),
    );

  function svara(utfall: Passutfall, nastaGang: string) {
    const text = nastaGang.trim() || null;
    const sparat = loggaPass({
      datum: new Date().toISOString(),
      steg: pos.steg,
      grupp: pos.grupp,
      momentIds,
      utfall,
      nastaGang: text,
    });
    setSparfel(!sparat);
    setFöreKontroller([]);
    // "Ta om" lämnar passet kvar eftersom det inte är en avslutande post.
    setLäge({ status, pos: härledPosition(steg), nastaGang: senasteNastaGang() });
    setFas('pass');
    window.scrollTo({ top: 0 });
  }

  function skjutUpp() {
    const sparat = skjutUppSamtal(momentIds);
    setSparfel(!sparat);
    setLäge({ status, pos: härledPosition(steg), nastaGang: senasteNastaGang() });
    window.scrollTo({ top: 0 });
  }

  function ändraGjort(grupp: number, momentIds: string[]) {
    const post = avslutandePasspost(momentIds);
    let sparat = true;
    if (post?.utfall === 'redan') {
      sparat = avmarkeraGjort(momentIds);
    } else if (post === null) {
      sparat = markeraGjort(stegnummer, grupp, momentIds);
    }
    setSparfel(!sparat);
    setLäge({ status, pos: härledPosition(steg), nastaGang: senasteNastaGang() });
  }

  function ändraNastaGang(text: string) {
    const t = text.trim() || null;
    const sparat = uppdateraNastaGang(t);
    setSparfel(!sparat);
    setLäge({ status, pos, nastaGang: senasteNastaGang() });
  }

  if (fas === 'efter') {
    return <Efter passet={passet} onSvar={svara} />;
  }

  // Stegsidan visar alla stegets pass; startsidan bara det aktuella.
  const grupperAttVisa = fastSteg ? aktuelltSteg.grupper : [passet];
  const antalPass = aktuelltSteg.grupper.length;

  return (
    <div className="space-y-7">
      {nastaGang !== null && !fastSteg && <NastaGang text={nastaGang} onÄndra={ändraNastaGang} />}

      {(föregåendeUtfall?.utfall === 'sadar' || föregåendeUtfall?.utfall === 'taom') && (
        <p className="text-base text-ink-2">
          Förra gången: {föregåendeUtfall.utfall === 'sadar' ? 'sådär' : 'ta om'} ·{' '}
          {formatDatum(föregåendeUtfall.datum)}
        </p>
      )}

      <div>
        <p className="flex items-center gap-3">
          <Stolpe number={pos.steg} />
          <span className="text-sm font-semibold tracking-wide text-ink-3 uppercase">
            <span className="sr-only">{`Steg ${pos.steg} `}</span>av {totalt}
          </span>
        </p>
        <Rubrik className="mt-3 text-3xl font-bold text-ink">{aktuelltSteg.titel}</Rubrik>
        {/* Steget är inte passet. Ett steg med tre grupper är tre kvällar,
            och det var just den översättningen föräldern inte kunde göra. */}
        {!fastSteg && antalPass > 1 && (
          <p className="mt-1.5 text-sm text-ink-3">
            Pass {grupp + 1} av {antalPass} i det här steget
          </p>
        )}
        {!fastSteg && passet.notering && (
          <p className="mt-1 text-base text-ink-2">{passet.notering}</p>
        )}
        {!fastSteg && passet.tid && <p className="mt-1 text-sm text-ink-3">{passet.tid}</p>}
        {underRubrik && <div className="mt-4">{underRubrik}</div>}
      </div>

      {/* Momentnamn, ett per rad, inga beskrivningar. På stegsidan står alla
          stegets pass, skilda av en kraftigare linje och ett passnummer. */}
      <div className="divide-y divide-line-strong border-y border-line">
        {grupperAttVisa.map((g, i) => {
          const gruppnummer = fastSteg ? i : grupp;
          const avslut = fastSteg ? avslutandePasspost(g.moment.map((moment) => moment.id)) : null;
          const ärNästa =
            fastSteg && läge.pos.steg === stegnummer && läge.pos.grupp === gruppnummer;
          const etikett = avslut ? 'Gjort' : ärNästa ? 'Nästa' : null;

          return (
            <div key={g.id}>
              {fastSteg && (
                <div className="pt-3">
                  <p className="text-sm font-semibold tracking-wide text-ink-3 uppercase">
                    {`Pass ${i + 1}${etikett ? ` · ${etikett}` : ''}`}
                  </p>
                  {g.notering && <p className="mt-1 text-base text-ink-2">{g.notering}</p>}
                  {g.tid && <p className="mt-1 text-sm text-ink-3">{g.tid}</p>}
                </div>
              )}
              {g.typ === 'samtal' && (
                <p className="pt-3 text-sm font-semibold tracking-wide text-ink-3 uppercase">
                  Samtal — vid köksbordet
                </p>
              )}
              <ul className="divide-y divide-line">
                {g.moment.map((moment) => (
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
              {fastSteg && (
                <div className="py-3">
                  {avslut?.utfall === 'bra' || avslut?.utfall === 'sadar' ? (
                    <p className="text-base font-semibold text-ink-3">Gjort ✓</p>
                  ) : (
                    <SekundarKnapp
                      onClick={() =>
                        ändraGjort(
                          gruppnummer,
                          g.moment.map((moment) => moment.id),
                        )
                      }
                    >
                      {avslut?.utfall === 'redan' ? 'Gjort ✓' : 'Markera som gjort'}
                    </SekundarKnapp>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!fastSteg && <Handledarfragor passet={passet} />}

      {!fastSteg && passet.typ === 'kor' && (
        <FöreKontrollera valda={föreKontroller} onAndra={setFöreKontroller} />
      )}

      {sparfel && (
        <p className="text-base text-ink-2">Kunde inte spara framsteget i den här webbläsaren.</p>
      )}

      {!fastSteg && (
        <div className="space-y-3">
          <Knapp onClick={() => setFas('efter')}>
            {passet.typ === 'samtal' ? 'Vi har pratat om det här' : 'Vi har övat det här'}
          </Knapp>
          {kanSkjutaUppSamtal && (
            <SekundarKnapp
              onClick={skjutUpp}
              className="min-h-14 w-full justify-center text-center"
            >
              Inte nu — visa nästa körpass
            </SekundarKnapp>
          )}
        </div>
      )}

      {!fastSteg && (
        <p className="flex gap-6">
          <Link href="/plan" className="text-base font-semibold text-blue-text">
            Ordning →
          </Link>
          <Link href="/skills" className="text-base font-semibold text-blue-text">
            Moment →
          </Link>
        </p>
      )}
    </div>
  );
}

function fragorForPass(passet: PassGrupp): string[] {
  return passet.moment.flatMap((moment) => moment.fragor.slice(0, 1));
}

function Fragelista({ fragor }: { fragor: string[] }) {
  return (
    <ul className="max-w-[var(--measure)] space-y-3">
      {fragor.map((fraga) => (
        <li key={fraga} className="flex gap-3 text-lg text-ink">
          <span aria-hidden="true" className="w-[26px] shrink-0 font-semibold text-blue-text">
            →
          </span>
          <span>{fraga}</span>
        </li>
      ))}
    </ul>
  );
}

function Handledarfragor({ passet }: { passet: PassGrupp }) {
  const fragor = fragorForPass(passet);
  if (fragor.length === 0) return null;

  return (
    <div className="space-y-3">
      <Subheading as="p">{passet.typ === 'samtal' ? 'Att prata om' : 'Att titta efter'}</Subheading>
      <Fragelista fragor={fragor} />
    </div>
  );
}

const FÖRE_KONTROLLER = [
  'körkortstillstånd',
  'elevens legitimation',
  'godkänd handledare',
  'skylten på',
  'en snabb koll av bilen',
];

function FöreKontrollera({
  valda,
  onAndra,
}: {
  valda: string[];
  onAndra: (valda: string[]) => void;
}) {
  function andra(kontroll: string) {
    onAndra(
      valda.includes(kontroll) ? valda.filter((vald) => vald !== kontroll) : [...valda, kontroll],
    );
  }

  return (
    <div className="space-y-3">
      <Subheading as="p">Innan ni kör</Subheading>
      <ul className="max-w-[var(--measure)] divide-y divide-line border-y border-line">
        {FÖRE_KONTROLLER.map((kontroll) => {
          const ärVald = valda.includes(kontroll);
          return (
            <li key={kontroll}>
              <button
                type="button"
                aria-pressed={ärVald}
                onClick={() => andra(kontroll)}
                className="flex min-h-12 w-full items-center gap-3 py-2 text-left text-base text-ink transition-colors duration-150 active:bg-surface-sunken active:duration-0 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <span aria-hidden="true" className="text-lg">
                  {ärVald ? '☑' : '☐'}
                </span>
                {kontroll}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' });
}

/** Samma lugna kontroll som svaren efter passet, för historik som går att rätta. */
function SekundarKnapp({
  children,
  onClick,
  className = '',
}: {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-12 shrink-0 rounded-[var(--radius-sm)] border border-line-strong bg-surface px-3 text-base font-semibold normal-case text-ink transition-colors duration-150 active:bg-surface-sunken active:duration-0 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none ${className}`}
    >
      {children}
    </button>
  );
}

/**
 * Efter passet — vid köksbordet.
 *
 * Tre svar och en rad. Svaren är lika stora och lika neutrala: ingen av dem
 * får se ut som det rätta, för då blir "Gick bra" det man trycker för att
 * slippa stå kvar, och bocken på vägen betyder ingenting igen.
 *
 * Handledarens frågor står här och inte hopfällda på momentsidan: det är
 * nu de har något att göra. De är det enda innehåll i appen som blir
 * bättre med tiden, och de ska stå där de läses.
 *
 * Raden "Nästa gång" är den enda fritexten i appen. Bakåtblickande text
 * skrivs och läses aldrig; den enda text som kommer att läsas är den som
 * svarar på frågan föräldern har i uppfarten nästa söndag: vad hade jag
 * tänkt? Skriv bara det som kommer att läsas.
 */
function Efter({
  passet,
  onSvar,
}: {
  passet: PassGrupp;
  onSvar: (utfall: Passutfall, nastaGang: string) => void;
}) {
  const [text, setText] = useState('');
  // En fråga per moment håller samtalet nära det paret just övade.
  const fragor = fragorForPass(passet);

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-3xl font-bold text-ink">Hur gick det?</h2>
        <p className="mt-2 text-base text-ink-2">{passet.moment.map((m) => m.namn).join(' · ')}</p>
      </div>

      {fragor.length > 0 && <Fragelista fragor={fragor} />}

      <label className="block">
        <span className="sr-only">Nästa gång</span>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={MAX_ANTECKNING}
          placeholder="Nästa gång…"
          autoComplete="off"
          className="min-h-12 w-full rounded-[var(--radius-sm)] border border-[var(--line-control)] bg-surface px-3 text-base text-ink placeholder:text-ink-3 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
        />
      </label>

      <div className="space-y-3">
        <div>
          <Svar onClick={() => onSvar('bra', text)}>Gick bra</Svar>
          <p className="mt-1 text-center text-sm text-ink-3">nästa pass</p>
        </div>
        <div>
          <Svar onClick={() => onSvar('sadar', text)}>Sådär</Svar>
          <p className="mt-1 text-center text-sm text-ink-3">vidare, men det kommer tillbaka</p>
        </div>
        <div>
          <Svar onClick={() => onSvar('taom', text)}>Ta om</Svar>
          <p className="mt-1 text-center text-sm text-ink-3">samma pass igen</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Raden överst på nästa pass, i parets egna ord. Grön kant: grönt är "vi",
 * och det här är det enda i appen som är deras. Ett tryck gör den
 * redigerbar — det är i uppfarten planen ändras.
 */
function NastaGang({ text, onÄndra }: { text: string; onÄndra: (text: string) => void }) {
  const [redigerar, setRedigerar] = useState(false);
  const [utkast, setUtkast] = useState(text);

  function spara() {
    setRedigerar(false);
    if (utkast.trim() !== text) onÄndra(utkast);
  }

  if (redigerar) {
    return (
      <label className="block">
        <span className="sr-only">Nästa gång</span>
        <input
          type="text"
          autoFocus
          value={utkast}
          maxLength={MAX_ANTECKNING}
          onChange={(e) => setUtkast(e.target.value)}
          onBlur={spara}
          onKeyDown={(e) => {
            if (e.key === 'Enter') spara();
          }}
          className="min-h-12 w-full rounded-[var(--radius-sm)] border border-[var(--line-control)] bg-surface px-3 text-base text-ink focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
        />
      </label>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setRedigerar(true)}
      className="block w-full max-w-[var(--measure)] border-l-[3px] border-green-text py-1 pl-3 text-left text-lg text-ink focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <span className="font-semibold">Nästa gång: </span>
      {text}
    </button>
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

/** Ett av tre svar: yta, ram, ingen kulör. Ingen av dem är det rätta. */
function Svar({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-14 w-full items-center justify-center rounded-[var(--radius-sm)] border border-line-strong bg-surface px-4 text-lg font-semibold text-ink transition-colors duration-150 active:bg-surface-sunken active:duration-0 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      {children}
    </button>
  );
}
