import { useState } from "react";
import {
  IconAlertCircle,
  IconArrowRight,
  IconBell,
  IconCheck,
  IconClock,
  IconDeviceCctv,
  IconLayoutDashboard,
  IconMenu2,
  IconSettings,
  IconShieldCheck,
  IconX,
} from "@tabler/icons-react";
import { signOut } from "@agent-native/core/client";

import { cameras, hourlyAlerts, monitoringMetrics, recentActivity } from "@/lib/monitoring-data";
import "./monitoring-dashboard.css";

const navItems = [
  { label: "Monitoreo", icon: IconDeviceCctv },
  { label: "Historial", icon: IconClock },
  { label: "Configuración", icon: IconSettings },
];

export default function MonitoringDashboard() {
  const [activeSection, setActiveSection] = useState("Monitoreo");
  const [cameraMode, setCameraMode] = useState<"live" | "history">("live");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const openReview = () => {
    setReviewOpen(true);
    setNotice("");
  };

  const closeReview = () => setReviewOpen(false);

  const selectSection = (label: string) => {
    setActiveSection(label);
    setMobileNavOpen(false);
    if (label !== "Monitoreo") setNotice(`${label} estará disponible cuando se conecte esa pantalla.`);
    else setNotice("");
  };

  return (
    <div className="monitoring-app">
      <aside className={`monitoring-sidebar ${mobileNavOpen ? "is-open" : ""}`}>
        <div className="monitoring-brand">
          <span className="brand-mark"><IconDeviceCctv size={23} stroke={2} /></span>
          <span className="brand-copy"><strong>centinela</strong><small>SEGURIDAD CON IA</small></span>
          <button className="icon-button sidebar-close" aria-label="Cerrar menú" onClick={() => setMobileNavOpen(false)}><IconX /></button>
        </div>
        <button className="review-fab" onClick={openReview}><IconAlertCircle size={22} />Revisar alertas</button>
        <div className="nav-caption">CENTRO DE CONTROL</div>
        <nav className="monitoring-nav" aria-label="Navegación principal">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-item ${activeSection === label ? "selected" : ""}`} onClick={() => selectSection(label)}>
              <Icon size={22} stroke={1.8} /><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="system-status">
            <div className="system-heading"><IconCheck size={21} /><strong>Sistema operativo</strong></div>
            <span>IA activa · 120 ms</span>
            <span>Última sincronización 14:32</span>
          </div>
          <div className="campus-name">Campus Central</div>
          <div className="operator-session">Sesión de operador · Demo</div>
        </div>
      </aside>
      {mobileNavOpen && <button className="nav-scrim" aria-label="Cerrar menú" onClick={() => setMobileNavOpen(false)} />}

      <div className="monitoring-main">
        <header className="topbar">
          <button className="icon-button mobile-menu" aria-label="Abrir menú" onClick={() => setMobileNavOpen(true)}><IconMenu2 /></button>
          <div className="breadcrumb"><span>Organización</span><span className="breadcrumb-slash">/</span><strong>Campus Central</strong></div>
          <div className="topbar-actions">
            <span className="live-pill"><i /> EN VIVO</span>
            <div className="current-time"><strong>18 nov 2026</strong><span>14:32 · UTC−5</span></div>
            <button className="notification-button" aria-label="Notificaciones" onClick={openReview}><IconBell size={21} /></button>
            <button className="operator-chip" onClick={() => void signOut()}>Operador</button>
          </div>
        </header>

        <main className="dashboard-content">
          <section className="welcome-row">
            <div><h1>Tu operación, bajo control.</h1><p>Detecta a tiempo. Revisa con contexto. Actúa con criterio.</p></div>
            <span className="date-chip"><IconClock size={17} />Hoy, 18 de noviembre</span>
          </section>

          {notice && <div className="notice-banner" role="status">{notice}<button aria-label="Cerrar aviso" onClick={() => setNotice("")}><IconX size={17} /></button></div>}

          <section className="metrics-grid" aria-label="Resumen de operación">
            {monitoringMetrics.map((metric) => (
              <article className={`metric-card ${metric.tone === "primary" ? "metric-primary" : ""}`} key={metric.label}>
                <div className="metric-top"><span>{metric.label}</span><MetricIcon name={metric.icon} /></div>
                <strong className="metric-value">{metric.value}</strong>
                <small>{metric.detail}</small>
              </article>
            ))}
          </section>

          <section className="priority-alert" aria-label="Alerta prioritaria">
            <IconAlertCircle className="priority-icon" size={25} />
            <div className="priority-copy"><strong>Posible agresión en Acceso principal</strong><span>CAM-01 · 14:31:42 · Confianza 94,2 % · Requiere revisión humana</span></div>
            <button className="primary-button priority-action" onClick={openReview}>Revisar incidente <IconArrowRight size={18} /></button>
          </section>

          <section className="monitoring-grid">
            <div className="camera-section">
              <div className="section-heading"><div><h2>Cámaras en vivo</h2><p>Vista prioritaria · 2 de 24 cámaras</p></div>
                <div className="segmented-control" role="group" aria-label="Vista de cámaras">
                  <button className={cameraMode === "live" ? "active" : ""} onClick={() => setCameraMode("live")}>En vivo</button>
                  <button className={cameraMode === "history" ? "active" : ""} onClick={() => setCameraMode("history")}>Historial</button>
                </div>
              </div>
              {cameraMode === "history" && <div className="history-note">Mostrando las últimas transmisiones registradas. Selecciona “En vivo” para volver a la vista actual.</div>}
              <div className="camera-grid">
                {cameras.map((camera) => (
                  <article className="camera-card" key={camera.id}>
                    <div className="camera-feed" style={{ backgroundImage: `linear-gradient(180deg, rgba(18, 20, 28, .12), rgba(18, 20, 28, .42)), url("${camera.image}")` }}>
                      <span className={`camera-status ${camera.alert ? "camera-status-alert" : ""}`}><i />{camera.status}</span>
                      <span className="camera-live">EN VIVO</span>
                      {camera.alert && <span className="detection-box"><b>Agresión · 94,2 %</b></span>}
                      <span className="camera-timestamp">{camera.id} · {camera.time}</span>
                    </div>
                    <div className="camera-info"><div><strong>{camera.name}</strong><span>{camera.detail}</span></div><button className="camera-open" aria-label={`Abrir ${camera.name}`} onClick={openReview}><IconArrowRight size={21} /></button></div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="activity-card">
              <h2>Actividad reciente</h2>
              <div className="activity-list">
                {recentActivity.map((activity) => (
                  <div className="activity-item" key={activity.title}>
                    <span className={`activity-icon activity-${activity.type}`}>
                      {activity.type === "alert" ? <IconAlertCircle size={22} /> : activity.type === "confirmed" ? <IconCheck size={22} /> : <IconDeviceCctv size={22} />}
                    </span>
                    <div className="activity-copy"><strong>{activity.title}</strong><span>{activity.camera}</span></div>
                    <time>{activity.time}</time>
                  </div>
                ))}
              </div>
              <button className="primary-button history-button" onClick={() => selectSection("Historial")}><IconClock size={18} />Ver historial</button>
            </aside>
          </section>

          <section className="bottom-grid">
            <article className="chart-card">
              <div className="chart-heading"><strong>Alertas durante el día</strong><span>12 detectadas · 7 confirmadas · 2 descartadas · 3 pendientes</span></div>
              <div className="bar-chart" role="img" aria-label="Gráfico de alertas por hora">
                {hourlyAlerts.map((count, index) => <span key={index} className={index === 14 ? "peak" : ""} style={{ height: `${Math.max(8, count * 8)}px` }} title={`${count} alertas`} />)}
              </div>
              <div className="chart-labels"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span></div>
            </article>
            <article className="human-control-card"><IconShieldCheck className="human-check" size={24} /><strong>La IA alerta. Tú decides.</strong><p>Cada detección es una señal, no una confirmación. Revisa antes de actuar.</p><button className="outlined-button" onClick={() => setNotice("Ajustes de detección listos para conectar.")}><IconSettings size={18} />Ajustar detección</button></article>
          </section>
        </main>
      </div>

      {reviewOpen && <div className="review-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeReview(); }}>
        <section className="review-dialog" role="dialog" aria-modal="true" aria-labelledby="review-title">
          <button className="dialog-close" aria-label="Cerrar" onClick={closeReview}><IconX size={20} /></button>
          <span className="dialog-alert-icon"><IconAlertCircle size={24} /></span>
          <p className="dialog-eyebrow">INCIDENTE · CAM-01</p>
          <h2 id="review-title">Posible agresión en Acceso principal</h2>
          <p className="dialog-description">La IA detectó actividad inusual con una confianza del 94,2 %. La confirmación requiere revisión humana.</p>
          <div className="dialog-meta"><span>18 nov 2026 · 14:31:42</span><span>Edificio A</span></div>
          <div className="dialog-actions"><button className="outlined-button" onClick={closeReview}>Volver</button><button className="primary-button" onClick={() => { setReviewOpen(false); setNotice("Incidente marcado para revisión humana."); }}>Marcar para revisión <IconArrowRight size={18} /></button></div>
        </section>
      </div>}
    </div>
  );
}

function MetricIcon({ name }: { name: string }) {
  if (name === "video") return <IconDeviceCctv size={23} />;
  if (name === "alert") return <IconBell size={23} />;
  if (name === "check") return <IconCheck size={23} />;
  return <IconClock size={23} />;
}
