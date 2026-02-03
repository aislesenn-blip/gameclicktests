// 1. ORGANIZATION SCHEMA (Minimal & Safe)
export const ORGANIZATION_SCHEMA = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Palmtweets",
  "url": "https://palmtweets.com"
});

export const WEBSITE_SCHEMA = (locale: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Palmtweets",
  "url": `https://palmtweets.com/${locale}`,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `https://palmtweets.com/${locale}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
});

// 2. SOFTWARE SCHEMA (No Fake Ratings - 100% Google Compliant)
export const SOFTWARE_APPLICATION_SCHEMA = (name: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": name,
  "description": description,
  "operatingSystem": "Web Browser, Windows, macOS, Android, iOS",
  "applicationCategory": "UtilityApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "featureList": "Check Click Speed, Test Mouse Buttons, Measure Reaction Time, Free Online Tool"
});

// 3. GAME SCHEMA
export const GAME_SCHEMA = (name: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": name,
  "description": description,
  "genre": "Arcade",
  "playMode": "SinglePlayer",
  "applicationCategory": "BrowserGame",
  "operatingSystem": "Web Browser"
});

// 4. HOWTO SCHEMA
export const HOWTO_SCHEMA = (name: string, steps: ({ title: string; text: string } | string)[]) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": name,
  "step": steps.map((step, i) => ({
    "@type": "HowToStep",
    "position": i + 1,
    "name": typeof step === 'string' ? `Step ${i + 1}` : step.title,
    "itemListElement": {
      "@type": "HowToDirection",
      "text": typeof step === 'string' ? step : step.text
    }
  }))
});

// 5. FAQ SCHEMA
export const FAQ_SCHEMA = (questions: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": questions.map(q => ({
    "@type": "Question",
    "name": q.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": q.answer
    }
  }))
});

// 6. BREADCRUMB SCHEMA
export const BREADCRUMB_SCHEMA = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://palmtweets.com${item.url}`
  }))
});
