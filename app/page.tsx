import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, MapPin } from 'lucide-react';
import { TopContributors } from '@/components/top-contributors';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover, Vote, and Explore the Best Places
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of travelers sharing their favorite destinations across America
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <Input 
              placeholder="Search states, cities, or places..." 
              className="bg-white/90 text-black"
            />
            <Button size="icon" variant="secondary">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured States Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-semibold text-center mb-12">Popular States</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['California', 'New York', 'Florida'].map((state) => (
              <Card key={state} className="group relative overflow-hidden">
                <div className="aspect-[4/3] relative">
                  <img
                    src={`https://source.unsplash.com/featured/?${state},landmark`}
                    alt={state}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link href={`/states/${state.toLowerCase()}`}>
                      <Button variant="secondary" className="font-semibold">
                        Explore {state}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Contributors Section */}
      <TopContributors />

      {/* Call to Action */}
      <section className="py-16 bg-accent">
        <div className="container text-center">
          <MapPin className="h-12 w-12 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl font-semibold mb-4">Share Your Favorite Places</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Help others discover amazing destinations by sharing your personal favorites
          </p>
          <Button size="lg" asChild>
            <Link href="/add-place">Add a Place</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}