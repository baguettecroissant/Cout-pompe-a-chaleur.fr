import Link from 'next/link';
import { City } from '@/types';
import { getNearbyCities } from '@/lib/cities';
import { MapPin } from 'lucide-react';

interface NearbyCitiesModuleProps {
    city: City;
}

export function NearbyCitiesModule({ city }: NearbyCitiesModuleProps) {
    const nearby = getNearbyCities(city, 8);

    if (nearby.length === 0) return null;

    return (
        <section className="bg-white border-t border-slate-100 py-12">
            <div className="container mx-auto px-4">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-emerald-500" />
                    Installation pompe-a-chaleur à proximité de {city.name}
                </h3>
                <nav aria-label="Villes à proximité" className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {nearby.map((c) => (
                        <Link
                            key={c.slug}
                            href={`/prix-pompe-a-chaleur/${c.slug}`}
                            className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 p-2 rounded-md transition-colors text-sm truncate block"
                            title={`Pompe-a-chaleur à ${c.name} (${c.zip})`}
                        >
                            {c.name} <span className="text-slate-400 text-xs ml-1">({c.zip})</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </section>
    );
}
