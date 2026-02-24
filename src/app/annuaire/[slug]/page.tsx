import { notFound } from "next/navigation";
import { getAllDepartments, getCitiesByDepartment, getDepartmentByCode, getDepartmentsByRegion } from "@/lib/cities";
import Link from "next/link";
import { Metadata } from "next";
import { DepartmentCities } from "@/components/psea/DepartmentCities";
import { Map } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

// Slug format: "gironde-33"
type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    // To enable static generation for all departments
    const depts = getAllDepartments();
    // Simplified slug generation consistent with breadcrumb
    return depts.map(d => ({
        slug: `${d.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${d.code}`
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const parts = slug.split('-');
    const code = parts[parts.length - 1]; // Last part is code
    const dept = getDepartmentByCode(code);

    if (!dept) return {};

    return {
        title: `Prix Pompe-a-Chaleur ${dept.name} (${dept.code}) - Installateurs & Devis`,
        description: `Trouvez un installateur de pompe-a-chaleur agrée dans le ${dept.name} (${dept.code}). Devis comparatifs gratuits, aides (MaPrimeRénov') et prix moyens.`,
        alternates: {
            canonical: `https://www.cout-pompe-a-chaleur.fr/annuaire/${slug}`,
        },
    };
}

export default async function DepartmentPage({ params }: Props) {
    const { slug } = await params;
    // Extract code from end of slug "gironde-33" -> "33"
    const parts = slug.split('-');
    const code = parts[parts.length - 1];

    const dept = getDepartmentByCode(code);
    if (!dept) notFound();

    // Fetch ALL cities for SEO
    const cities = getCitiesByDepartment(code);

    // Alphabetical sort for consistent directory listing
    cities.sort((a, b) => a.name.localeCompare(b.name));

    // Fetch neighbor departments
    const neighborDepts = getDepartmentsByRegion(dept.region).filter(d => d.code !== dept.code);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Dept */}
            <section className="bg-slate-900 text-white relative pb-32 pt-12">
                <div className="container mx-auto px-4 relative z-10">
                    {/* Breadcrumbs */}
                    <div className="text-slate-400">
                        <Breadcrumbs
                            items={[
                                { label: "Annuaire", href: "/annuaire" },
                                { label: `${dept.name} (${dept.code})` },
                            ]}
                        />
                    </div>

                    <div className="text-center mt-4">
                        <div className="inline-block bg-white/10 text-emerald-300 px-3 py-1 rounded-full text-sm font-medium mb-6 border border-white/10">
                            Département {dept.code}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Installateurs Pompe-a-Chaleur <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">{dept.name}</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            Trouvez un artisan certifié RGE dans la région {dept.region}.
                            Profitez des aides de l'État (MaPrimeRénov', CEE) pour financer votre projet.
                        </p>
                    </div>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>
                </div>
            </section>

            {/* Interactive Cities Section */}
            <section className="pb-20 bg-slate-50 min-h-[500px]">
                <div className="container mx-auto px-4">
                    <DepartmentCities
                        departmentName={dept.name}
                        departmentCode={dept.code}
                        cities={cities}
                    />

                    {/* Neighbor Departments Section */}
                    {neighborDepts.length > 0 && (
                        <div className="mt-16 pt-16 border-t border-slate-200">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                                <Map className="h-6 w-6 text-emerald-500" />
                                Autres départements en {dept.region}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {neighborDepts.map((d) => (
                                    <Link
                                        key={d.code}
                                        href={`/annuaire/${d.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${d.code}`}
                                        className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all group"
                                    >
                                        <span className="font-medium text-slate-700 group-hover:text-emerald-700">{d.name}</span>
                                        <span className="text-sm text-slate-400 bg-slate-50 px-2 py-1 rounded group-hover:bg-emerald-50 group-hover:text-emerald-600">{d.code}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
