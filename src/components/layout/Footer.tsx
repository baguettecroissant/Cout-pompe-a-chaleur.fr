import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-50 py-12 border-t border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand & Description */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Cout-Pompe-a-Chaleur<span className="text-emerald-500">.fr</span>
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed max-w-sm">
                        Le guide de référence pour estimer le prix de votre pompe-a-chaleur en France. Comparez, économisez et restez autonome chez vous.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Informations</h4>
                    <ul className="space-y-3">
                        <li><Link href="/" className="text-slate-300 hover:text-white transition-colors text-lg">Accueil</Link></li>
                        <li><Link href="/guides" className="text-slate-300 hover:text-white transition-colors text-lg">Guides & Conseils</Link></li>
                        <li><Link href="/outils" className="text-slate-300 hover:text-white transition-colors text-lg">Outils Gratuits</Link></li>
                        <li><Link href="/marques" className="text-slate-300 hover:text-white transition-colors text-lg">Marques</Link></li>
                        <li><Link href="/annuaire" className="text-slate-300 hover:text-white transition-colors text-lg">Annuaire</Link></li>
                        <li><Link href="/faq" className="text-slate-300 hover:text-white transition-colors text-lg">FAQ</Link></li>
                        <li><Link href="/glossaire" className="text-slate-300 hover:text-white transition-colors text-lg">Glossaire</Link></li>
                        <li><Link href="/qui-sommes-nous" className="text-slate-300 hover:text-white transition-colors text-lg">Qui Sommes-Nous</Link></li>
                        <li><Link href="/mentions-legales" className="text-slate-300 hover:text-white transition-colors text-lg">Mentions Légales</Link></li>
                    </ul>
                </div>

                {/* Contact / CTA */}
                <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Un projet ?</h4>
                    <p className="text-slate-300 mb-6 text-lg">
                        Obtenez 3 devis gratuits d'artisans qualifiés près de chez vous.
                    </p>
                    <Link
                        href="/devis"
                        className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors w-full text-center"
                    >
                        Comparer les prix
                    </Link>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
                <p>© 2026 Cout-Pompe-a-Chaleur.fr - Tous droits réservés.</p>
            </div>
        </footer>
    );
}
