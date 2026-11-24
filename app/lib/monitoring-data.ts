export const monitoringMetrics = [
  {
    label: "Cámaras conectadas",
    value: "24 / 24",
    detail: "Todas transmitiendo",
    icon: "video",
    tone: "surface",
  },
  {
    label: "Alertas de hoy",
    value: "12",
    detail: "3 pendientes de revisión",
    icon: "alert",
    tone: "primary",
  },
  {
    label: "Incidentes confirmados",
    value: "07",
    detail: "Verificados por un operador",
    icon: "check",
    tone: "surface",
  },
  {
    label: "Tiempo de respuesta",
    value: "120 ms",
    detail: "Análisis de IA en tiempo real",
    icon: "clock",
    tone: "surface",
  },
] as const;

export const cameras = [
  {
    id: "CAM-01",
    name: "Acceso principal",
    detail: "Edificio A · Alerta por revisar",
    status: "Posible agresión",
    time: "18/11/2026 14:32:08",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/24b899c9aa538594d2afd486d38c2627c33f9bc9?width=748",
    alert: true,
  },
  {
    id: "CAM-02",
    name: "Estacionamiento norte",
    detail: "Zona exterior · IA analizando",
    status: "Sin anomalías",
    time: "18/11/2026 14:32:08",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/033ece4601d61762ee18ad8f75c356d65a2a94f7?width=748",
    alert: false,
  },
] as const;

export const recentActivity = [
  {
    title: "Posible agresión",
    camera: "CAM-01 · Acceso principal",
    time: "14:31",
    type: "alert",
  },
  {
    title: "Incidente confirmado",
    camera: "CAM-07 · Patio de carga",
    time: "14:24",
    type: "confirmed",
  },
  {
    title: "Conexión restablecida",
    camera: "CAM-12 · Recepción",
    time: "14:18",
    type: "camera",
  },
] as const;

export const hourlyAlerts = [
  1, 1, 1, 1, 1, 1, 1, 3, 2, 1, 3, 3, 5, 3, 9, 3, 3, 1, 1, 1, 1, 1, 1, 1,
];
