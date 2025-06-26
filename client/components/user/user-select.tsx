'use client';

import { useEffect, useState, useMemo } from "react";
import api from "@/lib/api";
import { User, UserListProps } from "@/types/index";
import { ChatStep } from "@/types/data";
import { parseAPIError } from "@/utils/error";
import { useAuth } from "@/context/authContext";
import { Listbox, ListboxItem, Avatar, Modal, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div>
    {children}
  </div>
);
type Props = UserListProps & {
  isOpen: boolean;
  onClose: () => void;
};

const UserSelect = ({ setStep, onSelect, isOpen, onClose }: Props) => {
  const [receivers, setReceivers] = useState<User[]>([]);
  const { user } = useAuth();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user || !user.id) return;
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users/user-list');
        setReceivers(res.data);
      } catch (err) {
        parseAPIError(err);
      }
    };
    fetchUsers();
  }, []);

  const handleSelect = async (userId: string) => {
    const receiver = receivers.find((u) => u.id === userId);
    if (!receiver) return;
    try {
      const { data } = await api.post(`/chat/save`, {
        name: receiver.name,
        participants: [{ id: receiver.id }],
      });
      onSelect(data);
      setStep(ChatStep.READY);
      onClose();
    } catch (err) {
      parseAPIError(err);
    }
  };

  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onClose}
      backdrop='transparent'
      style={{
        backgroundColor: 'var(--aside-background)',
      }}
    >
      <ModalContent>
      <ModalHeader className="flex flex-col gap-1">
        Select a friend
      </ModalHeader>
      <ModalBody>
        <ListboxWrapper>
          <Listbox
            classNames={{
              list: 'overflow-auto',
            }}
            items={receivers}
            label='Start chat with'
            selectionMode='single'
            selectedKeys={selectedKeys}
            onSelectionChange={(keys) => {
              setSelectedKeys(keys as Set<string>);
              const [selectedId] = Array.from(keys);
              handleSelect(String(selectedId));
            }}
            variant='flat'
          >
            {(item) => (
              <ListboxItem key={item.id} textValue={item.name}>
                <div className='flex gap-2 items-center'>
                  <Avatar alt={item.name} className='flex-shrink-0' size='sm' src={item.profile} />
                  <div className='flex flex-col'>
                    <span className='text-small'>{item.name}</span>
                    <span className='text-tiny text-default-400'>{item.username}</span>
                  </div>
                </div>
              </ListboxItem>
            )}
          </Listbox>
        </ListboxWrapper>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserSelect;
