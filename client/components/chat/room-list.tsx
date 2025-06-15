'use client';

import { useAuth } from "@/context/authContext";
import api from "@/lib/api";
import { ChatStep } from "@/types/data";
import { ChatRoom, ChatRoomListProps, User } from "@/types/index";
import { parseAPIError } from "@/utils/error";
import { Avatar, Input, Listbox, ListboxItem, Skeleton, Tooltip } from "@heroui/react";
import { useEffect, useState } from "react";
import { DrawerIcon, EditDocumentIcon, SearchIcon } from "../icons";
import React from "react";
import { dummyRooms } from '@/data/room';
import AuthButton from "../auth/auth-button";

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    className='flex flex-col h-full'
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
    setRooms(dummyRooms);

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

const filteredChatrooms = React.useMemo(() => {
  if (!searchQuery.trim()) return rooms;

  const q = searchQuery.toLowerCase();

  return rooms.filter((room) => {
    const matchesParticipant = room.participants
      .filter((u) => u.id !== myId)
      .some((user) =>
        user.name.toLowerCase().includes(q) ||
        user.username.toLowerCase().includes(q)
      );

    const matchesLastMessage = room.lastMessage?.toLowerCase().includes(q);

    return matchesParticipant || matchesLastMessage;
  });
  }, [rooms, searchQuery, myId]);

    
  return (
    <ListboxWrapper>
      <div className='chat-header'>
        <Tooltip content='Close' placement='right'>
          <DrawerIcon className='btn-aside' onClick={onClose} />
        </Tooltip>
        <Tooltip content='New' placement='right'>
          <EditDocumentIcon className='btn-aside' onClick={() => { setStep(ChatStep.NEW); onClose(); }} />
        </Tooltip>
      </div>
      <Input
        aria-label='Search'
        classNames={{
          input: 'text-sm',
        }}
        className='px-3 pb-[1rem]'
        size='sm'
        autoFocus
        labelPlacement='outside'
        placeholder='Search chats...'
        value={searchQuery}
        onValueChange={setSearchQuery}
        startContent={<SearchIcon className='text-default-400 pointer-events-none flex-shrink-0' />}
        variant='bordered'
        radius='lg'
      />
      <div className='flex-1 overflow-auto'>
        <Listbox aria-label='Chats'>
          {filteredChatrooms.map((room) => (
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
      </div>
      <footer className='chat-footer shrink-0'>
      <AuthButton initUser={user} />
      </footer>
      
    </ListboxWrapper>
  );
};

export default RoomList;
