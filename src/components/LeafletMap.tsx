'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon paths:
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

type LeafletMapProps = { lat: number; lng: number };

export default function LeafletMap({ lat, lng }: LeafletMapProps) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{ width: '100%', height: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} />
    </MapContainer>
  );
}
