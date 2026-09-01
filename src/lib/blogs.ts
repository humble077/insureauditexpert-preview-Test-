import blogRenewal from "@/assets/blog-renewal.jpg";
import blogClaim from "@/assets/blog-claim.jpg";
import blogAi from "@/assets/blog-ai.jpg";
import blogFleet from "@/assets/blog-fleet.jpg";

export type Blog = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  tint: string;
  image: string;
  excerpt: string;
  content: { heading?: string; body: string }[];
};

export const BLOGS: Blog[] = [
  {
    slug: "early-renewal-loss-prevention",
    title: "Early Renewal Kaise Aapko Bada Loss Hone Se Bacha Sakta Hai",
    date: "May 10, 2024",
    readTime: "6 min read",
    category: "Renewals",
    tint: "bg-brand-soft",
    image: blogRenewal,
    excerpt:
      "Policy expiry se 30 din pehle renewal start karne se gaps, claim rejection aur premium hikes se kaise bacha jaa sakta hai — full breakdown.",
    content: [
      {
        body: "Bahut saare brokers aur fleet owners renewal ko ek 'last minute' kaam samajhte hain. Lekin reality yeh hai ki insurance ka 70% loss expiry ke aas-paas hi hota hai — gap days, missed riders, ya last-minute premium hikes ki wajah se.",
      },
      {
        heading: "1. Gap Days Ka Risk",
        body: "Agar policy expire ho gayi aur 1 din ka bhi gap aaya, toh us beech mein hua koi bhi accident, theft ya damage fully out-of-pocket hota hai. Motor & fleet portfolios mein yeh ek single incident lakhon ka loss bana sakta hai.",
      },
      {
        heading: "2. Premium Hike Negotiation Window",
        body: "Renewal 30 din pehle start karne se aapke paas time hota hai quotes compare karne ka, NCB protect karne ka aur insurer ke saath better terms negotiate karne ka. Last-minute renewals mein insurer ke offered rate ko accept karna padta hai.",
      },
      {
        heading: "3. Documentation & KYC",
        body: "Commercial vehicles aur corporate health policies mein KYC, fitness certificate, PUC aur endorsements ko update karne mein time lagta hai. Early renewal yeh sab clean rakhta hai — kal jab claim aaye, rejection na ho.",
      },
      {
        heading: "Insurance Audit Expert Kaise Help Karta Hai",
        body: "Hamari AI engine har policy ko expiry se 60, 30 aur 7 din pehle auto-flag karti hai. WhatsApp aur email reminders customer ko bhi jaate hain aur aapke team ko bhi. Result: 95%+ renewal recovery aur zero gap days.",
      },
    ],
  },
  {
    slug: "claim-rejection-reasons",
    title: "Top 7 Reasons Jiski Wajah Se Insurance Claims Reject Ho Jaate Hain",
    date: "May 05, 2024",
    readTime: "8 min read",
    category: "Claims",
    tint: "bg-accent-yellow/40",
    image: blogClaim,
    excerpt:
      "Sabse common claim rejection reasons aur unko avoid karne ke practical steps — directly hamare audit team ke experience se.",
    content: [
      {
        body: "Ek genuine claim ka reject hona ek customer ke liye trust-breaking moment hota hai. Hamari audit team ne 10,000+ policies ko analyze karke yeh 7 most common rejection reasons identify kiye hain.",
      },
      { heading: "1. Late Intimation", body: "Most insurers 24–48 hours ke andar incident intimation maangte hain. Late report = automatic rejection grounds. Solution: hamesha tatkal WhatsApp/email se insurer ko intimate karein, even before FIR." },
      { heading: "2. Policy Lapse / Gap", body: "Expired policy ke time hua incident cover nahi hota. Early renewal aur reminders se 100% avoid kiya jaa sakta hai." },
      { heading: "3. Misrepresentation in Proposal", body: "Pre-existing diseases hide karna, vehicle commercial use chhupana — yeh sab claim time pe pakda jaata hai." },
      { heading: "4. Wrong Add-on Selection", body: "Zero-dep, engine protect, RTI — sahi add-ons na hone se claim partial milti hai. Audit yeh sab pehle hi flag karta hai." },
      { heading: "5. Documentation Gaps", body: "FIR, PUC, fitness certificate, driving license — har ek detail matter karti hai." },
      { heading: "6. Exclusions Misunderstood", body: "Natural calamities, riots, war — policy ke fine print ko ignore karna common mistake hai." },
      { heading: "7. Surveyor Report Discrepancy", body: "Surveyor ki report ke saath aapki version match na ho toh claim deduct hoti hai. Professional claim assistance yeh resolve karta hai." },
    ],
  },
  {
    slug: "ai-transforming-insurance",
    title: "AI Insurance Industry Ko Kaise Transform Kar Raha Hai",
    date: "Apr 28, 2024",
    readTime: "7 min read",
    category: "AI",
    tint: "bg-accent-pink",
    image: blogAi,
    excerpt:
      "Underwriting se lekar claim settlement tak — AI ne har step ko reshape kar diya hai. Indian context mein practical impact.",
    content: [
      { body: "Insurance ek data-heavy industry hai, aur AI is data ko meaningful insights mein convert kar raha hai — faster, cheaper aur more accurate than ever." },
      { heading: "Smart Underwriting", body: "Pehle proposal review mein 3–5 din lagte the. Aaj AI risk-score 60 seconds mein generate karta hai — telematics, credit, claim history sab merge karke." },
      { heading: "Predictive Renewal", body: "AI predict karta hai konsa customer renew karega aur konsa nahi — taaki retention team sahi customer pe focus kare." },
      { heading: "Fraud Detection", body: "Pattern recognition se duplicate claims, staged accidents aur inflated invoices instantly flag hote hain." },
      { heading: "Customer Engagement", body: "WhatsApp chatbots 24×7 query handle karte hain, multi-lingual support dete hain aur claim status real-time share karte hain." },
    ],
  },
  {
    slug: "fleet-insurance-guide",
    title: "Fleet Insurance Management: Complete Guide",
    date: "Apr 20, 2024",
    readTime: "10 min read",
    category: "Fleet",
    tint: "bg-accent-blue",
    image: blogFleet,
    excerpt:
      "5+ vehicles wale fleet owners ke liye end-to-end insurance playbook — coverage selection, premium optimization aur claim workflow.",
    content: [
      { body: "Fleet insurance individual motor cover se kaafi different hota hai. Aapko ek single master policy chahiye jo growth, churn aur risk mix ko handle kare." },
      { heading: "Coverage Types", body: "Comprehensive vs Third-Party, GCV vs PCV, IMT 23 add-on, driver PA cover — har vehicle category ke liye sahi mix banana padta hai." },
      { heading: "Premium Optimization", body: "Fleet discount, NCB transfer, telematics-based pricing — sab milkar 15–30% tak premium reduce karte hain." },
      { heading: "Claim Workflow", body: "Centralized claim desk, dedicated surveyor empanelment aur 48-hour TAT — yeh teen cheezein fleet operations ko smooth banati hain." },
      { heading: "Compliance & Audit", body: "Fitness, permit, PUC, driver license — har vehicle ka real-time tracking dashboard hona chahiye. Audit Expert yeh dashboard ready provide karta hai." },
    ],
  },
];

export const getBlog = (slug: string) => BLOGS.find((b) => b.slug === slug);
