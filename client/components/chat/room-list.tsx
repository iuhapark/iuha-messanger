'use client';

import { useAuth } from "@/context/authContext";
import { dummyRooms } from '@/data/room';
import api from "@/lib/api";
import { ChatStep } from "@/types/data";
import { ChatRoom, ChatRoomListProps, User } from "@/types/index";
import { parseAPIError } from "@/utils/error";
import { Avatar, Button, Kbd, Listbox, ListboxItem, Skeleton, Tooltip } from "@heroui/react";
import { usePress } from "@react-aria/interactions";
import { isAppleDevice } from "@react-aria/utils";
import React, { useEffect, useState } from "react";
import AuthButton from "../auth/auth-button";
import { DrawerIcon, EditDocumentIcon } from "../icons/icons";
import { SearchLinearIcon } from "../icons/linear/search";

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    className='listbox'
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
  const [commandKey, setCommandKey] = useState<"ctrl" | "command">("command");

  /* 채팅방 로딩 */
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
  
  const handleOpenSearch = () => {
    
  };

  const {pressProps} = usePress({
    onPress: handleOpenSearch,
  });

  useEffect(() => {
    setCommandKey(isAppleDevice() ? 'command' : 'ctrl');
  }, []);

  return (
    <ListboxWrapper>
      <div className='chat-header'>
        <Tooltip content='Close' placement='right'>
          <DrawerIcon className='btn-aside md:size-6 size-7' onClick={onClose} />
        </Tooltip>
        <Tooltip content='New' placement='right'>
          <EditDocumentIcon className='btn-aside md:size-6 size-7'
          onClick={() => {
            setStep(ChatStep.NEW);
            onClose();}}
          />
        </Tooltip>
      </div>
      <Button
      aria-label='Quick search'
      className='border-none justify-start md:text-medium text-lg'
      endContent={
        <Kbd
        className='hidden text-xs rounded-full py-0.5 px-1.5 lg:inline-block'
        keys={commandKey}
      >
        K
      </Kbd>
      }
      startContent={
        <SearchLinearIcon
          className='text-base text-default-400 pointer-events-none flex-shrink-0'
          size={16}
          strokeWidth={2}
        />
      }
      onPress={handleOpenSearch}
      variant='bordered'
    >
      Search
    </Button>
      {/* <Input
        className='px-3'
        aria-label='Search'
        placeholder='Search chats...'
        value={searchQuery}
        onValueChange={setSearchQuery}
        variant='bordered'
        radius='full'
        startContent={
        <SearchLinearIcon
          className='text-base text-default-400 pointer-events-none flex-shrink-0'
          size={16}
          strokeWidth={2}
        />
        }
      /> */}
      <div className='flex-1 overflow-auto'>
        <Listbox aria-label='Chats'>
          {filteredChatrooms.map((room) => (
            <ListboxItem key={room.id} onClick={() => onSelect(room)}>
              <Skeleton className='rounded-full' isLoaded={!!room.participants}>
                {room.participants
                  .filter((user: User) => user.id !== myId)
                  .map((user: User) => (
                  <div key={user.id} className='rooms flex items-center md:min-h-[3rem] min-h-[4rem]'>
                    <Avatar
                      showFallback
                      name={user.name}
                      src={user.profile}
                      alt={user.name}
                      className='aside-avatar flex-shrink-0'
                    />
                    <div className='flex flex-col justify-center gap-1 px-2 overflow-hidden'>
                      <div className='truncate md:text-[0.9rem] text-[1.1rem]'>{user.name}</div>
                      <div
                        className='md:text-[0.8rem] text-[0.9rem] leading-tight max-h-[2.5rem] overflow-hidden text-default-400'
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                      {room.lastMessage}
                      </div>
                    </div>
                  </div>
                  ))}
              </Skeleton>
            </ListboxItem>
          ))}
        </Listbox>
      </div>
      <footer className='chat-footer'>
        <div className='flex items-center gap-5 md:text-md text-lg font-semibold'>
          <Avatar
            showFallback
            name={user?.name}
            src={user?.profile}
            alt={user?.name}
            className='size-9'
          />
          {user?.name}
        </div>
        <div className='flex-[2] flex justify-end'>
          <AuthButton initUser={user} />
        </div>
      </footer>
    </ListboxWrapper>
  );
};

export default RoomList;
