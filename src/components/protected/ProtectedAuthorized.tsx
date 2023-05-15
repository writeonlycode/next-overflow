import { useUser } from "@supabase/auth-helpers-react";

export default function ProtectedAuthorized({ authorizedUserIds, children }: any) {
  const user = useUser();

  if (!user) {
    return <div>Access Denied!</div>;
  }

  if (!authorizedUserIds.includes(user.id)) {
    return <div>Access Denied!</div>;
  }

  return children;
}
