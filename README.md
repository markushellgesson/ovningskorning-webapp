# Stöd för privat övningskörning B — webbapp

Ett verktyg för dig som handleder någon som övningskör för B-körkort. Kompetensbibliotek, träningsförslag och dokumentation av hur det går — strukturerat, pedagogiskt och utan att göra körningen till en tävling i antal mil.

**Appen körs helt i webbläsaren.** Ingen inloggning, ingen server, inget konto. All data stannar på din egen enhet.

👉 **[markushellgesson.github.io/ovningskorning-webapp](https://markushellgesson.github.io/ovningskorning-webapp/)**

---

## Vad appen gör

- **Kompetensbibliotek** — 47 körmoment med mål, övningssteg, vanliga misstag och vad du som handledare bör titta efter
- **Pedagogiska figurer** — högerregeln, cirkulationsplats, accelerationsfält, döda vinkeln, stoppsträckans delar
- **Handledarstöd** — formuleringar anpassade efter trafiksituationen: korta vid hög belastning, öppna frågor när det är lugnt
- **Teori kopplad till praktik** — teoriämnen knutna till de moment de faktiskt hör ihop med

## Vad appen inte är

Den är inte en trafikskola, ger inga körinstruktioner i realtid och avgör inte om någon är redo för uppkörning. Den ersätter varken riskutbildning eller teoriutbildning.

**Under övningskörning är handledaren juridiskt förare av fordonet** (körkortsförordningen 4 kap 3 §). Inget i den här appen ändrar det.

## Om regelinnehållet

Regeluppgifter är kontrollerade mot primärkälla — trafikförordningen (1998:1276), körkortsförordningen (1998:980) och Transportstyrelsen — och bär paragrafhänvisning. Där stöd saknas är innehållet formulerat kvalitativt i stället för att gissa en siffra.

**Kontrollera ändå alltid regelfrågor mot Transportstyrelsen.** Regler ändras, och den här appen är inte en officiell källa.

## Dina uppgifter

All data — planerade pass, bedömningar, progression — lagras i din webbläsares `localStorage` på den enhet du använder. Ingenting skickas någonstans. Det betyder också att uppgifterna **försvinner om du rensar webbläsardata eller byter enhet**, och att de inte delas mellan telefoner.

## Utveckling

```bash
npm install
npm run dev     # http://localhost:3001
npm run build   # statisk export till out/
```

Next.js med statisk export. Publiceras automatiskt till GitHub Pages vid push till `main`.

Appen publiceras från ett privat huvudrepo som också innehåller en fullständig, självhostad version med delad databas och konto. Redigera därför inte här — ändringar skrivs över vid nästa publicering.
