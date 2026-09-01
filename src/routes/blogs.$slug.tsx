import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock, FileSearch, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { BLOGS, getBlog } from "@/lib/blogs";

const SITE_URL = "https://audacious-audit-spark.lovable.app";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const blog = getBlog(params.slug);
    if (!blog) throw notFound();
    return blog;
  },
  head: ({ params, loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | Insure Audit Expert Blog` },
          { name: "description", content: loaderData.excerpt },
          { name: "keywords", content: `${loaderData.category.toLowerCase()}, insurance ${loaderData.category.toLowerCase()}, insurance audit India, ${loaderData.title.toLowerCase()}` },
          { name: "article:published_time", content: loaderData.date },
          { name: "article:section", content: loaderData.category },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:type", content: "article" },
          { property: "og:url", content: `${SITE_URL}/blogs/${params.slug}` },
        ]
      : [{ title: "Article not found | Insure Audit Expert" }, { name: "robots", content: "noindex" }],
    links: [{ rel: "canonical", href: `${SITE_URL}/blogs/${params.slug}` }],
    scripts: loaderData ? [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: loaderData.title,
        description: loaderData.excerpt,
        datePublished: loaderData.date,
        articleSection: loaderData.category,
        author: { "@type": "Organization", name: "Insure Audit Expert" },
        publisher: { "@type": "Organization", name: "Insure Audit Expert", logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.ico` } },
        mainEntityOfPage: `${SITE_URL}/blogs/${params.slug}`,
      }),
    }] : [],
  }),
  component: BlogDetail,
  notFoundComponent: () => (
    <PageShell>
      <section className="py-32 text-center max-w-2xl mx-auto px-6">
        <h1 className="text-5xl font-extrabold text-night">Article not found</h1>
        <p className="mt-4 text-ink/65">Yeh post move ho gayi ya delete kar di gayi hai.</p>
        <Link to="/blogs" className="mt-8 inline-flex items-center gap-2 bg-brand text-white font-bold px-6 py-3 rounded-full">
          <ArrowLeft className="w-4 h-4"/> Back to all blogs
        </Link>
      </section>
    </PageShell>
  ),
});

function BlogDetail() {
  const blog = Route.useLoaderData() as (typeof BLOGS)[number];
  const related = BLOGS.filter((b) => b.slug !== blog.slug).slice(0, 3);

  return (
    <PageShell>
      <article>
        <section className={`${blog.tint} py-20`}>
          <div className="max-w-[820px] mx-auto px-6">
            <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-semibold text-night/70 hover:text-brand mb-6">
              <ArrowLeft className="w-4 h-4"/> All blogs
            </Link>
            <span className="inline-block bg-white text-brand text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">{blog.category}</span>
            <h1 className="mt-5 text-[36px] sm:text-[52px] leading-[1.08] font-extrabold text-night">{blog.title}</h1>
            <div className="mt-6 flex items-center gap-4 text-[13px] font-semibold text-night/65">
              <span>{blog.date}</span>
              <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {blog.readTime}</span>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-[760px] mx-auto px-6">
            <p className="text-[19px] text-ink/80 leading-relaxed font-medium border-l-4 border-brand pl-5 italic">
              {blog.excerpt}
            </p>
            <div className="mt-10 space-y-8">
              {blog.content.map((block, i) => (
                <div key={i}>
                  {block.heading && (
                    <h2 className="text-[24px] font-extrabold text-night mb-3 mt-2">{block.heading}</h2>
                  )}
                  <p className="text-[16.5px] text-ink/80 leading-[1.8]">{block.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 bg-brand-soft border border-brand/15 rounded-2xl p-7 flex flex-col sm:flex-row items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-brand grid place-items-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-white"/>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-extrabold text-night">Apni policies ka free audit chahiye?</h3>
                <p className="text-sm text-ink/70 mt-1">Hamari AI engine 24 ghante ke andar aapki policies ke risks aur savings batati hai.</p>
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-brand hover:bg-brand-deep text-white font-bold text-sm px-5 py-3 rounded-full transition shrink-0">
                Book Free Audit <ArrowRight className="w-4 h-4"/>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-cloud py-16">
          <div className="max-w-[1240px] mx-auto px-6">
            <h3 className="text-2xl font-extrabold text-night mb-8">More from our blog</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((b) => (
                <Link key={b.slug} to="/blogs/$slug" params={{ slug: b.slug }} className="group bg-white rounded-2xl border border-ink/8 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition">
                  <div className={`${b.tint} aspect-[16/10] relative overflow-hidden`}>
                    <img src={b.image} alt={b.title} loading="lazy" width={1024} height={1024} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  </div>
                  <div className="p-5">
                    <div className="text-[11px] font-bold text-brand uppercase tracking-wider">{b.date}</div>
                    <h4 className="mt-2 text-[15.5px] font-bold text-night leading-snug group-hover:text-brand transition">{b.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
