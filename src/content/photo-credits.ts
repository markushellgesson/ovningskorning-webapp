/**
 * Attributionsdata för foton av svenska trafikmiljöer i public/photos/.
 *
 * Alla bilder kommer från Wikimedia Commons och är verifierade fil för fil
 * mot LicenseShortName/Artist i Commons metadata-API innan nedladdning — se
 * /bilder som renderar den här listan. CC BY och CC BY-SA kräver att titel,
 * upphovsperson, källa och licens anges med länk; det görs på /bilder och i
 * alt-texten där bilden visas.
 *
 * Bilderna är oredigerade (inte beskurna eller bearbetade), så CC BY-SA:s
 * villkor för bearbetningar av verket berörs inte.
 */

export interface PhotoCredit {
  /** Filnamn i public/photos/, utan sökväg. */
  filename: string;
  /** Svensk rubrik för trafikmiljön bilden illustrerar. */
  environment: string;
  /** Svensk alt-text — beskriver vad bilden visar, inte var den kommer från. */
  altText: string;
  /** Originaltitel på Wikimedia Commons. */
  title: string;
  photographer: string;
  license: string;
  licenseUrl: string | null;
  /** Länk till filsidan på Wikimedia Commons. */
  sourceUrl: string;
}

export const PHOTO_CREDITS: PhotoCredit[] = [
  {
    filename: 'cirkulationsplats-vallingby.jpg',
    environment: 'Cirkulationsplats',
    altText:
      'Flygbild över en cirkulationsplats i Vällingby, Stockholm, med övergångsställen vid varje utfart och en bil på väg in i rondellen.',
    title: 'Roundabout September 2014 12',
    photographer: 'Arild Vågen',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Roundabout_September_2014_12.jpg',
  },
  {
    filename: 'motorvag-e6-glumslov.jpg',
    environment: 'Motorväg',
    altText:
      'Motorvägen E6 genom västra Skåne vid Glumslöv, med flera lastbilar och personbilar i respektive körfält.',
    title: 'Motorway E6 at Glumslöv Scania Sweden',
    photographer: 'Boeing720',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Motorway_E6_at_Glumsl%C3%B6v_Scania_Sweden.JPG',
  },
  {
    filename: 'motorvagspafart-olskroksmotet.jpg',
    environment: 'Motorvägspåfart / trafikplats',
    altText:
      'Skyltportal vid Olskroksmotet i Göteborg som visar körfältsval mot E20 Stockholm respektive E6 Oslo, med en bil under skyltarna.',
    title: 'South part of Olskroksmotet',
    photographer: 'Sebbe',
    license: 'Public domain',
    licenseUrl: null,
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:South_part_of_Olskroksmotet.jpg',
  },
  {
    filename: 'cirkulationsplats-uddevalla.jpg',
    environment: 'Motorvägspåfart / trafikplats',
    altText:
      'Skyltportal vid trafikplats Torp utanför Uddevalla med vägvisning mot Vänersborg, Trollhättan och centrum, samt en buss i cirkulationen nedanför.',
    title: 'Roundabout at Södra Torpmotet, Uddevalla',
    photographer: 'W.carter',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Roundabout_at_S%C3%B6dra_Torpmotet,_Uddevalla.jpg',
  },
  {
    filename: 'landsvag-smal-vag-e4-norrbotten.jpg',
    environment: 'Landsväg / smal väg',
    altText:
      'Smal landsväg (E4) mellan Sangis och Haparanda i Norrbotten utan vägren, med mötande bilar och en lastbil på den kuperade vägen.',
    title: 'E4 Road in Northenmost Sweden',
    photographer: 'Adrian R. Johansson',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:E4_Road_in_Northenmost_Sweden.jpg',
  },
  {
    filename: 'overgangsstalle-birger-jarlsgatan.jpg',
    environment: 'Tätortsgata / övergångsställe',
    altText:
      'Övergångsställe vid en gatukorsning på Birger Jarlsgatan i Stockholm en regnig eftermiddag, med väntande fotgängare, en cyklist och rödljus för gående.',
    title: 'Zebra crossing over Birger Jarlsgatan on a rainy afternoon in September 2024',
    photographer: 'JIP',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Zebra_crossing_over_Birger_Jarlsgatan_on_a_rainy_afternoon_in_September_2024.jpg',
  },
  {
    filename: 'jarnvagskorsning-farlev.jpg',
    environment: 'Järnvägskorsning',
    altText:
      'Obevakad järnvägskorsning på en grusväg i Färlev, med Andreaskors och varningsskylten "Livsfarlig ledning" över spåret.',
    title: 'Railroad crossing in Färlev',
    photographer: 'W.carter',
    license: 'CC0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Railroad_crossing_in_F%C3%A4rlev.jpg',
  },
  {
    filename: 'vintervaglag.jpg',
    environment: 'Vinterväglag',
    altText:
      'Snötäckt landsväg i vinterskymning kantad av kala träd, med synliga hjulspår i den delvis isiga vägbanan.',
    title: 'Winter road in Sweden',
    photographer: 'Susanne Nilsson',
    license: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Winter_road_in_Sweden.jpg',
  },
  {
    filename: 'vagarbete-vagsaltning-tuntorp.jpg',
    environment: 'Vinterväglag / halkbekämpning',
    altText:
      'En underhållsarbetare sprider halkbekämpningssalt för hand på en snötäckt väg i Tuntorp, Bohuslän.',
    title: 'Maintenance man spreading road salt in Tuntorp',
    photographer: 'W.carter',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Maintenance_man_spreading_road_salt_in_Tuntorp.jpg',
  },
  {
    filename: 'morkerkorning-stockholm.jpg',
    environment: 'Mörkerkörning',
    altText:
      'Upplyst stadsgata i centrala Stockholm på kvällen, med körfält markerat för buss, övergångsställen och trafikljus i mörkret.',
    title: 'Night traffic Stockholm',
    photographer: 'Olof Lagerkvist',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Night_traffic_Stockholm_-_panoramio.jpg',
  },
  {
    filename: 'cykeloverfart-tyreso.jpg',
    environment: 'Cykelöverfart',
    altText:
      'Tryckknapp med cykelsymbol vid en cykelöverfart i Tyresö, med vägmarkeringen synlig i bakgrunden.',
    title: 'Bicycle crosswalk button in Tyresö, Sweden',
    photographer: 'Jonatan Svensson Glad',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Bicycle_crosswalk_button_in_Tyres%C3%B6,_Sweden.JPG',
  },
  {
    filename: 'busshallplats-brastad.jpg',
    environment: 'Busshållplats',
    altText:
      'En buss i linjetrafik närmar sig en hållplats vid en tvåfältsväg i Brastad, sedd från vägens perspektiv i dagsljus.',
    title: 'Bus 852 at Sågvägen bus stop in Brastad',
    photographer: 'W.carter',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Bus_852_at_S%C3%A5gv%C3%A4gen_bus_stop_in_Brastad.jpg',
  },
];

