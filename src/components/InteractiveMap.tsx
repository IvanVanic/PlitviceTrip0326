"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

// ---------------------------------------------------------------------------
// Type-only imports so the module is never imported during SSR.
// We do all real imports inside useEffect, which only runs in the browser.
// ---------------------------------------------------------------------------

interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  color: string;      // hex for the marker fill
  ring: string;       // hex for the marker border
  label: string;      // short badge text
  tagline: string;
  detail: string;
  type: "start" | "optional" | "recommended" | "destination" | "hotel";
}

const STOPS: Stop[] = [
  {
    id: "rijeka",
    name: "Rijeka",
    lat: 45.3271,
    lng: 14.4422,
    color: "#3d7a45",
    ring: "#1e3a22",
    label: "START",
    tagline: "Departure point",
    detail: "Leave by 07:00 to reach Plitvice before ticket sales close (13:00).",
    type: "start",
  },
  {
    id: "ogulin",
    name: "Ogulin",
    lat: 45.2661,
    lng: 15.2275,
    color: "#b88052",
    ring: "#7a5436",
    label: "OPTIONAL",
    tagline: "Coffee stop — ~1 hr from Rijeka",
    detail: "80 km from Rijeka. Good rest stop if you need fuel or coffee on the A1.",
    type: "optional",
  },
  {
    id: "rastoke",
    name: "Rastoke / Slunj",
    lat: 45.1167,
    lng: 15.5833,
    color: "#2185b6",
    ring: "#0c2d4a",
    label: "STOP",
    tagline: "Recommended — ~1 hr 45 min from Rijeka",
    detail: "€5/person. Waterfalls cascading through old mill-houses. Allow 45–60 min.",
    type: "recommended",
  },
  {
    id: "entrance1",
    name: "Plitvice — Entrance 1",
    lat: 44.9054,
    lng: 15.6102,
    color: "#c0392b",
    ring: "#7b241c",
    label: "PARK",
    tagline: "Destination — ~2.5 hrs from Rijeka",
    detail: "Only entrance open in March (winter schedule). Tickets: €6 student / €10 adult. Sales close at 13:00.",
    type: "destination",
  },
  {
    id: "degenija",
    name: "Hotel Degenija",
    lat: 44.878,
    lng: 15.592,
    color: "#8e44ad",
    ring: "#6c3483",
    label: "HOTEL",
    tagline: "Accommodation — in-room hot tub",
    detail: "~€154–204/night. Best restaurant in the area. Book peka dinner 24–48 hrs ahead.",
    type: "hotel",
  },
];

// Route polyline — connect stops in driving order
const ROUTE_LATLNGS: [number, number][] = STOPS.map((s) => [s.lat, s.lng]);

