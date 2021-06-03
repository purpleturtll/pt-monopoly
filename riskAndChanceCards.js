const risk = [
    {
      info: 'Idź do więzienia. Idziesz\n bezpośrednio na pole WIĘZIENIE.\nNie mijasz pola START.',
      position: 12,
      cashChange: 0,
      posRelative: undefined,
      doStart: false,
      fromOthers: 0,
      type: 'risk'
    },
    {
      info: 'Dostałeś mandat. Zapłać 100$.',
      position: undefined,
      cashChange: -100,
      posRelative: undefined,
      doStart: false,
      fromOthers: 0,
      type: 'risk'
    },
    {
      info: 'Zapłać 500$ za wynajem\n luksusowego klubu na\n imprezę zamkniętą w Centrum.',
      position: undefined,
      cashChange: -500,
      posRelative: undefined,
      doStart: false,
      fromOthers: 0,
      type: 'risk'
    },
    {
      info: 'Dostajesz w spadku 3000$,\nale musisz zapłacić od nich\npodatek. Pobierz tylko 1000$.',
      position: undefined,
      cashChange: 1000,
      posRelative: undefined,
      doStart: false,
      fromOthers: 0,
      type: 'risk'
    },
    {
      info: 'Skręciłeś kostkę. Wróć na\npole SZPITAL WOJEWÓDŹKI,\naby zrobić pakiet badań.',
      position: 22,
      cashChange: undefined,
      posRelative: undefined,
      doStart: false,
      fromOthers: 0,
      type: 'risk'
    },
    {
      info: 'Pobierz 1000$ za wynajem\nTwojej żaglówki turystom.',
      position: undefined,
      cashChange: 1000,
      posRelative: undefined,
      doStart: false,
      fromOthers: 0,
      type: 'risk'
    },
    {
      info: 'Z ogromnym zyskiem\nodsprzedałeś porcelanę kupioną\nw Starej Rzeźni. Pobierz 300$.',
      position: undefined,
      cashChange: 300,
      posRelative: undefined,
      doStart: false,
      fromOthers: 0,
      type: 'risk'
    },
    {
      info: 'Przejdź na pole START.',
      position: 0,
      cashChange: undefined,
      posRelative: undefined,
      doStart: true,
      fromOthers: 0,
      type: 'risk'
    },
    {
      info: 'Stłukłeś cenny eksponat\nw Muzeum Narodowym.\nZapłać 500$.',
      position: undefined,
      cashChange: -500,
      posRelative: undefined,
      doStart: false,
      fromOthers: 0,
      type: 'risk'
    },
    {
      info: 'Zabalowałeś w klubie\nna Wrocławskiej. Zapłać 200$.',
      position: undefined,
      cashChange: -200,
      posRelative: undefined,
      doStart: false,
      fromOthers: 0,
      type: 'risk'
    },
    {
      info: 'Zapłać 500$ za weekend\nw Hotelu Mercure.',
      position: undefined,
      cashChange: -500,
      posRelative: undefined,
      doStart: false,
      fromOthers: 0,
      type: 'risk'
    },
    {
      info: 'Dostałeś zwrot podatku!\nPobierz 500$.',
      position: undefined,
      cashChange: 500,
      posRelative: undefined,
      doStart: false,
      fromOthers: 0,
      type: 'risk'
    },
    {
      info: 'Znajomi wynajmują od Ciebie\nwillę na tydzień. Pobierz\n100$ od każdego gracza.',
      position: undefined,
      cashChange: undefined,
      posRelative: undefined,
      doStart: false,
      fromOthers: 100,
      type: 'risk'
    },
    {
      info: 'Idziesz na zakupy do centrum\nhandlowego. Zapłać 400$.',
      position: undefined,
      cashChange: -400,
      posRelative: undefined,
      doStart: false,
      fromOthers: 0,
      type: 'risk'
    },
    {
      info: 'Podczas spaceru po\nOGRODZIE UAM znajdujesz\ntelefon. Pobierz 500$\nznaleźnego.',
      position: undefined,
      cashChange: 500,
      posRelative: undefined,
      doStart: false,
      fromOthers: 0,
      type: 'risk'
    },
    {
      info: 'Robisz zakupy na RYNKU\nJEŻYCKIM. Zapłać 50$.',
      position: undefined,
      cashChange: -50,
      posRelative: undefined,
      doStart: false,
      fromOthers: 0,
      type: 'risk'
    }
  
  ]

