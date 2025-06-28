'use client';

import { useState } from "react";
import { Avatar } from "@heroui/react";
import { User } from "@/types";
import Detail from "../user/detail";

const ModalAvatar = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Avatar
        isBordered
        showFallback
        name={user.name}
        src={user.profile}
        className='avatar'
        onClick={() => setIsOpen(true)}
      />
      <Detail
        user={user}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default ModalAvatar;
