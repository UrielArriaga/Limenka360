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

export { pendingTypes, quickDates };
