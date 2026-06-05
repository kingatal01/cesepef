"use client";

import { useState } from "react";
import { CheckCircle, Send } from "lucide-react";

const inputCls = "border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none";

const Contact = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", service: "", message: "", rgpd: false,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (k: keyof typeof form, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.rgpd) { setErrorMsg("Veuillez accepter la politique de confidentialité."); return; }
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, subject: form.subject, service: form.service, message: form.message }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Erreur serveur");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", service: "", message: "", rgpd: false });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erreur lors de l'envoi.");
    }
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="mb-12 rounded-xs bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Vous portez un projet ou un appel d&apos;offres ?
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Notre équipe étudie attentivement chaque sollicitation et revient vers vous sous 48 heures ouvrées avec une première proposition de cadrage.
              </p>

              {status === "success" ? (
                <div className="rounded-xs bg-green-50 p-8 text-center dark:bg-green-950">
                  <CheckCircle className="mx-auto mb-4 text-green-500" size={52} strokeWidth={1.5} />
                  <h3 className="mb-2 text-xl font-bold text-green-800 dark:text-green-200">Message envoyé !</h3>
                  <p className="text-green-700 dark:text-green-300">
                    Merci pour votre message. Notre équipe vous répondra sous 48 heures ouvrées.
                  </p>
                  <button onClick={() => setStatus("idle")}
                    className="mt-6 rounded-xs bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90">
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label htmlFor="name" className="mb-3 block text-sm font-medium text-dark dark:text-white">Nom & prénom *</label>
                        <input required id="name" type="text" value={form.name} onChange={(e) => set("name", e.target.value)}
                          placeholder="Votre nom complet" className={inputCls} />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label htmlFor="email" className="mb-3 block text-sm font-medium text-dark dark:text-white">Email professionnel *</label>
                        <input required id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                          placeholder="votre@email.org" className={inputCls} />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label htmlFor="phone" className="mb-3 block text-sm font-medium text-dark dark:text-white">Téléphone</label>
                        <input id="phone" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)}
                          placeholder="+235 XX XX XX XX" className={inputCls} />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label htmlFor="subject" className="mb-3 block text-sm font-medium text-dark dark:text-white">Type de demande *</label>
                        <select required id="subject" value={form.subject} onChange={(e) => set("subject", e.target.value)} className={inputCls}>
                          <option value="">Sélectionner...</option>
                          <option>Demande d&apos;information</option>
                          <option>Demande de proposition technique et financière</option>
                          <option>Partenariat</option>
                          <option>Recrutement / Expert associé</option>
                          <option>Presse</option>
                          <option>Autre</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label htmlFor="service" className="mb-3 block text-sm font-medium text-dark dark:text-white">Service concerné</label>
                        <select id="service" value={form.service} onChange={(e) => set("service", e.target.value)} className={inputCls}>
                          <option value="">— Optionnel —</option>
                          <option>Évaluation 360°</option>
                          <option>Système SERA clé en main</option>
                          <option>Étude de référence (Baseline)</option>
                          <option>Étude sectorielle ou de filière</option>
                          <option>Formations certifiantes & sur mesure</option>
                          <option>Assistance technique aux appels à projets</option>
                          <option>Diagnostic territorial & développement local</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label htmlFor="message" className="mb-3 block text-sm font-medium text-dark dark:text-white">Votre message *</label>
                        <textarea required id="message" rows={5} value={form.message} onChange={(e) => set("message", e.target.value)}
                          placeholder="Décrivez votre besoin, votre projet ou votre question..."
                          className={`${inputCls} resize-none`} />
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="mb-8 flex items-start gap-3">
                        <input type="checkbox" id="rgpd" checked={form.rgpd} onChange={(e) => set("rgpd", e.target.checked)} className="mt-1" />
                        <label htmlFor="rgpd" className="text-sm text-body-color dark:text-body-color-dark">
                          J&apos;accepte que mes données soient utilisées uniquement pour traiter ma demande, conformément à la politique de confidentialité de CESEPEF.
                        </label>
                      </div>
                    </div>
                    {errorMsg && (
                      <div className="w-full px-4 mb-4">
                        <p className="rounded-xs bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
                          {errorMsg}
                        </p>
                      </div>
                    )}
                    <div className="w-full px-4">
                      <button type="submit" disabled={status === "sending"}
                        className="flex items-center gap-3 rounded-xs bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 disabled:opacity-70 dark:shadow-submit-dark">
                        <Send size={16} className={status === "sending" ? "animate-pulse" : ""} />
                        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Coordonnées */}
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <div className="rounded-xs bg-white p-8 shadow-three dark:bg-gray-dark">
              <h3 className="mb-6 text-xl font-bold text-black dark:text-white">Coordonnées institutionnelles</h3>
              <div className="mb-5 flex items-start gap-3">
                <span className="mt-1 text-primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                </span>
                <div>
                  <p className="font-semibold text-black dark:text-white">Siège</p>
                  <p className="text-sm text-body-color dark:text-body-color-dark">
                    7ᵉ Arrondissement, Quartier Abéna<br />Axe Hôtel Mirande, N&apos;Djamena – Tchad<br />BP 716, N&apos;Djamena
                  </p>
                </div>
              </div>
              <div className="mb-5 flex items-start gap-3">
                <span className="mt-1 text-primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                </span>
                <div>
                  <p className="font-semibold text-black dark:text-white">Téléphones</p>
                  <p className="text-sm text-body-color dark:text-body-color-dark">
                    (+235) 66 38 64 14<br />(+235) 68 82 62 43<br />(+235) 66 23 66 89
                  </p>
                  <p className="mt-1 text-xs text-primary">WhatsApp (urgences) : +235 66 38 64 14</p>
                </div>
              </div>
              <div className="mb-5 flex items-start gap-3">
                <span className="mt-1 text-primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                </span>
                <div>
                  <p className="font-semibold text-black dark:text-white">Emails</p>
                  <a href="mailto:info@cesepef.org" className="block text-sm text-primary hover:underline">info@cesepef.org</a>
                  <a href="mailto:propositions@cesepef.org" className="block text-sm text-primary hover:underline">propositions@cesepef.org</a>
                  <a href="mailto:rh@cesepef.org" className="block text-sm text-primary hover:underline">rh@cesepef.org</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" /></svg>
                </span>
                <div>
                  <p className="font-semibold text-black dark:text-white">Horaires</p>
                  <p className="text-sm text-body-color dark:text-body-color-dark">
                    Lun – Jeu : 8h00 – 17h00 (GMT+1)<br />Vendredi : 8h00 – 13h00<br />Samedi : sur rendez-vous
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
