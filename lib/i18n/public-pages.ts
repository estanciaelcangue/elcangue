import type { Locale } from "./config"

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : T extends object
      ? { [K in keyof T]: Widen<T[K]> }
      : T

const es = {
  contact: {
    title: "Contacto",
    intro: "Estamos acá para ayudarte a planificar tu estadía o evento. Escribinos por cualquier consulta.",
    information: "Información de contacto",
    location: "Ubicación",
    phone: "Teléfono",
    email: "Email",
    mapTitle: "Ubicación de Estancia El Cangüé",
    formTitle: "Envianos un mensaje",
    subjects: ["Reserva de alojamiento", "Consulta de eventos", "Bodas", "Visita al Rosedal", "Otro"],
  },
  posada: {
    eyebrow: "Posada de campo",
    title: "Viví una estadía tranquila en la estancia",
    intro: "Un lugar para descansar, compartir y reconectar con la naturaleza, con desayuno incluido, atención cercana y el encanto auténtico de la vida de campo.",
    community: "Gracias a nuestra comunidad por compartir fotos de la estancia y ayudarnos a mostrar este lugar desde una mirada real y cercana.",
    bedConfiguration: "Configuración de camas",
    reserveRoom: "Reservar esta habitación",
    roomDescription: "Una habitación con historia y vistas al entorno natural, equipada para una estadía tranquila y confortable.",
  },
  reservation: {
    errors: ["Seleccioná un alojamiento", "Nombre requerido", "Email inválido", "Teléfono requerido", "Fecha de ingreso requerida", "Fecha de salida requerida", "Seleccioná una configuración de camas"],
    steps: ["Elegí tu alojamiento", "Indicá fechas y huéspedes", "Dejanos tus datos", "Te confirmamos disponibilidad"],
    step: "Paso",
    received: "Solicitud recibida",
    thanks: "Gracias por pensar en El Cangüé",
    receivedText: "Recibimos tu consulta y te contactaremos a la brevedad para confirmar disponibilidad.",
    eyebrow: "Reservá tu estadía",
    title: "Consultá disponibilidad para venir a descansar al campo",
    intro: "Completá esta solicitud y nuestro equipo te responde con opciones y detalles. No es un pago ni una reserva automática.",
    chooseRoomHelp: "Seleccioná la opción que más se ajuste a tu estadía.",
    bedConfiguration: "Configuración de camas",
    datesGuests: "Indicá fechas y huéspedes",
    datesHelp: "Así podemos revisar disponibilidad con precisión.",
    checkIn: "Ingreso",
    checkOut: "Salida",
    adults: "Adultos",
    children: "Menores",
    details: "Dejanos tus datos",
    detailsHelp: "Te contactamos para confirmar disponibilidad.",
    fullName: "Nombre completo",
    phone: "Teléfono / WhatsApp",
    specialRequests: "Consultas o pedidos especiales",
    optional: "Opcional",
    summary: "Resumen de tu solicitud",
    accommodation: "Alojamiento",
    beds: "Camas",
    submit: "Solicitar disponibilidad",
    sending: "Enviando…",
    footer: "Te respondemos con las opciones disponibles para que puedas confirmar tu estadía sin apuro.",
    clear: "Borrar",
    today: "Hoy",
  },
} as const

export type PublicPageDictionary = Widen<typeof es>

