'use client';

import { ChatRoom, User, UserListProps } from "@/types";
import {
  Input,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Avatar
} from "@heroui/react";
import React, { useMemo, useState } from "react";
import { SearchLinearIcon } from "../icons/linear/search";

type Props = UserListProps & {
  isOpen: boolean;
  onClose: () => void;
  rooms: ChatRoom[];
  myId: string;
};

const Search = ({ isOpen, onClose, rooms, myId, onSelect }: Props) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return rooms.slice(0, 3);
    const q = query.toLowerCase();

    return rooms.filter(room => {
      const matchesUser = room.participants
        .filter(u => u.id !== myId)
        .some(user =>
          user.name.toLowerCase().includes(q) ||
          user.username.toLowerCase().includes(q)
        );

      const matchesMsg = room.lastMessage?.toLowerCase().includes(q);
      return matchesUser || matchesMsg;
    });
  }, [rooms, query, myId]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement='center' size='md' className='min-h-[38vh]'>
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader>Search</ModalHeader>
            <ModalBody>
              <Input
                isClearable
                aria-label='Search'
                placeholder='Search chats...'
                variant='bordered'
                radius='full'
                value={query}
                onValueChange={setQuery}
                startContent={
                  <SearchLinearIcon
                    className='text-base text-default-400 pointer-events-none flex-shrink-0'
                    size={16}
                    strokeWidth={2}
                  />
                }
              />
              <Listbox aria-label='Chat Search Result'>
                {filtered.map(room => (
                  <ListboxItem key={room.id} onClick={() => {
                    onSelect(room);
                    close();
                  }}>
                    {room.participants
                      .filter(user => user.id !== myId)
                      .map(user => (
                        <div key={user.id} className='flex items-center gap-3 py-1'>
                          <Avatar src={user.profile} name={user.name} showFallback />
                          <div className='flex flex-col'>
                            <span className='text-sm font-medium'>{user.name}</span>
                            <span className='text-xs text-gray-400 truncate'>{room.lastMessage}</span>
                          </div>
                        </div>
                      ))}
                  </ListboxItem>
                ))}
              </Listbox>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Search;
