import TopBar from "@/components/Admin/TopBar";
import { getMessages } from "./actions";
import MessagesClient from "./MessagesClient";

export default async function MessagesPage() {
  const messages = await getMessages();
  const unread = messages.filter((m) => !m.isRead).length;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopBar title={`Messages reçus${unread > 0 ? ` (${unread} non lu${unread > 1 ? "s" : ""})` : ""}`} />
      <main className="flex-1 overflow-y-auto p-6">
        <MessagesClient messages={messages} />
      </main>
    </div>
  );
}
