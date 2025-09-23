import { getUserProfile } from "@/actions/users"
import { UserProfileServer } from "@/components/profile/user-profile-server"
import { notFound } from "next/navigation"

export default async function ProfilePage() {
  const user = await getUserProfile()
  if (!user) return notFound()

  return <UserProfileServer user={user} />
}