export const publicPageDictionaries: Record<Locale, PublicPageDictionary> = {
  es,
  en: {
    contact: {
      title: "Contact",
      intro: "We are here to help you plan your stay or event. Send us any questions you may have.",
      information: "Contact information",
      location: "Location",
      phone: "Phone",
      email: "Email",
      mapTitle: "Estancia El Cangüé location",
      formTitle: "Send us a message",
      subjects: ["Accommodation booking", "Event enquiry", "Weddings", "Rose garden visit", "Other"],
    },
    posada: {
      eyebrow: "Country inn",
      title: "Enjoy a peaceful stay at the estancia",
      intro: "A place to rest, share and reconnect with nature, including breakfast, personal hospitality and the authentic charm of country life.",
      community: "Thank you to our community for sharing photos and helping us show the estancia through a genuine, personal perspective.",
      bedConfiguration: "Bed configuration",
      reserveRoom: "Book this room",
      roomDescription: "A characterful room overlooking the natural surroundings, equipped for a peaceful and comfortable stay.",
    },
    reservation: {
      errors: ["Choose an accommodation", "Name is required", "Invalid email", "Phone is required", "Check-in date is required", "Check-out date is required", "Choose a bed configuration"],
      steps: ["Choose your accommodation", "Enter dates and guests", "Share your details", "We confirm availability"],
      step: "Step", received: "Request received", thanks: "Thank you for considering El Cangüé", receivedText: "We received your enquiry and will contact you shortly to confirm availability.", eyebrow: "Book your stay", title: "Check availability for a countryside break", intro: "Complete this request and our team will reply with options and details. This is not a payment or an automatic booking.", chooseRoomHelp: "Choose the option that best suits your stay.", bedConfiguration: "Bed configuration", datesGuests: "Enter dates and guests", datesHelp: "This helps us check availability accurately.", checkIn: "Check-in", checkOut: "Check-out", adults: "Adults", children: "Children", details: "Share your details", detailsHelp: "We will contact you to confirm availability.", fullName: "Full name", phone: "Phone / WhatsApp", specialRequests: "Questions or special requests", optional: "Optional", summary: "Request summary", accommodation: "Accommodation", beds: "Beds", submit: "Request availability", sending: "Sending…", footer: "We will reply with available options so you can confirm your stay at your own pace.", clear: "Clear", today: "Today",
    },
  },
  fr: {
    contact: {
      title: "Contact",
      intro: "Nous sommes là pour vous aider à organiser votre séjour ou votre événement. Écrivez-nous pour toute question.",
      information: "Coordonnées",
      location: "Adresse",
      phone: "Téléphone",
      email: "E-mail",
      mapTitle: "Localisation de l’Estancia El Cangüé",
      formTitle: "Envoyez-nous un message",
      subjects: ["Réservation d’hébergement", "Demande d’événement", "Mariages", "Visite de la roseraie", "Autre"],
    },
    posada: {
      eyebrow: "Auberge rurale",
      title: "Profitez d’un séjour paisible à l’estancia",
      intro: "Un lieu pour se reposer, partager et renouer avec la nature, avec petit-déjeuner, accueil personnalisé et charme authentique de la campagne.",
      community: "Merci à notre communauté de partager ses photos et de nous aider à montrer l’estancia avec un regard authentique.",
      bedConfiguration: "Configuration des lits",
      reserveRoom: "Réserver cette chambre",
      roomDescription: "Une chambre pleine de caractère avec vue sur la nature, équipée pour un séjour paisible et confortable.",
    },
    reservation: {
      errors: ["Choisissez un hébergement", "Le nom est requis", "E-mail invalide", "Le téléphone est requis", "La date d’arrivée est requise", "La date de départ est requise", "Choisissez une configuration de lits"],
      steps: ["Choisissez votre hébergement", "Indiquez dates et voyageurs", "Laissez vos coordonnées", "Nous confirmons la disponibilité"],
      step: "Étape", received: "Demande reçue", thanks: "Merci de penser à El Cangüé", receivedText: "Nous avons reçu votre demande et vous contacterons rapidement pour confirmer les disponibilités.", eyebrow: "Réservez votre séjour", title: "Consultez les disponibilités pour un séjour à la campagne", intro: "Remplissez cette demande et notre équipe vous répondra avec les options et détails. Il ne s’agit ni d’un paiement ni d’une réservation automatique.", chooseRoomHelp: "Choisissez l’option qui convient le mieux à votre séjour.", bedConfiguration: "Configuration des lits", datesGuests: "Indiquez dates et voyageurs", datesHelp: "Cela nous permet de vérifier précisément les disponibilités.", checkIn: "Arrivée", checkOut: "Départ", adults: "Adultes", children: "Enfants", details: "Laissez vos coordonnées", detailsHelp: "Nous vous contacterons pour confirmer les disponibilités.", fullName: "Nom complet", phone: "Téléphone / WhatsApp", specialRequests: "Questions ou demandes particulières", optional: "Facultatif", summary: "Résumé de votre demande", accommodation: "Hébergement", beds: "Lits", submit: "Demander les disponibilités", sending: "Envoi…", footer: "Nous vous répondrons avec les options disponibles afin de confirmer votre séjour sereinement.", clear: "Effacer", today: "Aujourd’hui",
    },
  },
  pt: {
    contact: {
      title: "Contato",
      intro: "Estamos aqui para ajudar você a planejar sua estadia ou evento. Escreva para qualquer consulta.",
      information: "Informações de contato",
      location: "Localização",
      phone: "Telefone",
      email: "E-mail",
      mapTitle: "Localização da Estancia El Cangüé",
      formTitle: "Envie uma mensagem",
      subjects: ["Reserva de hospedagem", "Consulta sobre eventos", "Casamentos", "Visita ao roseiral", "Outro"],
    },
    posada: {
      eyebrow: "Pousada rural",
      title: "Viva uma estadia tranquila na estancia",
      intro: "Um lugar para descansar, compartilhar e se reconectar com a natureza, com café da manhã, atendimento próximo e o charme autêntico da vida no campo.",
      community: "Obrigado à nossa comunidade por compartilhar fotos e nos ajudar a mostrar a estancia por um olhar verdadeiro e próximo.",
      bedConfiguration: "Configuração das camas",
      reserveRoom: "Reservar este quarto",
      roomDescription: "Um quarto cheio de história com vista para a natureza, equipado para uma estadia tranquila e confortável.",
    },
    reservation: {
      errors: ["Escolha uma hospedagem", "Nome obrigatório", "E-mail inválido", "Telefone obrigatório", "Data de entrada obrigatória", "Data de saída obrigatória", "Escolha uma configuração de camas"],
      steps: ["Escolha sua hospedagem", "Informe datas e hóspedes", "Deixe seus dados", "Confirmamos a disponibilidade"],
      step: "Etapa", received: "Solicitação recebida", thanks: "Obrigado por pensar no El Cangüé", receivedText: "Recebemos sua consulta e entraremos em contato em breve para confirmar a disponibilidade.", eyebrow: "Reserve sua estadia", title: "Consulte a disponibilidade para descansar no campo", intro: "Preencha esta solicitação e nossa equipe responderá com opções e detalhes. Não é um pagamento nem uma reserva automática.", chooseRoomHelp: "Escolha a opção que mais combina com sua estadia.", bedConfiguration: "Configuração das camas", datesGuests: "Informe datas e hóspedes", datesHelp: "Assim podemos verificar a disponibilidade com precisão.", checkIn: "Entrada", checkOut: "Saída", adults: "Adultos", children: "Crianças", details: "Deixe seus dados", detailsHelp: "Entraremos em contato para confirmar a disponibilidade.", fullName: "Nome completo", phone: "Telefone / WhatsApp", specialRequests: "Consultas ou pedidos especiais", optional: "Opcional", summary: "Resumo da solicitação", accommodation: "Hospedagem", beds: "Camas", submit: "Solicitar disponibilidade", sending: "Enviando…", footer: "Responderemos com as opções disponíveis para você confirmar sua estadia com tranquilidade.", clear: "Limpar", today: "Hoje",
    },
  },
}

