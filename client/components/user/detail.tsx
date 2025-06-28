'use client';

import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button, Modal, ModalContent} from "@heroui/react";
import { User } from "@/types";

const Detail = ({ user, isOpen, onClose  }: { user: User; isOpen: boolean;
  onClose: () => void; }) => {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Modal
      size='xs'
      isDismissable={true}
      isKeyboardDismissDisabled={false}
      isOpen={isOpen}
      onOpenChange={onClose}
      backdrop='transparent'
      className='overflow-auto'
      placement='bottom'
      style={{
        backgroundColor: 'var(--aside-background)',
      }}
    >
    <ModalContent>
    <Card>
      <CardHeader className='justify-between'>
        <div className='flex gap-4'>
          <Avatar isBordered radius='full' size='md' src={user.profile} />
          <div className='flex flex-col gap-1 items-start justify-center'>
            <h4 className='text-small font-semibold text-default-600'>{user.name}</h4>
            <h5 className='text-small tracking-tight text-default-400'>@{user.username}</h5>
          </div>
        </div>
        <Button
          color='primary'
          radius='full'
          size='sm'
          variant={isFollowed ? 'bordered' : 'solid'}
          className={isFollowed ? 'bg-transparent text-foreground border-default-200' : ''}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
      </CardHeader>
      <CardBody className='px-3 py-0 text-small text-default-400'>
        <p>This is a user of iuha.</p>
      </CardBody>
      <CardFooter className='gap-3'>
        <div className='flex gap-1'>
          <p className='font-semibold text-default-400 text-small'>0</p>
          <p className='text-default-400 text-small'>Following</p>
        </div>
        <div className='flex gap-1'>
          <p className='font-semibold text-default-400 text-small'>0</p>
          <p className='text-default-400 text-small'>Followers</p>
        </div>
      </CardFooter>
    </Card>
    </ModalContent>
    </Modal>
  );
}

export default Detail;