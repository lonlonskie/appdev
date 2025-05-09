'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type MapProps = {
  lat: number;
  lng: number;
};

export default function Mapbox({ lat, lng }: MapProps) {
  // 🔐 Directly set the token
  mapboxgl.accessToken = 'pk.eyJ1IjoibGFicy1zYW5kYm94IiwiYSI6ImNrMTZuanRmZDA2eGQzYmxqZTlnd21qY3EifQ.Q7DM5HqE5QJzDEnCx8BGFw';

  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 12,
    });

    new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map);

    return () => map.remove();
  }, [lat, lng]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
}
