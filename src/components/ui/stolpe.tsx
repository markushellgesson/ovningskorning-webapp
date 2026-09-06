interface StolpeProps {
  /** Talet på stolpen. Ett till tre tecken — stolpen är inte en etikett. */
  number: number;
  /**
   * `md` (40 × 48) är stegstolpen: Ordning och passvyn.
   * `sm` (26 × 28) är den lilla stolpen i "Hur ni övar".
   */
  size?: 'md' | 'sm';
  /**
   * Var steget står i förhållande till var paret är.
   *
   * `passerat` byter fältet till skyltgrönt och sätter ett ✓ efter siffran;
   * `nasta` behåller det blå fältet men grönar bården. Kulören bär aldrig
   * ensam — bocken är det som säger "passerat" också för den som inte
   * skiljer grönt från blått.
   *
   * Bara `md`. Den lilla stolpen numrerar övningssteg, som inte har status.
   */
  status?: 'passerat' | 'nasta';
  className?: string;
}

/**
 * Kilometerstolpen — appens sätt att sätta en siffra (docs/designsprak.md 4.3, 6).
 *
 * Blått fält, vit bård, vit stolpsiffra i 700 med `tabular-nums`. Siffran
 * står aldrig naken i rubriktext: det är kilometerstolpens princip — siffran
 * är något man passerar, inte en del av meningen. Tabulära siffror gör att
 * en kolumn med 1, 2 … 15 står still i sidled i stället för att vandra när
 * ettan är smalare än nollan.
 *
 * Bården ritas som två staplade `inset`-ringar i stället för `border` +
 * `outline`: en border hade ätit av fältet och gjort den blå ramen olika
 * tjock i hörnen mot rundningen. Ringarna följer radius exakt.
 *
 * Fält och bård är skyltkulörer och vänder alltså inte med färgläget — i
 * mörkt läge är det bården som gör stolpen synlig, som en skylt i
 * strålkastarljus.
 *
 * Dekorativ: numret läses redan i rubriken bredvid, och en skärmläsare ska
 * inte höra "7" två gånger.
 */
export function Stolpe({ number, size = 'md', status, className = '' }: StolpeProps) {
  const md = size === 'md';
  const passerat = status === 'passerat';
  const falt = passerat ? 'var(--sign-green)' : 'var(--sign-blue)';
  const bard = status === 'nasta' ? 'var(--sign-green)' : 'var(--sign-white)';

  return (
    <span
      aria-hidden="true"
      className={`relative z-[2] inline-flex shrink-0 items-center justify-center font-bold text-sign-white tabular-nums ${
        md
          ? // Bredden är låst till 40: vägen på Ordning är inriktad så att
            // stolpens mitt (20) ligger på bandets mitt (6–34). En bredare
            // stolpe för passerade steg hade ställt dem bredvid vägen.
            // Bocken får plats genom att siffran krymper, inte fältet växer.
            `h-12 w-10 rounded-[var(--radius-sign)] leading-none ${passerat ? 'text-[16px]' : 'text-[20px]'}`
          : 'h-7 w-[26px] rounded-[4px] text-[15px] leading-none'
      } ${className}`}
      style={{
        background: falt,
        boxShadow: md
          ? `inset 0 0 0 3px ${falt}, inset 0 0 0 5px ${bard}`
          : 'inset 0 0 0 2px var(--sign-blue), inset 0 0 0 3.5px var(--sign-white)',
      }}
    >
      {number}
      {passerat && <span className="ml-[1px] text-[11px]">✓</span>}
    </span>
  );
}
