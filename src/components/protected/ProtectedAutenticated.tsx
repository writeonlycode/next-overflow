import { useUser } from "@supabase/auth-helpers-react";

export default function ProtectedAuthenticated({ children }: any) {
  const user = useUser();

  if (!user) {
    return <div>Access Denied!</div>;
  }

  return children;
}
