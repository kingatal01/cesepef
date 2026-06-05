const stats = [
  { value: "50+", label: "Projets & missions accompagnés" },
  { value: "8+", label: "Pays d'intervention" },
  { value: "20+", label: "Experts mobilisables" },
  { value: "60+", label: "Années d'expérience cumulée" },
  { value: "8", label: "Secteurs d'intervention" },
  { value: "95%", label: "Taux de satisfaction client" },
];

const Stats = () => {
  return (
    <section className="bg-primary py-12">
      <div className="container">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="mb-1 text-3xl font-extrabold text-white lg:text-4xl">
                {stat.value}
              </p>
              <p className="text-sm font-medium text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-white/60">
          Tchad • Mali • Niger • Sénégal • Burkina Faso • Côte d&apos;Ivoire •
          RCA • Cameroun — Banque mondiale, BAD, UE, AFD, GIZ, BIT, FAO,
          UNICEF, PNUD…
        </p>
      </div>
    </section>
  );
};

export default Stats;
