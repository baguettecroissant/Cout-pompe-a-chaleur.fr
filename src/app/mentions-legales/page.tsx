import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Informations Légales & Confidentialité | Cout-Pompe-a-Chaleur.fr",
    description: "Consultez l'ensemble des informations légales de notre plateforme de comparaison de devis pour pompes à chaleur.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function MentionsLegalesPage() {
    return (
        <div className="bg-slate-100 min-h-screen py-16">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Informations Légales & RGPD
                    </h1>
                    <p className="text-slate-600">
                        Dernière mise à jour réglementaire : Janvier 2026
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-8 md:p-12 prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-emerald-600">

                        <h2>I. Identité de l'Éditeur</h2>
                        <p>
                            La plateforme <strong>cout-pompe-a-chaleur.fr</strong> est un service digital opéré par la société WADE STUDIO LTD.
                        </p>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 my-6 not-prose">
                            <ul className="space-y-3 text-slate-700">
                                <li><strong>Raison Sociale :</strong> WADE STUDIO LTD</li>
                                <li><strong>Immatriculation (BRN) :</strong> C25227533</li>
                                <li><strong>Numéro de dossier (File No) :</strong> C227533</li>
                                <li><strong>Siège Social :</strong> 432 Ave Bounty, Morcellement Balaclava, MAURITIUS</li>
                                <li><strong>Directeur de publication :</strong> Wade Timothy</li>
                                <li><strong>Contact électronique :</strong> contact@cout-pompe-a-chaleur.fr</li>
                            </ul>
                        </div>

                        <h2>II. Fournisseur d'Hébergement</h2>
                        <p>
                            Le stockage des données et l'hébergement de l'infrastructure web sont confiés à la société spécialisée <strong>Vercel Inc.</strong><br />
                            Siège : 340 S Lemon Ave #4133 Walnut, CA 91789, États-Unis.
                        </p>

                        <h2>III. Rôle et Responsabilités</h2>
                        <p>
                            Le portail <em>Cout-Pompe-a-Chaleur.fr</em> intervient exclusivement en qualité d'intermédiaire technique et d'apporteur d'affaires. Sa vocation est de connecter des particuliers ayant un projet de rénovation énergétique avec des artisans locaux certifiés RGE (Reconnu Garant de l'Environnement).
                        </p>
                        <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-r-xl my-6 not-prose">
                            <p className="text-orange-900 font-medium">Avertissement Légal</p>
                            <p className="text-orange-800 text-sm mt-2 leading-relaxed">
                                L'éditeur WADE STUDIO LTD ne réalise aucune intervention technique, commerciale ou d'installation. De facto, notre responsabilité civile ou pénale ne peut être retenue lors d'un litige concernant l'exécution du chantier, le bon dimensionnement de la pompe à chaleur ou l'octroi des primes gouvernementales. Ces obligations incombent juridiquement à l'entreprise contractante signataire du devis.
                            </p>
                        </div>

                        <hr className="my-12 border-slate-200" />

                        <h2>IV. Politique de Protection des Données (RGPD)</h2>

                        <h3>A. Finalités de la collecte</h3>
                        <p>Les informations personnelles recueillies via nos formulaires ont pour finalité exclusive :</p>
                        <ul>
                            <li>L'étude de faisabilité de votre projet thermique.</li>
                            <li>La transmission sécurisée de vos coordonnées à un maximum de trois entreprises partenaires qualifiées dans votre secteur géographique.</li>
                            <li>La vérification de votre potentielle éligibilité aux aides (MaPrimeRénov').</li>
                        </ul>

                        <h3>B. Conservation et Partage</h3>
                        <p>
                            Votre acceptation formelle est requise lors de la validation du formulaire pour autoriser la transmission de vos données à nos partenaires français (plateformes de courtiers en travaux, installateurs directs). Nous nous interdisons formellement toute revente de vos données à des listes de diffusion opaques.
                        </p>
                        <p>
                            Les données transitant par nos serveurs internationaux font l'objet de protocoles de chiffrement garantissant un niveau de sécurité équivalent aux exigences européennes du RGPD.
                        </p>

                        <h3>C. Exercice de vos droits</h3>
                        <p>
                            En vertu des dispositions légales, vous conservez un contrôle total sur vos données (droit d'accès, rectification, portabilité, oubli). Toute demande d'effacement ou de modification doit être adressée par courriel à <strong>contact@cout-pompe-a-chaleur.fr</strong>. Les demandes sont traitées gracieusement dans un délai légal de 30 jours.
                        </p>

                        <div className="mt-12 text-center not-prose pt-8 border-t border-slate-100">
                            <Link href="/">
                                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-full transition-colors flex items-center gap-2 mx-auto">
                                    <ArrowLeft className="w-5 h-5" /> Retourner à la page d'accueil
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
