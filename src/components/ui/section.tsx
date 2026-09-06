import type { ReactNode } from 'react';

/**
 * Avsnittsrytmen från momentsidan, utbruten så att alla sidor kan dela den.
 *
 * En hårfin linje och 32 px luft mellan varje avsnitt, i stället för att
 * varje avsnitt ligger i ett eget kort. Sex identiska kort i rad läser som
 * en formulärsida; linje plus luft läser som ett dokument. Klasserna är
 * samlade här för att avsnitten ska vara garanterat identiska — rytmen
 * faller om ett av dem glider.
 */
export function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`border-t border-border-subtle pt-8 ${className}`}>{children}</section>
  );
}

/** Avsnittsrubrik — h2 på 22 px, semibold. */
export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-semibold text-text-primary">{children}</h2>;
}

interface SubheadingProps {
  children: ReactNode;
  /** h3 som standard; h2 där underrubriken är avsnittets enda rubrik. */
  as?: 'h2' | 'h3';
}

/**
 * Versalgemen underrubrik i tertiärfärg — momentsidans stil för
 * "Bra att kunna innan" och liknande gruppetiketter. Tyst nog att inte
 * konkurrera med innehållet, tydlig nog att skilja grupper åt.
 */
export function Subheading({ children, as = 'h3' }: SubheadingProps) {
  const Tag = as;
  return (
    <Tag className="text-sm font-semibold tracking-wide text-text-tertiary uppercase">
      {children}
    </Tag>
  );
}

/**
 * Metarad: egenskaper som hör till en rad men inte ska ropa. Ersätter
 * fyllda piller i listor — där 61 av 72 moment är säkerhetskritiska är ett
 * piller på varje rad brus, inte signal. Pillret finns kvar på momentets
 * egen sida, där det har sammanhang.
 */
export function Meta({ children }: { children: ReactNode }) {
  return <span className="block text-sm text-text-tertiary">{children}</span>;
}
