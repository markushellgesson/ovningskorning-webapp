/**
 * Datan passvyn får vid bygget. Bara det skärmen visar: namn, två flaggor
 * och handledarens frågor. Beskrivningarna ligger kvar på momentsidan.
 */
export interface PassMoment {
  id: string;
  namn: string;
  continuous: boolean;
  /**
   * Handledarens frågor för momentet — "Förstår eleven att väjningsplikten
   * är något vi har, inte något vi ger?" De visas efter passet, som något
   * att prata om vid köksbordet. Det är det innehåll i appen som blir
   * bättre med tiden i stället för uttjänt, och det ska stå där det läses.
   */
  fragor: string[];
}

/** En grupp är ett pass: momenten som hör ihop och tränas samma kväll. */
export interface PassGrupp {
  id: string;
  moment: PassMoment[];
}

export interface PassSteg {
  nummer: number;
  titel: string;
  grupper: PassGrupp[];
}
