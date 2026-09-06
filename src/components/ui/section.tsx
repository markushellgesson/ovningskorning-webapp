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
    <section className={`border-t border-border-subtle pt-7 ${className}`}>{children}</section>
  );
}

interface SectionTitleProps {
  children: ReactNode;
  /**
   * Körfältsstrecket framför rubriken (docs/designsprak.md 6, 7.5): 28 × 4 px
   * i avsnittets kulör, 10 px ovanför. Sex färgade streck på en sida låter
   * mycket; på skärmen syns ett i taget, och det säger vilket avsnitt man är i.
   *
   * Strecket är en prop och inte ett eget element bredvid rubriken, för att
   * de två inte ska kunna glida isär — samma skäl som Section samlar sina
   * klasser. Dekorativt: rubriken säger redan vilket avsnitt det är.
   */
  accent?: string;
  /**
   * Röd kontur runt strecket. Gult är alltid gult fält med röd bård, aldrig
   * gult ensamt — så `accent="var(--sign-yellow)"` kräver den här.
   */
  accentBorder?: boolean;
}

/** Avsnittsrubrik — h2 på 22 px, 700, med valfritt körfältsstreck framför. */
export function SectionTitle({ children, accent, accentBorder = false }: SectionTitleProps) {
  return (
    <>
      {accent && (
        <span
          aria-hidden="true"
          className="mb-2.5 block h-1 w-7 rounded-[2px]"
          style={{
            background: accent,
            boxShadow: accentBorder ? '0 0 0 1.5px var(--sign-red)' : undefined,
          }}
        />
      )}
      <h2 className="text-2xl font-bold text-text-primary">{children}</h2>
    </>
  );
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
