"use client";
import L, { Icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const defaultIcon = new Icon({
  iconUrl: "/images/leaflet/marker-icon.png",
  iconRetinaUrl: "/images/leaflet/marker-icon-2x.png",
  shadowUrl: "/images/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

export interface MapMarkerData {
  id: string;
  position: LatLngExpression;
  popupContent: React.ReactNode | string;
  title?: string;
}

interface MapDisplayProps {
  center: LatLngExpression;
  zoom?: number;
  markers?: MapMarkerData[];
  className?: string;
  style?: React.CSSProperties;
  onMarkerClick?: (markerId: string) => void;
}

function ChangeView({
  center,
  zoom,
}: {
  center: LatLngExpression;
  zoom?: number;
}) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function MapDisplay({
  center,
  zoom = 14,
  markers = [],
  className = "h-full w-full z-0",
  style,
  onMarkerClick,
}: MapDisplayProps) {
  if (typeof window === "undefined") {
    return (
      <div className={className} style={style}>
        Loading map...
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      className={className}
      style={style}
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          eventHandlers={{
            click: () => {
              if (onMarkerClick) {
                onMarkerClick(marker.id);
              }
            },
          }}
        >
          <Popup>{marker.popupContent}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
