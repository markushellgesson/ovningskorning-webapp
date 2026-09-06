import type { CSSProperties, ReactNode } from 'react';

/**
 * Körfältsstrecket (docs/designsprak.md 6).
 *
 * En vågrät vägmarkering i --marking på asfalt: 3 px hög, streckad 16/14.
 * Ritas som en `repeating-linear-gradient` i stället för som en `border-dashed`
 * — border-dashed låter webbläsaren välja streck- och mellanrumslängd, och
 * de valen skiljer sig mellan motorer. Här är rytmen densamma överallt.
 *
 * I mörkt läge lyser strecket statiskt (--glow-box). Glöden är noll i ljust
 * läge, så komponenten behöver aldrig fråga efter färgläget. Ingen animation:
 * en app som inte får användas när bilen rör sig ska inte ha något som rör
 * sig av sig självt.
 *
 * `solid` ger den heldragna varianten — bottennavigeringens aktiva flik.
 */
export function Korfaltsstreck({
  solid = false,
  className = '',
}: {
  solid?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`block h-[3px] w-full ${className}`}
      style={{
        backgroundImage: solid
          ? 'none'
          : 'repeating-linear-gradient(90deg, var(--marking) 0 16px, transparent 16px 30px)',
        backgroundColor: solid ? 'var(--marking)' : undefined,
        boxShadow: 'var(--glow-box)',
      }}
    />
  );
}

interface AsfaltbandProps {
  children: ReactNode;
  /** Avslutar bandet med ett körfältsstreck — hero-bandets nedre kant. */
  edge?: boolean;
  /**
   * Full bredd över sidskalets marginaler. Bandet är ett band, inte ett
   * kort: det ska gå kant i kant. Motsvarar sidskalets 20/32 px marginal.
   */
  bleed?: boolean;
  className?: string;
}

/**
 * Asfaltbandet — hero på startsidan, kategoriband i listan, ytan under
 * bottennavigeringen (docs/designsprak.md 5.1, 7.1, 7.2).
 *
 * I ljust läge är bandet mörkt mot en ljus sida: en väg genom en sommaräng.
 * I mörkt läge är det knappt ljusare än botten och smälter nästan in — det
 * är markeringarna, inte bandet, som visar vägen. Därför bär bandet alltid
 * sin text i --marking / --marking-dim och aldrig i --ink.
 *
 * Bandet slutar i ett körfältsstreck i stället för i en skugga eller en
 * gradient. Det är kanten, och den behöver ingen mjukning.
 */
export function Asfaltband({
  children,
  edge = false,
  bleed = false,
  className = '',
}: AsfaltbandProps) {
  return (
    <div
      className={`bg-asphalt text-marking ${bleed ? '-mx-5 px-5 sm:-mx-8 sm:px-8' : ''} ${className}`}
    >
      {children}
      {edge && <Korfaltsstreck className="mt-6" />}
    </div>
  );
}

interface VagProps {
  children: ReactNode;
  className?: string;
}

/**
 * Vägen — Ordningens lodräta asfaltband (docs/designsprak.md 6, 7.3).
 *
 * 28 px brett, 20 px in från vänsterkanten, med streckad mittlinje (2 px,
 * 10/10) och rundade ändar. Stolparna står PÅ bandet: de renderas som vanligt
 * innehåll med `position: relative`, medan bandet och mittlinjen ligger i två
 * absolut placerade lager under dem. Det är därför stolparna kan ha vilken
 * höjd som helst utan att bandet behöver räknas om — bandet tar sin längd ur
 * listan, inte tvärtom.
 *
 * Mittlinjen slutar 18 px från vardera änden, så att den inte skär ut genom
 * bandets rundning.
 *
 * I mörkt läge är bandet nästan osynligt och mittlinjen lyser. Det är den
 * vyn formspråket är mest stolt över, och den kostar två gradienter att rita.
 */
export function Vag({ children, className = '' }: VagProps) {
  const band: CSSProperties = {
    left: 6,
    width: 28,
    borderRadius: 'var(--radius-band)',
    background: 'var(--asphalt)',
  };

  const centreLine: CSSProperties = {
    left: 19,
    top: 18,
    bottom: 18,
    width: 2,
    backgroundImage:
      'repeating-linear-gradient(180deg, var(--marking) 0 10px, transparent 10px 20px)',
    boxShadow: 'var(--glow-box)',
  };

  return (
    <div className={`relative py-2 ${className}`}>
      <span aria-hidden="true" className="absolute top-0 bottom-0" style={band} />
      <span aria-hidden="true" className="absolute" style={centreLine} />
      {children}
    </div>
  );
}

/**
 * En station på vägen: stolpen och det som står till höger om den.
 * 72 px hög träffyta över hela bredden, tryckt rad tonas i --surface-sunken.
 * Ligger i eget lager ovanför bandet (`relative`), annars täcker asfalten
 * stolparna.
 */
export function Vagstation({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <li className={`relative z-[1] ${className}`}>{children}</li>;
}
