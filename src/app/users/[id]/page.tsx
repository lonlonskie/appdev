'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibGFicy1zYW5kYm94IiwiYSI6ImNrMTZuanRmZDA2eGQzYmxqZTlnd21qY3EifQ.Q7DM5HqE5QJzDEnCx8BGFw';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
};

export default function UserProfile() {
  const params = useParams() as { id: string };
  const userId = params.id;
  
  const [user, setUser] = useState<User | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);

  useEffect(() => {
    if (!user || !mapContainerRef.current) return;

    const lat = parseFloat(user.address.geo.lat);
    const lng = parseFloat(user.address.geo.lng);

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 12,
    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

    return () => map.remove();
  }, [user]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6 mx-auto bg-white/30 backdrop-blur-md rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
      <p className="text-lg">@{user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-1">Address:</h2>
        <p>{user.address.street}, {user.address.suite}</p>
        <p>{user.address.city}, {user.address.zipcode}</p>

        {/* Mapbox Map showing user's location */}
        <div ref={mapContainerRef} className="w-full h-96 mt-4 rounded shadow" />
      </div>
    </div>
  );
}
