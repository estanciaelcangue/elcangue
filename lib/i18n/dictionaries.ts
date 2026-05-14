import { defaultLocale, normalizeLocale, type Locale } from "@/lib/i18n/config"

type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : T extends object
          ? { [K in keyof T]: Widen<T[K]> }
          : T

const es = {
  site: {
    name: "Estancia El Cangüé",
    metadata: {
      title: "Estancia El Cangüé | Turismo Rural en Uruguay",
      description:
        "Descubrí la magia del campo uruguayo en Estancia El Cangüé. Alojamiento rural, eventos, bodas y experiencias únicas en un entorno natural privilegiado.",
      keywords: ["estancia", "turismo rural", "Uruguay", "bodas", "eventos", "alojamiento", "campo"],
      openGraphLocale: "es_UY",
    },
  },
  nav: {
    posada: "Posada de Campo",
    eventos: "Eventos",
    blog: "Noticias",
    destinationWedding: "Destination Wedding",
    rosedal: "El Rosedal",
    contacto: "Contacto",
  },
  common: {
    contact: "Contactar",
    contactUs: "Contactanos",
    bookNow: "Reservar ahora",
    send: "Enviar",
    sending: "Enviando...",
    languageSwitcher: "Cambiar idioma",
    toggleMenu: "Abrir o cerrar menú",
    by: "Por",
    loading: "Cargando...",
  },
  footer: {
    contactTitle: "Contactanos",
    address: "Ruta 3 km 358.5, Paysandú, Uruguay",
  },
  home: {
    hero: {
      eyebrow: "Estancia rural en Paysandú, Uruguay",
      srTitle: "Vive la experiencia Cangüé",
      titlePrefix: "Vive la experiencia",
      signature: "Cangüé",
      intro:
        "Campo, calma y hospitalidad familiar en una casa con alma. Un refugio para alojarse, celebrar y volver a mirar el día sin apuro.",
      primaryCta: "Reservar ahora",
      secondaryCta: "Conocer la posada",
      tags: ["Posada", "Eventos", "Naturaleza"],
    },
    about: {
      eyebrow: "Nuestra Historia",
      imageAlt: "Foto histórica de la familia fundadora",
      cta: "Reservar ahora",
      paragraphs: [
        "La historia de la Estancia El Cangüé es una historia de supervivencia y de amor profundo por nuestras raíces, sobrevivencia al paso del tiempo, nunca tan cierto aquello de que \"las nuevas del tiempo plasarán su mies\". Por acá discurrieron tantos años de vida, estas viejas paredes y campos han sido testigo de todos los acontecimientos importantes de la vida, matrimonios, nacimientos, cumpleaños... pero también tristes partidas.",
        "Cuántas historias de vida llenan sus memorias como algo vivo, tangible, que constituyen quizás, el espíritu de la Estancia que nos envuelve como un manto apenas entrar. Una \"casa con alma\". Y amor profundo que se vuelve eterno cuando se transmite de padres a hijos, por la tierra y la naturaleza que nos rodea.",
        "Para nuestra familia, nuestra historia de amor con la estancia comenzó por allá por el 1920, cuando Pablo, un inmigrante de padre alemán y madre belga, se conoció y se enamoró de su vecina de balcón en el barrio de Caballito en Buenos Aires. Anita, una inmigrante polaca, salvada por su madrina de la disolución de la Polonia de posguerra.",
        "De esta vecindad fortuita nació una boda y de allí una familia que llegó a Uruguay por los años 20 en busca de nuevos horizontes y establecer raíces. Así comenzó nuestra historia en El Cangüé.",
      ],
    },
    accommodation: {
      roomAlt: "Habitación",
    },
    testimonials: {
      heading: "Lo que dicen nuestros huéspedes",
      previous: "Testimonio anterior",
      next: "Siguiente testimonio",
      goTo: "Ir a testimonio",
      items: [
        {
          name: "Estela",
          text: "En el medio del campo, somos súper fans con mi familia y pasamos un fin de semana muy lindo, superaron nuestras expectativas. Atención es divina. Habitaciones con todos los detalles de un hotel y la calidez de una casa. Desayunos exquisitos. El entorno es hermoso y súper tranquilo. Un lugar para volver.",
          rating: 5,
        },
        {
          name: "María",
          text: "Celebramos nuestra boda en El Cangüé y fue simplemente mágico. El equipo cuidó cada detalle y nuestros invitados todavía hablan de lo especial que fue. Un lugar de ensueño.",
          rating: 5,
        },
        {
          name: "Roberto",
          text: "Organicé un retiro corporativo para mi equipo y superaron todas las expectativas. Las actividades de integración, la comida y las instalaciones fueron impecables.",
          rating: 5,
        },
      ],
    },
    contact: {
      contactTitle: "Contactanos",
      findUs: "Encontranos",
      availabilityTitle: "Consultanos por disponibilidad",
      mapTitle: "Ubicación de Estancia El Cangüé",
      addressLines: ["Paysandú, Departamento de", "Paysandú, Uruguay"],
      guestPlaceholder: "Seleccionar...",
      guests: ["1 huésped", "2 huéspedes", "3 huéspedes", "4 huéspedes", "5+ huéspedes"],
      namePlaceholder: "Nombre",
      emailPlaceholder: "Email",
      messagePlaceholder: "Mensaje (opcional)",
      successMessage: "Gracias por tu mensaje. Te contactaremos pronto.",
    },
  },
  blog: {
    title: "Blog de El Cangüé",
    subtitle: "Novedades, Eventos y Experiencias",
    upcomingEvents: "Próximos Eventos",
    all: "Todos",
    loadingPosts: "Cargando publicaciones...",
    loadingError: "No pudimos cargar el contenido del blog en este momento.",
    emptyCategory: "No hay publicaciones en esta categoría.",
    readMore: "Leer más",
    backToBlog: "Volver al Blog",
    relatedPosts: "Publicaciones Relacionadas",
    eventLabel: "Evento",
    otherEvents: "Otros Eventos",
    reserve: "Reservar",
    ctaExperienceTitle: "Viví la Experiencia Cangüé",
    ctaExperienceText:
      "Te invitamos a conocer nuestra estancia, disfrutar de la tranquilidad del campo uruguayo y crear recuerdos inolvidables.",
    ctaEventTitle: "Organizá tu Evento en El Cangüé",
    ctaEventText:
      "Bodas, cumpleaños, aniversarios, eventos corporativos... cada celebración en El Cangüé es única e inolvidable.",
    ctaEventLink: "Conocé Nuestros Eventos",
    categories: {
      novedades: "Novedades",
      eventos: "Eventos",
      prensa: "Prensa",
      experiencias: "Experiencias",
    },
  },
} as const

