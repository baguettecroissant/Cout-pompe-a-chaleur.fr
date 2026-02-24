"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function StickyMobileCTA() {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 md:hidden">
            <div className="flex flex-col gap-1">
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-semibold">
                    Gratuit • Sans engagement • Rapide
                </p>
                <Link href="/devis" className="w-full">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg h-14 rounded-full shadow-lg animate-pulse-slow">
                        Comparer 3 Devis
                    </Button>
                </Link>
            </div>
        </div>
    );
}
