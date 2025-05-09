'use client';

import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibGFicy1zYW5kYm94IiwiYSI6ImNrMTZuanRmZDA2eGQzYmxqZTlnd21qY3EifQ.Q7DM5HqE5QJzDEnCx8BGFw';

type AddressPickerProps = {
  onSelect: (address: string) => void;
};

export default function AddressPicker({ onSelect }: AddressPickerProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [123.8854, 13.6209], // Default center
      zoom: 12,
    });

    newMap.on('click', async (e) => {
      const { lng, lat } = e.lngLat;

      if (marker) marker.remove();

      const newMarker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(newMap);
      setMarker(newMarker);

      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
        );
        const data = await res.json();
        const place = data.features?.[0]?.place_name || `${lat}, ${lng}`;
        onSelect(place);
      } catch (err) {
        console.error('Reverse geocoding failed:', err);
        onSelect(`${lat}, ${lng}`);
      }
    });

    setMap(newMap);

    return () => newMap.remove();
  }, [marker, onSelect]);

  return (
    <div
      ref={mapContainerRef}
      className="h-64 w-full rounded shadow-md mt-2"
    />
  );
}
