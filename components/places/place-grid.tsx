'use client';

import { PlaceCard } from './place-card';
import { useEffect, useState } from 'react';
import { getPlaces } from '@/lib/places';

interface PlaceGridProps {
  state: string;
}

export function PlaceGrid({ state }: PlaceGridProps) {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPlaces() {
      try {
        const data = await getPlaces(state);
        setPlaces(data);
      } catch (error) {
        console.error('Error loading places:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadPlaces();
  }, [state]);

  if (isLoading) {
    return <div>Loading places...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {places.map((place) => (
        <PlaceCard key={place.id} place={place} />
      ))}
    </div>
  );
}