import React, { useEffect, useRef } from "react";

// ─── Scroll reveal hook ───────────────────────────────────────────────────────

function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

type ProductItem = {
  name: string;
  price: string;
  note: string;
  highlight?: string;
};

type GearPerson = {
  label: string;
  size: string;
  products: ProductItem[];
};

const GEAR_DATA: { his: GearPerson; hers: GearPerson } = {
  his: {
    label: "His",
    size: "EU 45–46",
    products: [
      {
        name: "Quechua MH500 Mid Boots",
        price: "€45–66",
        note: "Currently discounted",
        highlight: "Best value pick",
      },
      {
        name: "Quechua MH500 Rain Jacket",
        price: "€93",
        note: "Full waterproof coverage",
      },
      {
        name: "Dreamscape Rain Jacket",
        price: "€50",
        note: "30% off until April 1",
        highlight: "Limited offer",
      },
    ],
  },
  hers: {
    label: "Hers",
    size: "EU 39",
    products: [
      {
        name: "Quechua MH500 Mid Women's Boots",
        price: "€60–80",
        note: "Waterproof, excellent grip",
        highlight: "Top pick",
      },
      {
        name: "Quechua MH100 Rain Jacket",
        price: "€30–50",
        note: "Lightweight, packable",
      },
    ],
  },
};

const PREMIUM_ALTERNATIVES = [
  {
    name: "Salomon X Ultra 4 Mid GTX",
    price: "€73–98",
    note: "Superior grip on wet surfaces",
  },
  {
    name: "Merrell Moab 3 Mid",
    price: "Market rate",
    note: "Specifically recommended for Plitvice boardwalks",
  },
];

type Store = {
  name: string;
  address: string;
  hours?: string;
  phone?: string;
  website?: string;
  brands?: string;
  note?: string;
  primary?: boolean;
};