export function getContactFormLabels(locale: Locale) {
  return {
    es: { name: "Nombre completo", email: "Email", phone: "Teléfono", subject: "Asunto", message: "Mensaje", namePlaceholder: "Tu nombre", phonePlaceholder: "+598…", selectPlaceholder: "Seleccionar…", messagePlaceholder: "Contanos cómo podemos ayudarte…", sending: "Enviando…" },
    en: { name: "Full name", email: "Email", phone: "Phone", subject: "Subject", message: "Message", namePlaceholder: "Your name", phonePlaceholder: "+598…", selectPlaceholder: "Select…", messagePlaceholder: "Tell us how we can help…", sending: "Sending…" },
    fr: { name: "Nom complet", email: "E-mail", phone: "Téléphone", subject: "Objet", message: "Message", namePlaceholder: "Votre nom", phonePlaceholder: "+598…", selectPlaceholder: "Sélectionner…", messagePlaceholder: "Dites-nous comment nous pouvons vous aider…", sending: "Envoi…" },
    pt: { name: "Nome completo", email: "E-mail", phone: "Telefone", subject: "Assunto", message: "Mensagem", namePlaceholder: "Seu nome", phonePlaceholder: "+598…", selectPlaceholder: "Selecionar…", messagePlaceholder: "Conte como podemos ajudar…", sending: "Enviando…" },
  }[locale]
}