export type Dictionary = Widen<typeof es>

export const dictionaries = {
  es,
  en: {
    site: {
      name: "Estancia El Cangüé",
      metadata: {
        title: "Estancia El Cangüé | Rural Tourism in Uruguay",
        description:
          "Discover the magic of the Uruguayan countryside at Estancia El Cangüé. Rural lodging, events, weddings, and unique experiences in a privileged natural setting.",
        keywords: ["estancia", "rural tourism", "Uruguay", "weddings", "events", "lodging", "countryside"],
        openGraphLocale: "en_US",
      },
    },
    nav: {
      posada: "Country Inn",
      eventos: "Events",
      blog: "News",
      destinationWedding: "Destination Wedding",
      rosedal: "Rose Garden",
      contacto: "Contact",
    },
    common: {
      contact: "Contact",
      contactUs: "Contact us",
      bookNow: "Book now",
      send: "Send",
      sending: "Sending...",
      languageSwitcher: "Change language",
      toggleMenu: "Open or close menu",
      by: "By",
      loading: "Loading...",
    },
    footer: {
      contactTitle: "Contact us",
      address: "Route 3 km 358.5, Paysandú, Uruguay",
    },
    home: {
      hero: {
        eyebrow: "Rural estancia in Paysandú, Uruguay",
        srTitle: "Live the Cangüé experience",
        titlePrefix: "Live the experience",
        signature: "Cangüé",
        intro:
          "Countryside, calm, and family hospitality in a house with soul. A refuge for staying, celebrating, and slowing down the day.",
        primaryCta: "Book now",
        secondaryCta: "Explore the inn",
        tags: ["Inn", "Events", "Nature"],
      },
      about: {
        eyebrow: "Our Story",
        imageAlt: "Historic photo of the founding family",
        cta: "Book now",
        paragraphs: [
          "The story of Estancia El Cangüé is a story of survival and deep love for our roots, shaped by the passage of time and the life held by these old walls and fields.",
          "So many life stories fill its memory like something living and tangible: the spirit of the estancia that embraces you as soon as you arrive. A house with soul.",
          "For our family, the love story with the estancia began around 1920, when Pablo, the son of a German father and Belgian mother, met Anita, a Polish immigrant, in Buenos Aires.",
          "From that chance neighborhood came a wedding, and from that wedding a family that arrived in Uruguay in the 1920s seeking new horizons. That is how our story in El Cangüé began.",
        ],
      },
      accommodation: {
        roomAlt: "Room",
      },
      testimonials: {
        heading: "What our guests say",
        previous: "Previous testimonial",
        next: "Next testimonial",
        goTo: "Go to testimonial",
        items: [
          {
            name: "Estela",
            text: "In the middle of the countryside, my family and I are true fans. We spent a beautiful weekend and it exceeded our expectations. The attention is wonderful, the rooms have hotel-level details with the warmth of a home, and breakfast is delicious.",
            rating: 5,
          },
          {
            name: "Maria",
            text: "We celebrated our wedding at El Cangüé and it was simply magical. The team cared for every detail and our guests still talk about how special it was.",
            rating: 5,
          },
          {
            name: "Roberto",
            text: "I organized a corporate retreat for my team and it exceeded every expectation. The activities, food, and facilities were impeccable.",
            rating: 5,
          },
        ],
      },
      contact: {
        contactTitle: "Contact us",
        findUs: "Find us",
        availabilityTitle: "Ask us about availability",
        mapTitle: "Estancia El Cangüé location",
        addressLines: ["Paysandú, Department of", "Paysandú, Uruguay"],
        guestPlaceholder: "Select...",
        guests: ["1 guest", "2 guests", "3 guests", "4 guests", "5+ guests"],
        namePlaceholder: "Name",
        emailPlaceholder: "Email",
        messagePlaceholder: "Message (optional)",
        successMessage: "Thank you for your message. We will contact you soon.",
      },
    },
    blog: {
      title: "El Cangüé Blog",
      subtitle: "News, Events, and Experiences",
      upcomingEvents: "Upcoming Events",
      all: "All",
      loadingPosts: "Loading posts...",
      loadingError: "We could not load the blog content right now.",
      emptyCategory: "There are no posts in this category.",
      readMore: "Read more",
      backToBlog: "Back to Blog",
      relatedPosts: "Related Posts",
      eventLabel: "Event",
      otherEvents: "Other Events",
      reserve: "Reserve",
      ctaExperienceTitle: "Live the Cangüé Experience",
      ctaExperienceText:
        "We invite you to discover our estancia, enjoy the calm of the Uruguayan countryside, and create unforgettable memories.",
      ctaEventTitle: "Plan your Event at El Cangüé",
      ctaEventText:
        "Weddings, birthdays, anniversaries, corporate events... every celebration at El Cangüé is unique and unforgettable.",
      ctaEventLink: "Explore Our Events",
      categories: {
        novedades: "News",
        eventos: "Events",
        prensa: "Press",
        experiencias: "Experiences",
      },
    },
  },
  fr: {
    site: {
      name: "Estancia El Cangüé",
      metadata: {
        title: "Estancia El Cangüé | Tourisme rural en Uruguay",
        description:
          "Découvrez la magie de la campagne uruguayenne à l'Estancia El Cangüé. Hébergement rural, événements, mariages et expériences uniques dans un cadre naturel privilégié.",
        keywords: ["estancia", "tourisme rural", "Uruguay", "mariages", "événements", "hébergement", "campagne"],
        openGraphLocale: "fr_FR",
      },
    },
    nav: {
      posada: "Auberge rurale",
      eventos: "Événements",
      blog: "Actualités",
      destinationWedding: "Mariage destination",
      rosedal: "La Roseraie",
      contacto: "Contact",
    },
    common: {
      contact: "Contact",
      contactUs: "Contactez-nous",
      bookNow: "Réserver",
      send: "Envoyer",
      sending: "Envoi...",
      languageSwitcher: "Changer de langue",
      toggleMenu: "Ouvrir ou fermer le menu",
      by: "Par",
      loading: "Chargement...",
    },
    footer: {
      contactTitle: "Contactez-nous",
      address: "Route 3 km 358.5, Paysandú, Uruguay",
    },
    home: {
      hero: {
        eyebrow: "Estancia rurale à Paysandú, Uruguay",
        srTitle: "Vivez l'expérience Cangüé",
        titlePrefix: "Vivez l'expérience",
        signature: "Cangüé",
        intro:
          "Campagne, calme et hospitalité familiale dans une maison avec une âme. Un refuge pour séjourner, célébrer et ralentir le rythme.",
        primaryCta: "Réserver",
        secondaryCta: "Découvrir l'auberge",
        tags: ["Auberge", "Événements", "Nature"],
      },
      about: {
        eyebrow: "Notre histoire",
        imageAlt: "Photo historique de la famille fondatrice",
        cta: "Réserver",
        paragraphs: [
          "L'histoire de l'Estancia El Cangüé est une histoire de survie et d'amour profond pour nos racines, façonnée par le passage du temps et la vie gardée par ces vieux murs et ces champs.",
          "Tant d'histoires remplissent sa mémoire comme quelque chose de vivant et tangible : l'esprit de l'estancia qui vous enveloppe dès l'arrivée. Une maison avec une âme.",
          "Pour notre famille, l'histoire d'amour avec l'estancia a commencé vers 1920, lorsque Pablo, fils d'un père allemand et d'une mère belge, rencontra Anita, immigrée polonaise, à Buenos Aires.",
          "De ce voisinage fortuit naquit un mariage, puis une famille arrivée en Uruguay dans les années 1920 à la recherche de nouveaux horizons. Ainsi commença notre histoire à El Cangüé.",
        ],
      },
      accommodation: {
        roomAlt: "Chambre",
      },
      testimonials: {
        heading: "Ce que disent nos hôtes",
        previous: "Témoignage précédent",
        next: "Témoignage suivant",
        goTo: "Aller au témoignage",
        items: [
          {
            name: "Estela",
            text: "Au milieu de la campagne, ma famille et moi sommes de vrais admirateurs. Nous avons passé un très beau week-end et l'expérience a dépassé nos attentes. L'attention est merveilleuse, les chambres sont soignées et le petit-déjeuner est délicieux.",
            rating: 5,
          },
          {
            name: "Maria",
            text: "Nous avons célébré notre mariage à El Cangüé et ce fut tout simplement magique. L'équipe a pris soin de chaque détail et nos invités en parlent encore.",
            rating: 5,
          },
          {
            name: "Roberto",
            text: "J'ai organisé une retraite d'entreprise pour mon équipe et tout a dépassé nos attentes. Les activités, la cuisine et les installations étaient impeccables.",
            rating: 5,
          },
        ],
      },
      contact: {
        contactTitle: "Contactez-nous",
        findUs: "Nous trouver",
        availabilityTitle: "Demandez nos disponibilités",
        mapTitle: "Emplacement de l'Estancia El Cangüé",
        addressLines: ["Paysandú, département de", "Paysandú, Uruguay"],
        guestPlaceholder: "Sélectionner...",
        guests: ["1 hôte", "2 hôtes", "3 hôtes", "4 hôtes", "5+ hôtes"],
        namePlaceholder: "Nom",
        emailPlaceholder: "Email",
        messagePlaceholder: "Message (optionnel)",
        successMessage: "Merci pour votre message. Nous vous contacterons bientôt.",
      },
    },
    blog: {
      title: "Blog d'El Cangüé",
      subtitle: "Actualités, événements et expériences",
      upcomingEvents: "Prochains événements",
      all: "Tous",
      loadingPosts: "Chargement des publications...",
      loadingError: "Nous n'avons pas pu charger le contenu du blog pour le moment.",
      emptyCategory: "Il n'y a pas de publications dans cette catégorie.",
      readMore: "Lire la suite",
      backToBlog: "Retour au blog",
      relatedPosts: "Publications liées",
      eventLabel: "Événement",
      otherEvents: "Autres événements",
      reserve: "Réserver",
      ctaExperienceTitle: "Vivez l'expérience Cangüé",
      ctaExperienceText:
        "Nous vous invitons à découvrir notre estancia, profiter du calme de la campagne uruguayenne et créer des souvenirs inoubliables.",
      ctaEventTitle: "Organisez votre événement à El Cangüé",
      ctaEventText:
        "Mariages, anniversaires, événements d'entreprise... chaque célébration à El Cangüé est unique et inoubliable.",
      ctaEventLink: "Découvrir nos événements",
      categories: {
        novedades: "Actualités",
        eventos: "Événements",
        prensa: "Presse",
        experiencias: "Expériences",
      },
    },
  },
  pt: {
    site: {
      name: "Estancia El Cangüé",
      metadata: {
        title: "Estancia El Cangüé | Turismo rural no Uruguai",
        description:
          "Descubra a magia do campo uruguaio na Estancia El Cangüé. Hospedagem rural, eventos, casamentos e experiências únicas em um ambiente natural privilegiado.",
        keywords: ["estancia", "turismo rural", "Uruguai", "casamentos", "eventos", "hospedagem", "campo"],
        openGraphLocale: "pt_BR",
      },
    },
    nav: {
      posada: "Pousada rural",
      eventos: "Eventos",
      blog: "Notícias",
      destinationWedding: "Destination Wedding",
      rosedal: "Roseiral",
      contacto: "Contato",
    },
    common: {
      contact: "Contato",
      contactUs: "Fale conosco",
      bookNow: "Reservar",
      send: "Enviar",
      sending: "Enviando...",
      languageSwitcher: "Alterar idioma",
      toggleMenu: "Abrir ou fechar menu",
      by: "Por",
      loading: "Carregando...",
    },
    footer: {
      contactTitle: "Fale conosco",
      address: "Rota 3 km 358.5, Paysandú, Uruguai",
    },
    home: {
      hero: {
        eyebrow: "Estancia rural em Paysandú, Uruguai",
        srTitle: "Viva a experiência Cangüé",
        titlePrefix: "Viva a experiência",
        signature: "Cangüé",
        intro:
          "Campo, calma e hospitalidade familiar em uma casa com alma. Um refúgio para se hospedar, celebrar e desacelerar o dia.",
        primaryCta: "Reservar",
        secondaryCta: "Conhecer a pousada",
        tags: ["Pousada", "Eventos", "Natureza"],
      },
      about: {
        eyebrow: "Nossa história",
        imageAlt: "Foto histórica da família fundadora",
        cta: "Reservar",
        paragraphs: [
          "A história da Estancia El Cangüé é uma história de sobrevivência e de amor profundo por nossas raízes, moldada pela passagem do tempo e pela vida guardada por estas antigas paredes e campos.",
          "Tantas histórias preenchem sua memória como algo vivo e tangível: o espírito da estancia que envolve você assim que chega. Uma casa com alma.",
          "Para nossa família, a história de amor com a estancia começou por volta de 1920, quando Pablo, filho de pai alemão e mãe belga, conheceu Anita, imigrante polonesa, em Buenos Aires.",
          "Dessa vizinhança fortuita nasceu um casamento e, dele, uma família que chegou ao Uruguai nos anos 1920 em busca de novos horizontes. Assim começou nossa história em El Cangüé.",
        ],
      },
      accommodation: {
        roomAlt: "Quarto",
      },
      testimonials: {
        heading: "O que dizem nossos hóspedes",
        previous: "Depoimento anterior",
        next: "Próximo depoimento",
        goTo: "Ir para depoimento",
        items: [
          {
            name: "Estela",
            text: "No meio do campo, minha família e eu somos fãs. Passamos um fim de semana lindo e a experiência superou nossas expectativas. O atendimento é maravilhoso, os quartos são muito cuidados e o café da manhã é delicioso.",
            rating: 5,
          },
          {
            name: "Maria",
            text: "Celebramos nosso casamento no El Cangüé e foi simplesmente mágico. A equipe cuidou de cada detalhe e nossos convidados ainda falam de como foi especial.",
            rating: 5,
          },
          {
            name: "Roberto",
            text: "Organizei um retiro corporativo para minha equipe e tudo superou as expectativas. As atividades, a comida e as instalações foram impecáveis.",
            rating: 5,
          },
        ],
      },
      contact: {
        contactTitle: "Fale conosco",
        findUs: "Encontre-nos",
        availabilityTitle: "Consulte disponibilidade",
        mapTitle: "Localização da Estancia El Cangüé",
        addressLines: ["Paysandú, Departamento de", "Paysandú, Uruguai"],
        guestPlaceholder: "Selecionar...",
        guests: ["1 hóspede", "2 hóspedes", "3 hóspedes", "4 hóspedes", "5+ hóspedes"],
        namePlaceholder: "Nome",
        emailPlaceholder: "Email",
        messagePlaceholder: "Mensagem (opcional)",
        successMessage: "Obrigado pela mensagem. Entraremos em contato em breve.",
      },
    },
    blog: {
      title: "Blog do El Cangüé",
      subtitle: "Novidades, Eventos e Experiências",
      upcomingEvents: "Próximos eventos",
      all: "Todos",
      loadingPosts: "Carregando publicações...",
      loadingError: "Não foi possível carregar o conteúdo do blog neste momento.",
      emptyCategory: "Não há publicações nesta categoria.",
      readMore: "Ler mais",
      backToBlog: "Voltar ao Blog",
      relatedPosts: "Publicações relacionadas",
      eventLabel: "Evento",
      otherEvents: "Outros eventos",
      reserve: "Reservar",
      ctaExperienceTitle: "Viva a Experiência Cangüé",
      ctaExperienceText:
        "Convidamos você a conhecer nossa estancia, aproveitar a tranquilidade do campo uruguaio e criar memórias inesquecíveis.",
      ctaEventTitle: "Organize seu evento no El Cangüé",
      ctaEventText:
        "Casamentos, aniversários, eventos corporativos... cada celebração no El Cangüé é única e inesquecível.",
      ctaEventLink: "Conheça nossos eventos",
      categories: {
        novedades: "Novidades",
        eventos: "Eventos",
        prensa: "Imprensa",
        experiencias: "Experiências",
      },
    },
  },
} satisfies Record<Locale, Dictionary>

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale]
}

export function getDictionaryByLocale(value: string | null | undefined): Dictionary {
  return getDictionary(normalizeLocale(value))
}
