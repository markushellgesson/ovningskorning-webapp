/**
 * Antalschippet — vit yta med en siffra i vägvisarblått.
 *
 * Appen har två sifferföremål och de betyder olika saker. **Stolpen** är ett
 * ordningstal: steg 6 av 15, moment 3 i övningen. **Chippet** är ett antal:
 * 75 moment, 15 steg, 6 moment i kategorin. Så länge den skillnaden håller
 * går varje siffra i appen att läsa utan sammanhang.
 *
 * Kategoribanden på Träningsmoment bar tidigare en stolpe med antalet, och
 * den som kom från Ordning läste "6" på Fordonskännedom som steg 6. Därför
 * finns komponenten: föremålet ska sitta på ett ställe, inte återskapas per
 * sida med snarlika klasser.
 *
 * Siffran står aldrig naken. Den vita ytan är det som gör den läsbar både
 * mot asfaltbandet och inne i den blå vägvisaren — samma skäl som skyltarnas
 * vita bård finns (docs/designsprak.md 2, regel 1).
 */
export function Antalschip({ children, size = 'md' }: { children: number; size?: 'md' | 'sm' }) {
  const stor = size === 'md';
  return (
    <span
      className={`relative flex shrink-0 items-center bg-sign-white font-bold text-sign-blue tabular-nums ${
        stor
          ? 'h-10 rounded-[var(--radius-sm)] px-2.5 text-[28px] leading-none'
          : 'h-6 min-w-7 justify-center rounded-[var(--radius-sign)] px-1.5 text-[15px] leading-none'
      }`}
    >
      {children}
    </span>
  );
}
