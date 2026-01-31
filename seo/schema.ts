// SEO Utilities for Palmtweets

export const SOFTWARE_APPLICATION_SCHEMA = (name: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": name,
  "description": description,
  "operatingSystem": "Web",
  "applicationCategory": "GameApplication",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "12500"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
});

export const GAME_SCHEMA = (name: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": name,
  "description": description,
  "genre": "Arcade",
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser"
});

export const HOWTO_SCHEMA = (name: string, steps: string[]) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": `How to use ${name}`,
  "step": steps.map((text, i) => ({
    "@type": "HowToStep",
    "position": i + 1,
    "name": `Step ${i + 1}`,
    "text": text
  }))
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