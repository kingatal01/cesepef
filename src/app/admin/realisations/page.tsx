import TopBar from "@/components/Admin/TopBar";
import { getRealisations } from "./actions";
import RealisationClient from "./RealisationClient";

export default async function RealisationsAdminPage() {
  const realisations = await getRealisations();
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopBar title="Réalisations & Références" />
      <main className="flex-1 overflow-y-auto p-6">
        <RealisationClient realisations={realisations} />
      </main>
    </div>
  );
}
