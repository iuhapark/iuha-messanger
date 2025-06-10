'use client';

import { useAuth } from "@/context/authContext";
import api from "@/lib/api";
import { ChatStep } from "@/types/data";
import { ChatRoom, ChatRoomListProps, User } from "@/types/index";
import { parseAPIError } from "@/utils/error";
import { Avatar, Button, Input, Listbox, ListboxItem, Skeleton, Tooltip } from "@heroui/react";
import { useEffect, useState } from "react";
import { ChatIcon, EditDocumentIcon, LayoutIcon, SearchIcon } from "../icons";
import React from "react";

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    // className='w-full px-1 py-2 rounded-small border'
    // style={{
    //   width: 'var(--aside-width)',
    //   height: 'calc(var(--screen-height))',
    // }}
  >
    {children}
  </div>
);

const RoomList = ({
  setStep,
  onSelect,
  refresh,
  onClose,
}: ChatRoomListProps & { setStep: (step: ChatStep) => void; refresh: number; onClose: () => void }) => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const { user, loading } = useAuth();
  const myId = user?.id;
  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {
    if (loading || !user?.id) return;

    const fetchRooms = async () => {
      try {
        const res = await api.get('/chat/room-list');
        setRooms(res.data);
      } catch (err) {
        alert(parseAPIError(err));
      }
    };
    fetchRooms();
  }, [refresh, loading, user]);

  return (
    <ListboxWrapper>
      <div className='btn-group'>
        <Tooltip content='New' placement='right'>
        <EditDocumentIcon className='btn-aside' onClick={() => setStep(ChatStep.NEW)} />
      </Tooltip>
      <Tooltip content='Close' placement='right'>
        <LayoutIcon className='btn-aside' onClick={onClose} />
      </Tooltip>
      </div>
      {/* <Input
          placeholder='Search contacts...'
          value={searchQuery}
          onValueChange={setSearchQuery}
          startContent={<SearchIcon className='text-default-400' />}
          size='sm'
          variant='bordered'
          classNames={{
            inputWrapper: 'border-default-200 hover:border-default-400 bg-transparent',
          }}
        /> */}
      <Listbox aria-label='Chats'>
        {rooms.map((room) => (
          <ListboxItem key={room.id} onClick={() => onSelect(room)}>
            <Skeleton className='rounded-full' isLoaded={!!room.participants}>
              {room.participants
                .filter((user: User) => user.id !== myId)
                .map((user: User) => (
                  <div key={user.id} className='rooms'>
                    <Avatar
                      showFallback
                      name={user.name}
                      src={user.profile}
                      alt={user.name}
                      className='avatar'
                    />
                    <div className='flex-col justify-start gap-2 px-2'>
                      {user.name}
                      <div className='text-[0.8rem]'
                      style={{ color: 'var(--text-color)' }}>{room.lastMessage?.slice(0, 19)}</div>
                    </div>
                  </div>
                ))}
            </Skeleton>
          </ListboxItem>
        ))}
      </Listbox>
    </ListboxWrapper>
  );
};

export default RoomList;
