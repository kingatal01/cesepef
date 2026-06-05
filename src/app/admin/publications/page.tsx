import TopBar from "@/components/Admin/TopBar";
import { getPublications } from "./actions";
import PublicationClient from "./PublicationClient";

export default async function PublicationsPage() {
  const publications = await getPublications();
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopBar title="Blog & Publications" />
      <main className="flex-1 overflow-y-auto p-6">
        <PublicationClient publications={publications} />
      </main>
    </div>
  );
}
