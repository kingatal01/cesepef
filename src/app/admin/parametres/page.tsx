import TopBar from "@/components/Admin/TopBar";

export default function ParametresPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopBar title="Paramètres" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Informations générales */}
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-900">
            <h3 className="mb-5 text-base font-semibold text-gray-800 dark:text-white">
              Informations générales
            </h3>
            <div className="space-y-4">
              {[
                { label: "Nom du site", value: "CESEPEF" },
                { label: "Email principal", value: "info@cesepef.org" },
                { label: "Téléphone", value: "(+235) 66 38 64 14" },
                { label: "Adresse", value: "7ᵉ Arr., Quartier Abéna, N'Djamena" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                    {f.label}
                  </label>
                  <input
                    defaultValue={f.value}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              ))}
              <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90">
                Enregistrer
              </button>
            </div>
          </div>

          {/* Compte administrateur */}
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-900">
            <h3 className="mb-5 text-base font-semibold text-gray-800 dark:text-white">
              Compte administrateur
            </h3>
            <div className="space-y-4">
              {[
                { label: "Nom", value: "Administrateur CESEPEF", type: "text" },
                { label: "Email", value: "admin@cesepef.org", type: "email" },
                { label: "Nouveau mot de passe", value: "", type: "password" },
                { label: "Confirmer le mot de passe", value: "", type: "password" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    defaultValue={f.value}
                    placeholder={f.type === "password" ? "••••••••" : undefined}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              ))}
              <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90">
                Mettre à jour
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
