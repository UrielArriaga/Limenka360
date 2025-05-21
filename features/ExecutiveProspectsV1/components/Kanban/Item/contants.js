import {
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  Email as EmailIcon,
  Event as EventIcon,
  Group as GroupIcon,
  AccessTime as AccessTimeIcon,
  Today as TodayIcon,
  DateRange as DateRangeIcon,
} from "@material-ui/icons";

const pendingTypes = [
  { value: "call", label: "Llamada", icon: <PhoneIcon /> },
  { value: "whatsapp", label: "WhatsApp", icon: <WhatsAppIcon /> },
  { value: "email", label: "Email", icon: <EmailIcon /> },
  { value: "meeting", label: "Reunión", icon: <GroupIcon /> },
  { value: "other", label: "Otro", icon: <EventIcon /> },
  {
    value: "video_call",
    label: "Videollamada",
    icon: <EventIcon />,
  },
];

const quickDates = [
  { value: "1h", label: "1 hora", icon: <AccessTimeIcon /> },
  { value: "1d", label: "1 día", icon: <TodayIcon /> },
  { value: "3d", label: "3 días", icon: <DateRangeIcon /> },
  { value: "5d", label: "5 días", icon: <DateRangeIcon /> },
];

const optionsTypeMessage = [
  {
    label: "✨ Reducir el mensaje",
    value:
      "Reduce el siguiente mensaje que será enviado a un prospecto, manteniendo su intención original pero usando menos palabras. Sé claro y directo.",
  },
  {
    label: "💬 Ampliar el mensaje",
    value:
      "Ampliar el siguiente mensaje agregando contexto, cortesía y un cierre apropiado. Mantén la intención original pero hazlo más completo y profesional si es necesario.",
  },
  {
    label: "💼 Hacer más formal el mensaje",
    value:
      "Convierte el siguiente mensaje en un mensaje formal, utilizando lenguaje profesional, evitando modismos, y con una estructura clara, incluyendo saludo y despedida si es posible.",
  },
  {
    label: "😊 Hacer más casual el mensaje",
    value:
      "Transforma el siguiente mensaje en uno casual, amigable y cercano. Puedes usar emoticonos si es adecuado, frases coloquiales y un tono relajado, pero sin perder claridad.",
  },
];

export { pendingTypes, quickDates, optionsTypeMessage };
