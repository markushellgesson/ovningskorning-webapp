/**
 * Avfart från motorväg — retardationsfältet och var farten sänks.
 * Motstycket till accelerationsfältet (HWY-01); samma vägmärke C31-5 för
 * avfartens skyltade hastighet.
 *
 * Vägmärkesbilden C31-5 i public/signs/ är ett svenskt officiellt vägmärke
 * (allmän handling) och fri att återge.
 */

export function AvfartMotorvagDiagram() {
  return (
    <svg
      viewBox="0 0 500 400"
      className="w-full max-w-2xl mx-auto"
      role="img"
      aria-labelledby="exit-title exit-desc"
    >
      <title id="exit-title">Avfart med retardationsfält</title>
      <desc id="exit-desc">
        Motorvägen med ett retardationsfält som grenar av åt höger och smalnar av mot avfartskurvan.
        Din bil (prickmönster) håller motorvägsfart genom hela det genomgående körfältet — markerat
        med en genomkryssad bromssymbol som visar att farten normalt inte tas ned där. Först när bilen
        är helt inne i retardationsfältet visas en bromssymbol utan kryss: där tas farten ned, innan
        avfartskurvan börjar. Vägmärket C31-5 visar avfartens skyltade hastighet.
      </desc>

      <defs>
        <pattern id="exit-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        <pattern id="exit-lane" patternUnits="userSpaceOnUse" width="8" height="20">
          <line x1="4" y1="0" x2="4" y2="20" className="stroke-diagram-edge" strokeWidth="1.5" />
        </pattern>
      </defs>

      {/* Genomgående körfält (huvudled) */}
      <rect x="20" y="60" width="460" height="90" className="fill-diagram-road" />
      <line x1="20" y1="105" x2="480" y2="105" className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8" />

      {/* Retardationsfält, smalnar av mot avfartskurvan */}
      <path
        d="M 300 150 L 480 150 L 480 190 Q 480 250 420 260 L 340 270 Q 300 274 280 240 Z"
        fill="url(#exit-lane)"
        className="stroke-diagram-edge"
        strokeWidth="2"
      />

      {/* Kantlinje mellan genomfart och retardationsfält */}
      <path d="M 300 150 L 480 150" className="stroke-diagram-edge" strokeWidth="2" />

      {/* Avfartsväg, fortsätter ut */}
      <path d="M 280 240 Q 260 290 200 310 L 60 340" className="stroke-diagram-edge" strokeWidth="2" fill="none" />
      <path d="M 420 260 Q 400 310 340 330 L 200 360" className="stroke-diagram-edge" strokeWidth="2" fill="none" />

      {/* Din bil: tre positioner — genomfart, i retardationsfältet, i kurvan */}
      <rect x="60" y="88" width="34" height="20" fill="url(#exit-dots)" className="stroke-attention-600" strokeWidth="1.5" rx="3" />
      <rect x="330" y="185" width="34" height="20" fill="url(#exit-dots)" className="stroke-attention-600" strokeWidth="1.5" rx="3" />
      <rect
        x="230"
        y="270"
        width="34"
        height="20"
        fill="url(#exit-dots)"
        className="stroke-attention-600"
        strokeWidth="1.5"
        rx="3"
        transform="rotate(30 247 280)"
      />

      {/* Bana */}
      <path
        d="M 94 98 L 300 155 Q 340 175 347 195"
        className="stroke-primary-400"
        strokeWidth="2"
        fill="none"
        strokeDasharray="6 5"
      />
      <path
        d="M 347 205 Q 320 240 247 270"
        className="stroke-primary-400"
        strokeWidth="2"
        fill="none"
        strokeDasharray="6 5"
      />

      {/* Mindre lämplig plats att bromsa: genomkryssad bromssymbol i det genomgående körfältet */}
      <g transform="translate(140, 30)">
        <path d="M -14 6 L 14 6 L 10 20 L -10 20 Z" className="fill-none stroke-text-tertiary" strokeWidth="2" />
        <line x1="-16" y1="-2" x2="16" y2="28" className="stroke-safety-600" strokeWidth="2.5" />
        <text x="0" y="-8" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
          Här behåller du farten
        </text>
      </g>

      {/* Rätt plats att bromsa: bromssymbol i retardationsfältet */}
      <g transform="translate(430, 205)">
        <path d="M -14 6 L 14 6 L 10 20 L -10 20 Z" className="fill-progress-100 stroke-progress-600" strokeWidth="2" />
        <text x="0" y="42" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          Sänk farten här
        </text>
        <text x="0" y="60" textAnchor="middle" className="fill-text-secondary text-[13px]">
          i retardationsfältet
        </text>
      </g>

      {/* C31-5 — avfartens skyltade hastighet */}
      <g>
        <rect x="20" y="290" width="70" height="70" className="fill-none stroke-border-default" strokeWidth="1.5" rx="6" />
        <image href="/signs/C31-5.svg" x="30" y="298" width="50" height="50" />
        <text x="55" y="378" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Avfartens hastighet
        </text>
      </g>

      <text x="250" y="20" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Retardationsfältet — inte det genomgående körfältet — är platsen att ta ned farten
      </text>
    </svg>
  );
}
