'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPasslogg, getValkomst, saveValkomst } from '@/storage/storage';
import type { PassSteg } from './typer';
import { Pass } from './pass';

export function Valkomst({ steg }: { steg: PassSteg[] }) {
  const [visaValkomst, setVisaValkomst] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    setVisaValkomst(getPasslogg().length === 0 && !getValkomst());
  }, []);

  if (visaValkomst === null) return <div className="min-h-[60vh]" aria-busy="true" />;
  if (!visaValkomst) {
    return (
      <>
        <h1 className="sr-only">Nästa pass</h1>
        <Pass steg={steg} />
      </>
    );
  }

  function borjaFranBorjan() {
    saveValkomst();
    setVisaValkomst(false);
  }

  function redanKort() {
    saveValkomst();
    router.push('/plan');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-ink">Har ni kört förut?</h1>
      <div className="space-y-3">
        <ValkomstKnapp onClick={borjaFranBorjan}>Nej — vi börjar från början</ValkomstKnapp>
        <ValkomstKnapp onClick={redanKort}>Ja — vi har kört ett tag</ValkomstKnapp>
      </div>
      <p className="text-base text-ink-2">Allt sparas i den här webbläsaren, på den här enheten.</p>
    </div>
  );
}

export function ValkomstRad() {
  const [visa, setVisa] = useState(false);

  useEffect(() => {
    setVisa(getValkomst() && getPasslogg().length === 0);
  }, []);

  return visa ? (
    <p className="mb-3 text-base text-ink-2">
      Markera de pass ni redan gjort. Nästa pass blir det första ogjorda.
    </p>
  ) : null;
}

function ValkomstKnapp({ children, onClick }: { children: string; onClick: () => void }) {
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
