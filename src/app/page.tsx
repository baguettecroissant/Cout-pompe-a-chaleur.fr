import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Shield, Star, MapPin, Euro, Flame, Leaf, Wind, Award, Zap, BookOpen } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getAllGuides } from "@/data/guides-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.cout-pompe-a-chaleur.fr',
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section - Redesigned Layout */}
      <section className="relative bg-emerald-950 py-24 lg:py-32 flex items-center overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 top-1/2 z-0 opacity-20 bg-gradient-to-t from-emerald-600 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full z-0 lg:block hidden">
          <Image
            src="/images/hero-senior.png"
            alt="Installation de pompe à chaleur"
            fill
            className="object-cover object-left opacity-60 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-start text-left lg:w-3/5">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-5 py-2 rounded-lg text-sm font-semibold tracking-wide mb-8">
            <Zap className="h-4 w-4 text-amber-400" />
            <span>Votre Transition Écologique 2026</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1]">
            Le chauffage de demain,<br />
            <span className="text-emerald-400">au meilleur prix.</span>
          </h1>

          <p className="text-xl text-emerald-50 mb-10 max-w-2xl font-light">
            Comparez gratuitement les devis de pose pour votre Pompe à Chaleur. Des installateurs RGE certifiés dans votre région pour réduire vos factures de 70%.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Link href="/devis" className="w-full sm:w-auto">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-lg px-8 py-7 rounded-xl shadow-xl w-full">
                Obtenir un devis gratuit
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-2 text-emerald-200/60 text-sm">
            <Shield className="h-5 w-5" />
            <span>Service 100% gratuit, conseillers indépendants.</span>
          </div>
        </div>
      </section>

      {/* Trust Bar - New Icons & Layout */}
      <section className="bg-emerald-900 border-b border-emerald-800 py-4 shadow-inner">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-emerald-100 text-xs md:text-sm font-semibold text-center">
            <div className="flex flex-col items-center gap-1 justify-center"><Award className="h-6 w-6 text-emerald-400 mb-1" /> Certification RGE</div>
            <div className="flex flex-col items-center gap-1 justify-center"><Euro className="h-6 w-6 text-emerald-400 mb-1" /> Devis 100% Gratuits</div>
            <div className="flex flex-col items-center gap-1 justify-center"><Flame className="h-6 w-6 text-emerald-400 mb-1" /> Économies d'Énergie</div>
            <div className="flex flex-col items-center gap-1 justify-center"><Leaf className="h-6 w-6 text-emerald-400 mb-1" /> Aides Financières</div>
          </div>
        </div>
      </section>


      {/* SEO Content Block - Moved UP */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8 prose prose-lg prose-slate prose-headings:text-slate-900 prose-a:text-emerald-600">
              <h2 className="text-4xl font-extrabold mb-8 tracking-tight">
                Quel budget prévoir pour une Pompe à Chaleur ?
              </h2>
              <p className="lead text-xl text-slate-600">
                L'installation d'une pompe à chaleur (PAC) est le moyen le plus efficace de réduire drastiquement vos factures de chauffage. C'est un investissement rapidement rentabilisé grâce aux aides d'État.
              </p>
              <p>
                Les tarifs varient selon la technologie choisie :
              </p>

              <div className="not-prose grid gap-6 my-10">
                <div className="p-6 bg-slate-50 border-l-4 border-emerald-500 rounded-r-xl">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2"><Wind className="h-5 w-5 text-emerald-500" /> PAC Air-Air</h3>
                  <p className="text-slate-600">Idéale pour climatiser l'été et chauffer l'hiver. À partir de <strong>2 500 € à 5 000 €</strong> pose incluse.</p>
                </div>
                <div className="p-6 bg-slate-50 border-l-4 border-emerald-600 rounded-r-xl">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2"><Flame className="h-5 w-5 text-emerald-600" /> PAC Air-Eau</h3>
                  <p className="text-slate-600">Remplace votre chaudière sur un réseau de radiateurs existant. Entre <strong>8 000 € et 12 000 €</strong>.</p>
                </div>
                <div className="p-6 bg-slate-50 border-l-4 border-teal-600 rounded-r-xl">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2"><Leaf className="h-5 w-5 text-teal-600" /> PAC Géothermique</h3>
                  <p className="text-slate-600">Le summum de l'écologie, captant l'énergie du sol. Budget de <strong>12 000 € à 20 000 €</strong> avant aides.</p>
                </div>
              </div>

              <p className="text-slate-500 text-base">
                <strong>À noter :</strong> Jusqu'à 10 000€ d'aides (MaPrimeRénov', CEE) peuvent être déduits de ce devis.
                Voir notre <Link href="/marques" className="font-semibold underline">comparatif des meilleures PAC</Link>.
              </p>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-emerald-600 text-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-4">L'intervention</h3>
                <p className="text-emerald-100 mb-6">
                  Une fois le devis RGE approuvé, l'installation d'une pompe à chaleur air-air prend <strong>une à deux journées</strong>.
                </p>
                <Link href="/simulation-delais">
                  <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50">Estimer le délai</Button>
                </Link>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-emerald-600" /> Dossiers Conseils
                </h3>
                <div className="flex flex-col gap-4">
                  {getAllGuides().slice(0, 3).map((guide) => (
                    <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group relative overflow-hidden rounded-xl aspect-video bg-slate-200">
                      {guide.image && (
                        <Image src={guide.image} alt={guide.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex items-end p-4">
                        <h4 className="text-white text-sm font-medium leading-snug">{guide.title}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Stack Grid - Moved DOWN */}
      <section className="py-24 bg-teal-50/50 border-y border-teal-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-teal-600 font-bold tracking-wider uppercase text-sm">Le Réseau N°1</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-6">Un accompagnement sur-mesure</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="w-20 h-20 bg-teal-100/50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-200 transition-colors">
                <Euro className="h-10 w-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Maximisez les Aides</h3>
              <p className="text-slate-600 leading-relaxed">
                Nos artisans s'occupent de déduire directement MaPrimeRénov' et les CEE de votre devis. Un reste à charge minimal.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-emerald-100/50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                <Shield className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">RGE Garantie</h3>
              <p className="text-slate-600 leading-relaxed">
                Le label RGE est obligatoire pour obtenir vos aides. Tous nos membres installateurs le possèdent.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-100/50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Award className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Le Juste Prix</h3>
              <p className="text-slate-600 leading-relaxed">
                Demandez 3 devis pour comparer sereinement les COP (Coefficient de Performance) et les tarifs d'entretien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Linking - Departments Grid */}
      <section className="py-24 bg-slate-900 text-slate-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Installateurs par région</h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-400">
              Découvrez les aides spécifiques accordées par votre région ou département et accédez à notre annuaire local.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            <Link href="/annuaire/paris-75" className="px-5 py-2.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-full text-sm font-medium transition-all">Paris (75)</Link>
            <Link href="/annuaire/seine-et-marne-77" className="px-5 py-2.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-full text-sm font-medium transition-all">Seine-et-Marne (77)</Link>
            <Link href="/annuaire/yvelines-78" className="px-5 py-2.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-full text-sm font-medium transition-all">Yvelines (78)</Link>
            <Link href="/annuaire/essonne-91" className="px-5 py-2.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-full text-sm font-medium transition-all">Essonne (91)</Link>
            <Link href="/annuaire/hauts-de-seine-92" className="px-5 py-2.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-full text-sm font-medium transition-all">Hauts-de-Seine (92)</Link>
            <Link href="/annuaire/seine-saint-denis-93" className="px-5 py-2.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-full text-sm font-medium transition-all">Seine-St-Denis (93)</Link>
            <Link href="/annuaire/val-de-marne-94" className="px-5 py-2.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-full text-sm font-medium transition-all">Val-de-Marne (94)</Link>
            <Link href="/annuaire/val-d-oise-95" className="px-5 py-2.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-full text-sm font-medium transition-all">Val-d'Oise (95)</Link>
            <Link href="/annuaire/rhone-69" className="px-5 py-2.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-full text-sm font-medium transition-all">Rhône (69)</Link>
            <Link href="/annuaire/nord-59" className="px-5 py-2.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-full text-sm font-medium transition-all">Nord (59)</Link>
            <Link href="/annuaire/gironde-33" className="px-5 py-2.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-full text-sm font-medium transition-all">Gironde (33)</Link>
            <Link href="/annuaire/bouches-du-rhone-13" className="px-5 py-2.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-full text-sm font-medium transition-all">Bouches-du-Rhône (13)</Link>
            <Link href="/annuaire/haute-garonne-31" className="px-5 py-2.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-full text-sm font-medium transition-all">Haute-Garonne (31)</Link>
            <Link href="/annuaire/loire-atlantique-44" className="px-5 py-2.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-full text-sm font-medium transition-all">Loire-Atlantique (44)</Link>
            <Link href="/annuaire/seine-maritime-76" className="px-5 py-2.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-full text-sm font-medium transition-all">Seine-Maritime (76)</Link>
            <Link href="/annuaire/herault-34" className="px-5 py-2.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-full text-sm font-medium transition-all">Hérault (34)</Link>
          </div>
          <div className="mt-12 text-center">
            <Link href="/annuaire" className="inline-flex items-center text-emerald-400 font-bold text-lg hover:text-white transition-colors">
              Explorer tous les départements <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Accordion - Light mode redesign */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-16">Foire Aux Questions</h2>

          {/* FAQPage Schema.org */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Quelles sont les aides pour une pompe à chaleur en 2026 ?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Les principales aides sont MaPrimeRénov' et les Primes CEE (Certificats d'Économies d'Énergie). Ensemble, elles peuvent couvrir jusqu'à 90% du devis pour les foyers très modestes."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Faut-il une autorisation pour installer une PAC ?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Oui, pour l'unité extérieure, une déclaration préalable de travaux (DP) en mairie est obligatoire car elle modifie l'aspect extérieur de votre logement."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Est-ce bruyant ?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Les modèles récents sont très silencieux. L'unité extérieure tourne autour de 40 à 50 décibels, soit le bruit d'un lave-vaisselle récent."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "L'entretien est-il obligatoire ?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "L'entretien d'une pompe à chaleur est obligatoire tous les 2 ans pour les PAC d'une puissance comprise entre 4 et 70 kW."
                    }
                  }
                ]
              })
            }}
          />

          <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-slate-200">
                <AccordionTrigger className="text-xl font-bold text-slate-900 py-5">Quelles sont les aides valables en 2026 ?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-lg leading-relaxed pb-5">
                  Les principales aides sont <strong>MaPrimeRénov'</strong> et les <strong>Primes CEE</strong> (Certificats d'Économies d'Énergie). Ensemble, elles peuvent couvrir jusqu'à 90% du devis pour les foyers très modestes, accompagnées de l'Éco-PTZ.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b-slate-200">
                <AccordionTrigger className="text-xl font-bold text-slate-900 py-5">Faut-il une autorisation pour installer une PAC ?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-lg leading-relaxed pb-5">
                  Oui. L'installation de l'unité extérieure nécessite une <strong>déclaration préalable de travaux (DP)</strong> en mairie car elle modifie la façade ou l'aspect de votre logement. En copropriété, l'accord du syndic est aussi requis.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-slate-200">
                <AccordionTrigger className="text-xl font-bold text-slate-900 py-5">Est-ce bruyant pour le voisinage ?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-lg leading-relaxed pb-5">
                  Les compresseurs de modèles récents (Daikin, Mitsubishi, Atlantic) sont très silencieux. L'unité extérieure génère environ <strong>45 décibels</strong>, équivalent au son d'un réfrigérateur.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-b-slate-0">
                <AccordionTrigger className="text-xl font-bold text-slate-900 py-5">L'entretien est-il obligatoire ?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-lg leading-relaxed pb-5">
                  Oui, un entretien de votre système de pompe à chaleur est imposé par la loi <strong>au moins tous les 2 ans</strong> (pour les équipements d'une puissance comprise entre 4 et 70 kW), réalisé par un professionnel certifié.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Footer - Minimal layout */}
      <section className="py-24 bg-emerald-50 text-emerald-950 text-center border-t border-emerald-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8">Votre devis en 3 clics</h2>
          <p className="text-xl text-emerald-800 mb-12 max-w-2xl mx-auto font-medium">
            Renseignez votre projet et recevez les propositions chiffrées de nos artisans locaux pour comparer les modèles et les COP.
          </p>
          <Link href="/devis">
            <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xl px-12 py-8 rounded-full shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-1">
              Comparer les Offres
            </Button>
          </Link>
          <div className="mt-8 flex justify-center gap-6 text-sm font-semibold text-emerald-700/60 uppercase tracking-widest">
            <span>Gratuit</span>
            <span>Local</span>
            <span>RGE</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
