// SEO Utilities for Palmtweets - OPTIMIZED VERSION

// 1. ORGANIZATION SCHEMA (Hii inajenga Trust kwa Google)
export const ORGANIZATION_SCHEMA = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Palmtweets",
  "url": "https://palmtweets.com",
  "logo": "https://palmtweets.com/logo.png", // HAKIKISHA UNA LOGO HAPA
  "sameAs": [
    "https://twitter.com/palmtweets", // Weka social links zako
    "https://facebook.com/palmtweets"
  ]
});

// 2. SOFTWARE SCHEMA (Imezidishiwa Nguvu)
export const SOFTWARE_APPLICATION_SCHEMA = (
  name: string, 
  description: string, 
  ratingVal: string = "4.8", 
  ratingCount: string = "15420"
) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": name,
  "description": description,
  "operatingSystem": "Web Browser, Windows, macOS, Android, iOS",
  "applicationCategory": "UtilityApplication", // 'Utility' ni bora kuliko 'Game' kwa Tools
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": ratingVal,
    "ratingCount": ratingCount,
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": "Check Click Speed, Test Mouse Buttons, Measure Reaction Time, Free Online Tool"
});

// 3. GAME SCHEMA (Kwa Page za Game haswa)
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

// 4. HOWTO SCHEMA (Hii ni nzuri kwa 'How to Click Faster')
export const HOWTO_SCHEMA = (name: string, steps: { title: string; text: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": name,
  "step": steps.map((step, i) => ({
    "@type": "HowToStep",
    "position": i + 1,
    "name": step.title,
    "itemListElement": {
      "@type": "HowToDirection",
      "text": step.text
    }
  }))
});

// 5. FAQ SCHEMA (Hii inakupa nafasi kubwa kwenye Search Results)
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

// 6. BREADCRUMB SCHEMA (Navigation)
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
