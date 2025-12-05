import { useEffect } from 'react';

export default function StructuredData() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AutomotiveBusiness",
      "name": "Авто-Драйв",
      "description": "Профессиональный автосервис в Самаре. Диагностика, ремонт двигателя, ходовой части, электрики. Гарантия качества.",
      "url": "https://auto-drive-website.poehali.dev",
      "telephone": "+7-927-618-84-19",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Самара",
        "addressCountry": "RU"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "22:00"
        }
      ],
      "priceRange": "$$",
      "image": "https://cdn.poehali.dev/projects/fb89fa05-e43f-4023-a531-204d2b5300df/files/og-image-1764871813153.png",
      "sameAs": [
        "https://t.me/Almaz_63_tg"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "48"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Услуги автосервиса",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Ремонт двигателя и ходовой части",
              "description": "Комплексный ремонт двигателя внутреннего сгорания, замена масла и фильтров, диагностика и ремонт подвески"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Компьютерная диагностика",
              "description": "Профессиональное выявление неисправностей автомобиля посредством подключения специализированного оборудования"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Замена автомобильных жидкостей",
              "description": "Замена моторного, трансмиссионного масла, тормозной жидкости, антифриза, жидкости ГУР"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Ремонт АКПП",
              "description": "От диагностики до капитального ремонта автоматических коробок передач любой сложности"
            }
          }
        ]
      }
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