/**
 * Kopplar moment (skillId i content.json) till foton via filnamn, så att ett
 * foto kan visas på momentets sida i stället för att bara ligga på /bilder.
 *
 * Ett moment kan ha flera foton (t.ex. HWY-01 för både motorvägen och
 * motorvägspåfarten), och ett foto kan täcka flera moment (landsvägsfotot
 * gäller både RUR-01 och RUR-02). Fotot är alltid ett komplement till
 * momentets text och eventuella diagram, aldrig huvudkällan.
 *
 * Ett foto vars miljö inte motsvarar något eget moment (cirkulationsplatsen
 * vid trafikplats Torp i Uddevalla, som redan täcks av rondellfotot på
 * RAB-01) är medvetet uteslutet härifrån — det finns kvar på /bilder.
 */
export const SKILL_PHOTOS: Record<string, string[]> = {
  'RAB-01': ['cirkulationsplats-vallingby.jpg'],
  'HWY-01': ['motorvag-e6-glumslov.jpg', 'motorvagspafart-olskroksmotet.jpg'],
  'RUR-01': ['landsvag-smal-vag-e4-norrbotten.jpg'],
  'RUR-02': ['landsvag-smal-vag-e4-norrbotten.jpg'],
  'VRU-01': ['overgangsstalle-birger-jarlsgatan.jpg'],
  'VRU-02': ['cykeloverfart-tyreso.jpg'],
  'SPEC-02': ['morkerkorning-stockholm.jpg'],
  'SPEC-04': ['vintervaglag.jpg', 'vagarbete-vagsaltning-tuntorp.jpg'],
  'SPEC-05': ['jarnvagskorsning-farlev.jpg'],
  'VRU-04': ['busshallplats-brastad.jpg'],
};

/** Hämtar foton för ett givet skillId, i den ordning de listas i SKILL_PHOTOS. */
export function getPhotosForSkill(skillId: string): PhotoCredit[] {
  const filenames = SKILL_PHOTOS[skillId] ?? [];
  return filenames
    .map((filename) => PHOTO_CREDITS.find((photo) => photo.filename === filename))
    .filter((photo): photo is PhotoCredit => photo !== undefined);
}