const chance = [
    {
        info: "Utknąłeś w korku. \n Cofnij się o 4 pola.",
        position: undefined,
        cashChange: 0,
        posRelative: -4,
        doStart: false,
        fromOthers: 0,
        type: 'chance'
    },
    {
        info: "Decydujesz się na chwilę \nodpoczynku. Przejdź na \npole Cytadela.",
        position: 17,
        cashChange: 0,
        posRelative: undefined,
        doStart: false,
        fromOthers: 0,
        type: 'chance'
    },
    {
        info: "Zostałeś oskarżony o oszustwo.\n Idziesz do więzienia.\n Nie przechodzisz przez start",
        position: 12,
        cashChange: 0,
        posRelative: undefined,
        doStart: false,
        fromOthers: 0,
        type: 'chance'
    },
    {
        info: "Wyjdź bezpłatnie z więzienia.\n Zachowaj tę kartę.",
        position: undefined,
        cashChange: 0,
        posRelative: undefined,
        doStart: false,
        fromOthers: 0,
        type: 'chance'
    },
    {
        info: "Czas na relaks. Przejdź na\n pole Rusałka. Jeśli miniesz \npole START, pobierz 200$.",
        position: 11,
        cashChange: 0,
        posRelative: undefined,
        doStart: true,
        fromOthers: 0,
        type: 'chance'
    },
    {
        info: "Wynajmujesz znanego dekoratora.\n Aby urządzić posiadłości zapłać\n za każdy dom zapłać 200$,\na za hotel 600$.",
        position: undefined,
        cashChange: 0,
        posRelative: undefined,
        doStart: false,
        fromOthers: 0,
        type: 'chance'
    },
    {
        info: "Przejdź na pole START.",
        position: 0,
        cashChange: 0,
        posRelative: undefined,
        doStart: true,
        fromOthers: 0,
        type: 'chance'
    },
    {
        info: "Sprzedajesz przez Internet \nbilety do teatru. Pobierz 400$.",
        position: undefined,
        cashChange: 400,
        posRelative: undefined,
        doStart: false,
        fromOthers: 0,
        type: 'chance'
    },
    {
        info: "Wzrost podatku od nieruchomości.\n Zapłać 300$ od każdego domu\n i 600$ od hotelu.",
        position: undefined,
        cashChange: 0,
        posRelative: undefined,
        doStart: false,
        fromOthers: 0,
        type: 'chance'
    },
    {
        info: "Odsprzedajesz swoje akcje \nz zyskiem. Pobierz 1000$.",
        position: undefined,
        cashChange: 1000,
        posRelative: undefined,
        doStart: false,
        fromOthers: 0,
        type: 'chance'
    },
    {
        info: "Zapłać czesne 500$ \nza naukę w prywatnej szkole.",
        position: undefined,
        cashChange: -500,
        posRelative: undefined,
        doStart: false,
        fromOthers: 0,
        type: 'chance'
    },
    {
        info: "Dostałeś mandat za rozmowę\nprzez telefon podczas\njazdy samochodem. Zapłać 100$.",
        position: undefined,
        cashChange: -100,
        posRelative: undefined,
        doStart: false,
        fromOthers: 0,
        type: 'chance'
    },
    {
        info: "Wygrałeś na loterii.\n Pobierz 1000$.",
        position: undefined,
        cashChange: 1000,
        posRelative: undefined,
        doStart: false,
        fromOthers: 0,
        type: 'chance'
    },
    {
        info: "Budujesz kryty basen\nna swoim wieżowcu.\nZapłać 200$.",
        position: undefined,
        cashChange: -200,
        posRelative: undefined,
        doStart: false,
        fromOthers: 0,
        type: 'chance'
    },
    {
        info: "Przejdź na pole STARE ZOO.\nJeżeli miniesz pole START,\n pobierz 200$.",
        position: 28,
        cashChange: 0,
        posRelative: undefined,
        doStart: true,
        fromOthers: 0,
        type: 'chance'
    },
    {
        info: "Wyjdź bezpłatnie z więzienia.\n Zachowaj tę kartę.",
        position: undefined,
        cashChange: 0,
        posRelative: undefined,
        doStart: false,
        fromOthers: 0,
        type: 'chance'
    }
  ]

  module.exports = { risk, chance };