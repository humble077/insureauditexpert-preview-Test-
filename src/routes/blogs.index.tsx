import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileSearch, Clock } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { BLOGS } from "@/lib/blogs";

const SITE_URL = "https://audacious-audit-spark.lovable.app";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: "Insurance Blog India | Audit, Renewal, Claim & AI Insights" },
      { name: "description", content: "Practical guides on insurance audit, renewal recovery, claim assistance, fleet management and AI automation — from India's leading insurance audit experts." },
      { name: "keywords", content: "insurance blog India, insurance audit insights, policy renewal tips, claim rejection reasons, fleet insurance guide, AI in insurance India" },
      { property: "og:title", content: "Insurance Blog India | Audit, Renewal, Claim & AI Insights" },
      { property: "og:description", content: "Deep-dives on insurance audit, renewals, claims and AI — from real audit cases." },
      { property: "og:url", content: `${SITE_URL}/blogs` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blogs` }],
  }),
  component: BlogsIndex,
});

function BlogsIndex() {
  const [featured, ...rest] = BLOGS;
  return (
    <PageShell>
      <section className="bg-gradient-to-b from-brand-soft/60 to-paper py-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <span className="inline-flex items-center gap-2 bg-white border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">
            <FileSearch className="w-4 h-4"/> Insights
          </span>
          <h1 className="mt-6 text-[44px] sm:text-[60px] leading-[1.05] font-extrabold text-night max-w-3xl">
            Insurance par practical insights, seedha experts se.
          </h1>
          <p className="mt-5 text-[17px] text-ink/70 max-w-2xl">
            Renewals, claims, fleet management aur AI automation par hamari audit team ke field notes — har article real cases se inspired hai.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1240px] mx-auto px-6">
          {featured && (
            <Link
              to="/blogs/$slug"
              params={{ slug: featured.slug }}
              className="group grid md:grid-cols-2 gap-8 bg-white rounded-3xl border border-ink/8 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition mb-14"
            >
              <div className={`${featured.tint} min-h-[280px] relative overflow-hidden`}>
                <img src={featured.image} alt={featured.title} loading="lazy" width={1024} height={1024} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                <div className="absolute inset-0 bg-gradient-to-t from-night/50 to-transparent"/>
                <span className="absolute top-5 left-5 bg-white text-night text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">Featured</span>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-[12px] font-bold text-brand uppercase tracking-wider">
                  <span>{featured.category}</span><span className="text-ink/30">•</span><span>{featured.date}</span><span className="text-ink/30">•</span>
                  <span className="inline-flex items-center gap-1 text-ink/55"><Clock className="w-3.5 h-3.5"/> {featured.readTime}</span>
                </div>
                <h2 className="mt-3 text-[28px] md:text-[34px] leading-[1.15] font-extrabold text-night group-hover:text-brand transition">{featured.title}</h2>
                <p className="mt-4 text-[15px] text-ink/65 leading-relaxed">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-brand font-bold text-sm group-hover:gap-3 transition-all">Read article <ArrowRight className="w-4 h-4"/></span>
              </div>
            </Link>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((b) => (
              <Link
                key={b.slug}
                to="/blogs/$slug"
                params={{ slug: b.slug }}
                className="group block bg-white rounded-2xl border border-ink/8 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition h-full"
              >
                <div className={`${b.tint} aspect-[16/10] relative overflow-hidden`}>
                  <img src={b.image} alt={b.title} loading="lazy" width={1024} height={1024} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-night text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">{b.category}</span>
                </div>
                <div className="p-6">
                  <div className="text-[11.5px] font-bold text-brand uppercase tracking-wider flex items-center gap-2">
                    <span>{b.date}</span><span className="text-ink/30">•</span><span className="text-ink/55 inline-flex items-center gap-1"><Clock className="w-3 h-3"/> {b.readTime}</span>
                  </div>
                  <h3 className="mt-2.5 text-[17px] font-bold text-night leading-snug group-hover:text-brand transition">{b.title}</h3>
                  <p className="mt-2 text-[13.5px] text-ink/65 leading-relaxed line-clamp-3">{b.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