const STORES: Store[] = [
  {
    name: "Decathlon Rijeka",
    address: "Osjecka 67a, Rijeka",
    hours: "Mon–Sun 08:00–21:00",
    phone: "+385 51 499 900",
    website: "decathlon.hr",
    note: "Best selection and price for the gear listed above",
    primary: true,
  },
  {
    name: "Intersport",
    address: "Tower Center, J. Polica Kamova 81a",
    brands: "Salomon, The North Face",
  },
  {
    name: "Hervis",
    address: "Zapadni Trgovacki Centar",
    brands: "Salewa, Mammut",
  },
  {
    name: "Iglu Sport",
    address: "Andrije Medulica 6",
    brands: "LOWA and specialist gear",
    note: "Expert staff, specialist store",
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.7a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" />
    </svg>
  );
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProductCard({ product }: { product: ProductItem }) {
  return (
    <div className="bg-earth-50 rounded-xl border border-earth-100 p-4 flex flex-col gap-2 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-2">
        <p className="font-body text-sm font-semibold text-stone-dark leading-snug flex-1">
          {product.name}
        </p>
        {product.highlight && (
          <span className="inline-flex items-center gap-1 bg-forest-100 text-forest-800 text-xs font-medium px-2 py-0.5 rounded-full shrink-0">
            <StarIcon className="w-2.5 h-2.5" />
            {product.highlight}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <TagIcon className="w-3.5 h-3.5 text-forest-600 shrink-0" />
        <span className="font-body text-base font-bold text-forest-700 tabular-nums">
          {product.price}
        </span>
      </div>
      <p className="font-body text-xs text-stone-mid leading-relaxed">
        {product.note}
      </p>
    </div>
  );
}

function StoreCard({ store }: { store: Store }) {
  if (store.primary) {
    return (
      <div
        className="rounded-2xl p-6 text-white relative overflow-hidden hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
        style={{
          background:
            "linear-gradient(135deg, var(--color-forest-800) 0%, var(--color-forest-700) 100%)",
        }}
      >
        <div className="absolute top-4 right-4">
          <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full border border-white/30">
            Recommended
          </span>
        </div>
        <h4 className="font-heading text-xl text-white mb-4">{store.name}</h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPinIcon className="w-4 h-4 text-forest-300 shrink-0 mt-0.5" />
            <span className="font-body text-sm text-forest-100">{store.address}</span>
          </div>
          {store.hours && (
            <div className="flex items-center gap-3">
              <ClockIcon className="w-4 h-4 text-forest-300 shrink-0" />
              <span className="font-body text-sm text-forest-100">{store.hours}</span>
            </div>
          )}
          {store.phone && (
            <div className="flex items-center gap-3">
              <PhoneIcon className="w-4 h-4 text-forest-300 shrink-0" />
              <a
                href={`tel:${store.phone}`}
                className="font-body text-sm text-forest-100 hover:text-white transition-colors duration-150 min-h-[44px] flex items-center"
              >
                {store.phone}
              </a>
            </div>
          )}
          {store.website && (
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 shrink-0 flex items-center justify-center">
                <span className="text-forest-300 text-xs font-bold">W</span>
              </span>
              <a
                href={`https://${store.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-forest-100 hover:text-white transition-colors duration-150 underline underline-offset-2"
              >
                {store.website}
              </a>
            </div>
          )}
        </div>
        {store.note && (
          <p className="font-body text-xs text-forest-300 mt-4 leading-relaxed border-t border-white/20 pt-4">
            {store.note}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-warm-white rounded-xl border border-earth-100 p-4 flex items-start gap-3 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
      <MapPinIcon className="w-4 h-4 text-earth-500 shrink-0 mt-1" />
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm font-semibold text-stone-dark">{store.name}</p>
        <p className="font-body text-xs text-stone-mid mt-0.5">{store.address}</p>
        {store.brands && (
          <p className="font-body text-xs text-forest-700 mt-1">{store.brands}</p>
        )}
        {store.note && (
          <p className="font-body text-xs text-earth-700 mt-1 italic">{store.note}</p>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GearShopping() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const gearRef = useScrollReveal<HTMLDivElement>();
  const storesRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="gear" className="bg-earth-50 py-12 px-4 sm:py-16 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div
          ref={headingRef}
          className="text-center mb-12 animate-on-scroll"
        >
          <h2 className="font-heading text-4xl sm:text-5xl text-forest-900 mb-3">
            <span className="heading-accent">Gear Up</span>
          </h2>
          <p className="font-body text-stone-mid text-base sm:text-lg mt-4">
            Gear needed and where to find it in Rijeka
          </p>
        </div>

        {/* Budget estimate banner */}
        <div className="bg-warm-white rounded-2xl shadow-sm border border-earth-100 p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-stone-mid mb-1">
              Budget estimate
            </p>
            <p className="font-heading text-2xl text-forest-800">€200–280</p>
            <p className="font-body text-sm text-stone-mid mt-0.5">
              Both fully kitted out from Decathlon
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 bg-forest-50 border border-forest-200 text-forest-700 text-xs font-medium px-3 py-1.5 rounded-full">
              Waterproof boots
            </span>
            <span className="inline-flex items-center gap-1.5 bg-water-50 border border-water-200 text-water-700 text-xs font-medium px-3 py-1.5 rounded-full">
              Rain jackets
            </span>
            <span className="inline-flex items-center gap-1.5 bg-earth-100 border border-earth-200 text-earth-700 text-xs font-medium px-3 py-1.5 rounded-full">
              Rijeka pickup
            </span>
          </div>
        </div>

        {/* His & Hers columns — stacks on mobile, 2-col on sm */}
        <div
          ref={gearRef}
          className="animate-on-scroll"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {(["his", "hers"] as const).map((key) => {
              const person = GEAR_DATA[key];
              return (
                <div
                  key={key}
                  className="bg-warm-white rounded-2xl shadow-sm border border-earth-100 p-6"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-full bg-forest-100 flex items-center justify-center shrink-0">
                      <span className="font-heading text-sm font-bold text-forest-700">
                        {person.label[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-forest-900">{person.label}</h3>
                      <p className="font-body text-xs text-stone-mid">Size {person.size}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {person.products.map((product) => (
                      <ProductCard key={product.name} product={product} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Premium alternatives */}
        <div className="bg-warm-white rounded-2xl shadow-sm border border-earth-100 p-6 mb-8">
          <h3 className="font-heading text-lg text-forest-900 mb-1">
            Premium Alternatives
          </h3>
          <p className="font-body text-xs text-stone-mid mb-4">
            Available at Intersport, Hervis, or Iglu Sport
          </p>
          {/* Stacks on mobile, 2-col on sm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PREMIUM_ALTERNATIVES.map((alt) => (
              <div
                key={alt.name}
                className="flex items-start gap-3 bg-earth-50 rounded-xl border border-earth-100 p-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
              >
                <TagIcon className="w-4 h-4 text-earth-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-sm font-semibold text-stone-dark">{alt.name}</p>
                  <p className="font-body text-sm font-bold text-earth-700 mt-0.5 tabular-nums">{alt.price}</p>
                  <p className="font-body text-xs text-stone-mid mt-1 leading-relaxed">{alt.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stores */}
        <div
          ref={storesRef}
          className="animate-on-scroll"
        >
          <h3 className="font-heading text-xl text-forest-900 mb-4">
            Stores in Rijeka
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {/* Primary store */}
            <StoreCard store={STORES[0]} />
            {/* Secondary stores — 1-col on mobile, 3-col on sm */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {STORES.slice(1).map((store) => (
                <StoreCard key={store.name} store={store} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom tip */}
        <div className="mt-8 flex items-start gap-3 bg-forest-50 border border-forest-200 rounded-2xl p-5">
          <span className="text-xl shrink-0" aria-hidden="true">💡</span>
          <div>
            <p className="font-body text-sm font-semibold text-forest-800 mb-1">
              Pro tip
            </p>
            <p className="font-body text-sm text-forest-700 leading-relaxed">
              Decathlon allows returns within 365 days with a receipt. Buy before
              the trip, return anything you don't love after. Stock up on merino
              socks while you're there — they're excellent value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
