import { GUIDES_PART_1 } from "./guides-part1";
import { GUIDES_PART_2 } from "./guides-part2";

export interface GuideArticle {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    content: string; // HTML content
    image?: string;
    imagePrompt?: string;
    metaTitle: string;
    metaDescription: string;
}

export const GUIDES: GuideArticle[] = [...GUIDES_PART_1, ...GUIDES_PART_2];

export function getGuideBySlug(slug: string): GuideArticle | undefined {
    return GUIDES.find(guide => guide.slug === slug);
}

export function getAllGuides(): GuideArticle[] {
    return GUIDES;
}

export function getAllGuidesSlugs(): string[] {
    return GUIDES.map((guide) => guide.slug);
}
