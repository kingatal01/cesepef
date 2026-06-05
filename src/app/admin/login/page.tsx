import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion — Administration CESEPEF",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <Image
              src="/images/logo/logo-cesepef.jpg"
              alt="CESEPEF"
              width={160}
              height={60}
              className="mx-auto h-14 w-auto"
            />
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
            Espace Administration
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Connectez-vous pour gérer le contenu du site
          </p>
        </div>

        <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900">
          <form>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Adresse email
              </label>
              <input
                type="email"
                placeholder="admin@cesepef.org"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mot de passe
                </label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <Link
              href="/admin/dashboard"
              className="block w-full rounded-lg bg-primary py-3 text-center text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Se connecter
            </Link>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} CESEPEF — Accès réservé aux administrateurs
        </p>
      </div>
    </div>
  );
}
