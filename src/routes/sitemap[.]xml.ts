import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { BLOGS } from "@/lib/blogs";

const BASE_URL = "https://audacious-audit-spark.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/motor-insurance", changefreq: "weekly", priority: "0.95" },
          { path: "/health-insurance", changefreq: "weekly", priority: "0.9" },
          { path: "/msme-insurance", changefreq: "weekly", priority: "0.9" },
          { path: "/tracking-solutions", changefreq: "weekly", priority: "0.9" },
          { path: "/devices", changefreq: "weekly", priority: "0.9" },
          { path: "/claim-assistance", changefreq: "monthly", priority: "0.85" },
          { path: "/insurance", changefreq: "weekly", priority: "0.9" },
          { path: "/risk-audit", changefreq: "monthly", priority: "0.85" },

          { path: "/ai-dashcam-tracking", changefreq: "monthly", priority: "0.9" },
          { path: "/fleet-safety", changefreq: "monthly", priority: "0.85" },
          { path: "/school-bus-safety", changefreq: "monthly", priority: "0.85" },
          { path: "/about", changefreq: "monthly", priority: "0.7" },
          { path: "/privacy-policy", changefreq: "monthly", priority: "0.7" },
          { path: "/support", changefreq: "weekly", priority: "0.85" },
          { path: "/contact", changefreq: "monthly", priority: "0.8" },
          { path: "/blogs", changefreq: "weekly", priority: "0.8" },
          ...BLOGS.map((b) => ({ path: `/blogs/${b.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
