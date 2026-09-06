/**
 * Övningskörningsskylten — appens mastodon.
 *
 * Skylten är reglerad i TSFS 2010:81: vit versaltext ÖVNINGSKÖR på grön
 * botten, 460 × 100 mm, med en vit bård innanför kanten. Grönt betyder
 * privat övningskörning; trafikskolor kör med röd botten. Kulören är alltså
 * inte utbytbar, och därför står den här som fasta värden i stället för som
 * token: --progress-600 ljusnar i mörkt läge, men skylten är ett fysiskt
 * föremål och ser likadan ut i mörker. Mot den mörka bakgrunden bär den
 * vita bården och texten den.
 *
 * Texten är låst till en bestämd bredd (textLength) så att den fyller
 * skylten lika oavsett vilket typsnitt som faktiskt ritar den — utan det
 * skulle en ersättningsfont under laddningen ge en skylt med fel luft.
 *
 * Dekorativ: rubriken under säger redan vad appen är, så skärmläsaren ska
 * inte få det två gånger.
 */
export function Skylt({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 100"
      className={`h-9 w-auto ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="460" height="100" rx="8" fill="#00843d" />
      <rect
        x="11"
        y="11"
        width="438"
        height="78"
        rx="4"
        fill="none"
        stroke="#ffffff"
        strokeWidth="5"
      />
      <text
        x="230"
        y="51"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#ffffff"
        fontFamily="var(--font-sans)"
        fontSize="50"
        fontWeight="700"
        textLength="372"
        lengthAdjust="spacingAndGlyphs"
      >
        ÖVNINGSKÖR
      </text>
    </svg>
  );
}
