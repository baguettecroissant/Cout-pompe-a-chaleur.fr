"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Menu, X, BookOpen, MapPin, Wrench } from "lucide-react";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: "/guides", label: "Guides", icon: BookOpen },
        { href: "/outils", label: "Outils", icon: Wrench },
        { href: "/annuaire", label: "Annuaire", icon: MapPin },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                        Cout-Pompe-a-Chaleur<span className="text-emerald-600">.fr</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-medium transition-colors"
                        >
                            <link.icon className="h-4 w-4" />
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA + Mobile Menu Button */}
                <div className="flex items-center gap-4">
                    <Link href="/devis" className="hidden sm:block">
                        <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm md:text-lg px-4 md:px-8 h-10 md:h-12 shadow-md hover:shadow-lg transition-all rounded-full">
                            <FileText className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                            Devis Gratuit
                        </Button>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:text-emerald-600 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Menu"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
                    <nav className="container mx-auto px-4 py-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-3 p-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg font-medium transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <link.icon className="h-5 w-5" />
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-slate-100">
                            <Link href="/devis" onClick={() => setMobileMenuOpen(false)}>
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 rounded-full">
                                    <FileText className="mr-2 h-5 w-5" />
                                    Devis Gratuit
                                </Button>
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
