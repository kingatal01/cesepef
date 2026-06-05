const Map = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div className="mb-12 lg:mb-0">
              <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl">
                Où nous trouver
              </h2>
              <p className="mb-6 text-base text-body-color dark:text-body-color-dark">
                Nos bureaux sont situés au cœur de N&apos;Djamena, dans le
                7ᵉ Arrondissement, Quartier Abéna, sur l&apos;axe Hôtel
                Mirande (à 600 m après l&apos;hôtel Mirande).
              </p>
              <ul className="space-y-3 text-sm text-body-color dark:text-body-color-dark">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </span>
                  <span>7ᵉ Arrondissement, Quartier Abéna, axe Hôtel Mirande — N&apos;Djamena, Tchad</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </span>
                  <span>BP 716, N&apos;Djamena – Tchad</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </span>
                  <span>(+235) 66 38 64 14 / 68 82 62 43</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full px-4 lg:w-1/2">
            <div className="overflow-hidden rounded-xs shadow-two">
              <iframe
                src="https://maps.google.com/maps?q=12.0968984,15.1206857&z=17&output=embed&hl=fr"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation CESEPEF — N'Djamena"
              />
            </div>
            <div className="mt-4 text-right">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=12.0968984,15.1206857"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xs bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.71 11.29l-9-9a1 1 0 00-1.42 0l-9 9a1 1 0 000 1.42l9 9a1 1 0 001.42 0l9-9a1 1 0 000-1.42zM14 14.5V12h-4v3H8v-4a1 1 0 011-1h5V7.5l3.5 3.5-3.5 3.5z"/>
                </svg>
                Naviguer vers CESEPEF
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
