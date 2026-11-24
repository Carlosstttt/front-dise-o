import { APP_TITLE } from "@/lib/app-config";

import MonitoringDashboard from "@/components/MonitoringDashboard";

export function meta() {
  return [
    { title: `${APP_TITLE} · Monitoreo` },
    { name: "description", content: "Centro de monitoreo de seguridad en vivo." },
  ];
}

export default function HomeRoute() {
  return <MonitoringDashboard />;
}
