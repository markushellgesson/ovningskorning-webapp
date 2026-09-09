---
name: domain-riskutbildning-sent
description: "Sent i utbildningen" gäller riskutbildning del 2 — inte del 1 och inte förälderns egna riskssamtal (alkohol, trötthet)
metadata:
  type: project
---

"Sent i utbildningen" gäller **riskutbildning del 2** (praktisk, hastighet/väglag).
Del 1 (alkohol, droger, trötthet, riskbeteenden) har inget sentkrav i någon källa.
Slutsatsen: appens egna samtalsmoment om alkohol/läkemedel/trötthet får inte
placeras sent med hänvisning till "riskutbildning ska ligga sent".

**Why:** Progressionsplanen (`local-app/src/domain/progression-plan/plan.ts`) hade
lagt RISK-01/RISK-02 i steg 8 av 10 på det argumentet. Belägg mot:
`docs/research/underlag-moment-och-metod.md` 5.2 (säger uttryckligen "del 2") och
`docs/research/research-domain.md` rad 33 (delar upp innehållet i del 1 vs del 2).
Den upphävda TSFS 2010:127 3 kap. 8 § lade samma ämnen i introduktionsutbildningen,
alltså före första körpasset — får inte anföras som krav (M6) men visar riktningen.

**How to apply:** Ifrågasätt varje sen placering av RISK-01/02/03 och EMR-02 som
motiveras med riskutbildningens sentkrav. EMR-02 (åtgärder vid trafikolycka) är
`safetyCritical` och plikten gäller från första passet i trafik — den hör tidigt.
