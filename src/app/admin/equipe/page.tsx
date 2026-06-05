import TopBar from "@/components/Admin/TopBar";
import { getTeamMembers } from "./actions";
import TeamClient from "./TeamClient";

export default async function EquipePage() {
  const members = await getTeamMembers();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopBar title="Gestion de l'équipe" />
      <main className="flex-1 overflow-y-auto p-6">
        <TeamClient members={members} />
      </main>
    </div>
  );
}
