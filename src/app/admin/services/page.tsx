import TopBar from "@/components/Admin/TopBar";
import { getServices } from "./actions";
import ServiceClient from "./ServiceClient";

export default async function ServicesAdminPage() {
  const services = await getServices();
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopBar title="Gestion des Services" />
      <main className="flex-1 overflow-y-auto p-6">
        <ServiceClient services={services} />
      </main>
    </div>
  );
}
