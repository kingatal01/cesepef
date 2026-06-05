import TopBar from "@/components/Admin/TopBar";
import { getPartners } from "./actions";
import PartnerClient from "./PartnerClient";

export default async function PartenairesPage() {
  const partners = await getPartners();
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopBar title="Partenaires & Bailleurs" />
      <main className="flex-1 overflow-y-auto p-6">
        <PartnerClient partners={partners} />
      </main>
    </div>
  );
}
