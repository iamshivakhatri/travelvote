'use client'

import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Medal } from 'lucide-react';
import { useEffect, useState } from 'react';

export function TopContributors() {
  const [contributors, setContributors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function loadContributors() {
      try {
        const response = await fetch('/api/getContributor');
        if (!response.ok) {
          throw new Error('Error fetching contributors');
        }
        const data = await response.json();
        setContributors(data);
      } catch (error: any) {
        setError(error.message || 'Error loading contributors');
      } finally {
        setIsLoading(false);
      }
    }

    loadContributors();
  }, []);

  if (isLoading) {
    return <div>Loading contributors...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="py-16 bg-accent">
      <div className="container">
        <h2 className="text-3xl font-semibold text-center mb-12">Top Contributors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributors.map((contributor, index) => (
            <Card key={contributor.id} className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contributor.id}`} alt={contributor.name} />
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{contributor.name}</h3>
                    {index < 3 && (
                      <Medal className={`h-4 w-4 ${
                        index === 0 ? 'text-yellow-500' :
                        index === 1 ? 'text-gray-400' :
                        'text-amber-600'
                      }`} />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {contributor.points} points
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