// ---------------------------------------------------------------------------
// SVG pin builder — returns a data-URI so we avoid any filesystem access
// ---------------------------------------------------------------------------
function buildMarkerSvg(fill: string, ring: string, label: string): string {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="44" height="54" viewBox="0 0 44 54">
  <defs>
    <filter id="sh" x="-30%" y="-10%" width="160%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#00000040"/>
    </filter>
  </defs>
  <!-- Pin body -->
  <path d="M22 2 C11.5 2 3 10.5 3 21 C3 33 22 52 22 52 C22 52 41 33 41 21 C41 10.5 32.5 2 22 2 Z"
        fill="${fill}" stroke="${ring}" stroke-width="2.5" filter="url(#sh)"/>
  <!-- Inner circle -->
  <circle cx="22" cy="21" r="10" fill="white" opacity="0.95"/>
  <!-- Label text -->
  <text x="22" y="25" text-anchor="middle" font-family="Inter,system-ui,sans-serif"
        font-size="7" font-weight="700" fill="${ring}" letter-spacing="0.3">${label}</text>
</svg>`.trim();
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  // Store the Leaflet map instance so we can destroy it on unmount
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletMapRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    // Dynamic import so Leaflet is never touched during SSR
    import("leaflet").then((L) => {
      // -----------------------------------------------------------------------
      // Fix the default icon broken-image problem that webpack causes.
      // We replace the default icon entirely so it never tries to load from
      // the filesystem or any relative path that doesn't exist in static export.
      // -----------------------------------------------------------------------
      // @ts-expect-error — private Leaflet internals
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // -----------------------------------------------------------------------
      // Initialise the map
      // -----------------------------------------------------------------------
      const map = L.map(mapRef.current!, {
        center: [45.0, 15.1],
        zoom: 9,
        zoomControl: false,
        attributionControl: true,
      });

      leafletMapRef.current = map;

      // Zoom control in bottom-right so it doesn't fight the legend
      L.control.zoom({ position: "bottomright" }).addTo(map);

      // OpenStreetMap tiles — no API key required
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // -----------------------------------------------------------------------
      // Route polyline
      // -----------------------------------------------------------------------
      L.polyline(ROUTE_LATLNGS, {
        color: "#2d5a33",
        weight: 4,
        opacity: 0.75,
        dashArray: "10 6",
        lineJoin: "round",
      }).addTo(map);

      // -----------------------------------------------------------------------
      // Markers with custom SVG pins
      // -----------------------------------------------------------------------
      STOPS.forEach((stop) => {
        const iconUrl = buildMarkerSvg(stop.color, stop.ring, stop.label);

        const icon = L.icon({
          iconUrl,
          iconSize: [44, 54],
          iconAnchor: [22, 54],
          popupAnchor: [0, -56],
        });

        const popupHtml = `
          <div style="font-family:Inter,system-ui,sans-serif;min-width:200px;max-width:260px;">
            <div style="background:${stop.color};color:#fff;border-radius:8px 8px 0 0;padding:10px 14px 8px;">
              <span style="font-size:9px;font-weight:700;letter-spacing:1px;opacity:0.85;text-transform:uppercase;">${stop.label}</span>
              <div style="font-size:16px;font-weight:700;line-height:1.2;margin-top:2px;">${stop.name}</div>
              <div style="font-size:11px;opacity:0.9;margin-top:3px;">${stop.tagline}</div>
            </div>
            <div style="padding:10px 14px 12px;background:#fefdfb;border-radius:0 0 8px 8px;border:1px solid #eddecb;border-top:none;">
              <p style="margin:0;font-size:12px;line-height:1.55;color:#2c2825;">${stop.detail}</p>
            </div>
          </div>
        `;

        L.marker([stop.lat, stop.lng], { icon })
          .addTo(map)
          .bindPopup(popupHtml, {
            maxWidth: 280,
            className: "plitvice-popup",
          });
      });

      // -----------------------------------------------------------------------
      // Fit bounds to show all stops with generous padding
      // -----------------------------------------------------------------------
      const bounds = L.latLngBounds(ROUTE_LATLNGS);
      map.fitBounds(bounds, { padding: [50, 50] });
    });

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Legend data (mirrors STOPS types)
  // ---------------------------------------------------------------------------
  const legendItems = [
    { color: "#3d7a45", ring: "#1e3a22", label: "Start", desc: "Rijeka departure" },
    { color: "#b88052", ring: "#7a5436", label: "Optional", desc: "Rest stop" },
    { color: "#2185b6", ring: "#0c2d4a", label: "Stop", desc: "Recommended visit" },
    { color: "#c0392b", ring: "#7b241c", label: "Park", desc: "Plitvice entrance" },
    { color: "#8e44ad", ring: "#6c3483", label: "Hotel", desc: "Accommodation" },
  ];

  return (
    <div className="relative w-full">
      {/* Map container */}
      <div
        ref={mapRef}
        className="w-full rounded-2xl shadow-xl overflow-hidden border border-earth-100"
        style={{
          minHeight: "clamp(350px, 55vw, 600px)",
          // Tailwind classes for min-height based on breakpoints are set inline
          // to ensure they work without purge issues on dynamic content.
        }}
        aria-label="Interactive map showing driving route from Rijeka to Plitvice Lakes"
        role="img"
      />

      {/* Legend overlay — bottom-left inside the map wrapper */}
      <div
        className="absolute bottom-3 left-3 z-[1000] bg-warm-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-earth-200 px-4 py-3"
        aria-label="Map legend"
      >
        <p
          className="font-heading text-xs font-semibold text-stone-dark mb-2 tracking-wide uppercase"
          style={{ fontSize: "10px", letterSpacing: "0.08em" }}
        >
          Legend
        </p>
        <ul className="space-y-1.5" role="list">
          {legendItems.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              {/* Mini pin dot */}
              <span
                className="inline-block w-3 h-3 rounded-full flex-shrink-0 ring-2"
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 0 0 2px ${item.ring}`,
                }}
                aria-hidden="true"
              />
              <span
                className="font-body text-stone-dark leading-none"
                style={{ fontSize: "11px" }}
              >
                <strong style={{ color: item.ring }}>{item.label}</strong>
                {" — "}
                {item.desc}
              </span>
            </li>
          ))}
        </ul>
        {/* Route line sample */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-earth-100">
          <svg width="28" height="10" aria-hidden="true">
            <line
              x1="0" y1="5" x2="28" y2="5"
              stroke="#2d5a33"
              strokeWidth="2.5"
              strokeDasharray="7 4"
            />
          </svg>
          <span className="font-body text-stone-dark" style={{ fontSize: "11px" }}>
            Driving route
          </span>
        </div>
      </div>

      {/* Leaflet popup custom styles — injected once into the document */}
      <style>{`
        .plitvice-popup .leaflet-popup-content-wrapper {
          padding: 0;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0,0,0,0.18);
        }
        .plitvice-popup .leaflet-popup-content {
          margin: 0;
          line-height: 1;
        }
        .plitvice-popup .leaflet-popup-tip {
          background: #fefdfb;
        }
        .leaflet-control-attribution {
          font-size: 10px !important;
        }
      `}</style>
    </div>
  );
}
