import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Insure Audit Expert | Buy Car, Fleet & Health Insurance Backed by Dashcam Proof" },
      { name: "description", content: "Smart Audit. Safe Drive. Guaranteed Protection. Buy car, commercial vehicle, fleet, school bus and health insurance at standard IRDAI-approved rates through licensed partners — with AI dashcam, zero wiring-cut live tracking and a professional policy audit included." },
      { name: "keywords", content: "buy car insurance India, commercial vehicle insurance, fleet insurance, school bus insurance, health insurance India, insurance with dashcam, false claim protection, vehicle risk audit, zero wiring cut GPS tracking, policy audit Delhi" },
      { name: "author", content: "Insure Audit Expert" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
      { name: "theme-color", content: "#1f9d55" },
      { name: "geo.region", content: "IN-DL" },
      { name: "geo.placename", content: "New Delhi" },
      { property: "og:site_name", content: "Insure Audit Expert" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Insure Audit Expert — Insurance Backed by Proof" },
      { property: "og:description", content: "Motor, fleet and health insurance at standard rates, with AI dashcam, live tracking and a professional policy audit included." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@insureauditexpert" },
      { name: "twitter:title", content: "Buy Insurance Backed by Dashcam Proof | Insure Audit Expert" },
      { name: "twitter:description", content: "Car, commercial vehicle, fleet and health cover at standard rates — with safety tech and a free policy audit." },

    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Insure Audit Expert",
          alternateName: "InsureAuditExpert",
          slogan: "Smart Audit. Safe Drive. Guaranteed Protection.",
          parentOrganization: { "@type": "Organization", name: "Alxsure Tech Hub (OPC) Private Limited" },
          url: "https://audacious-audit-spark.lovable.app",
          logo: "https://audacious-audit-spark.lovable.app/favicon.ico",
          description: "Risk Management & Vehicle Safety Program — professional policy audits, AI dashcam with G-sensor and zero wiring-cut live tracking for individuals, fleets and schools across India.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "B-5/55, Safdarjung Enclave",
            addressLocality: "New Delhi",
            addressRegion: "DL",
            postalCode: "110029",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 28.5609581,
            longitude: 77.1921258,
          },
          hasMap: "https://www.google.com/maps/place/28%C2%B033'39.5%22N+77%C2%B011'31.7%22E/@28.5608467,77.1920417,20.64z/data=!4m4!3m3!8m2!3d28.5609581!4d77.1921258",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-87005-15288",
            contactType: "customer service",
            areaServed: "IN",
            availableLanguage: ["en", "hi"],
          },
          sameAs: [],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});


function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
