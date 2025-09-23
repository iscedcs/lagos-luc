"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { EditProfileModal } from "./edit-profile-modal"
import { Edit3 } from "lucide-react"

interface EditProfileButtonProps {
  user: UserInterface
}

export function EditProfileButton({ user }: EditProfileButtonProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsEditModalOpen(true)} className="gap-2">
        <Edit3 className="h-4 w-4" />
        Edit Profile
      </Button>

      <EditProfileModal user={user} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </>
  )
}
