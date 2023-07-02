import UserCard from "@/components/users/_shared/UserCard";

export default function UsersIndex({ profiles }: any) {

  return profiles.map((profile: any) => (
    <UserCard key={profile.id} profile={profile} />
  ));
}
