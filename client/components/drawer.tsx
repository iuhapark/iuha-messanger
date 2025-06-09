'use client';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@heroui/react";
import RoomList from "./chat/room-list";
import { ChatRoomListProps } from "@/types";
import { ChatStep } from "@/types/data";
import { LayoutIcon } from "./icons";
import AuthButton from "./auth/auth-button";
import { useAuth } from "@/context/authContext";
import { useEffect } from "react";
import NextLink from "next/link";

export default function DrawerProps({
  setStep,
  onSelect,
  refresh,
  onClose,
}: ChatRoomListProps & { setStep: (step: ChatStep) => void; refresh: number; onClose: () => void }) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure({ defaultOpen: true });
    const { user, setUser } = useAuth();
  
  useEffect(() => {
    setUser(user ?? null);
  }, [user]);
  return (
    <>
    <Tooltip content='Open' placement='right'>
      <Button isIconOnly className='btn-aside' onPress={onOpen} startContent={<LayoutIcon />}>
      </Button>
      </Tooltip>
      <Drawer hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange} placement='left' size='xs' backdrop='transparent'>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className='flex flex-col gap-1'>
                <NextLink className='flex justify-start items-center gap-1' href='/'>
                    <p className='font-bold text-inherit'>iuha</p>
                </NextLink>
              </DrawerHeader>
              <DrawerBody>
               <RoomList setStep={setStep} onSelect={onSelect} refresh={refresh} onClose={onClose} />
              </DrawerBody>
              <DrawerFooter>
                <AuthButton initUser={user} />
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
