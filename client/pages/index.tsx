import '@/styles/_index.scss';
import { Auth } from "@/hooks/Auth";
import Login from "./auth/login";
import Chat from "./chat";

export default function Home() {
  const { user, loading } = Auth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Login />;
  
  return <Chat />;
}
