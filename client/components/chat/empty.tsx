'use client'

import { Tooltip } from "@heroui/react";
import { DrawerIcon, PrevArrowIcon } from "../icons/icons";

export default function EmptyChatView({ isOpen, onOpen }: { isOpen: boolean; onOpen: () => void; }) {
  
  return (
    <div className='chat-room text-center text-gray-500 dark:text-gray-400'>
    <div className='message-header'>
    {!isOpen && (
      <div className='md:hidden block'>
        <Tooltip content='Open' placement='right'>
          <button className='btn-aside pl-3' onClick={onOpen}>
            <DrawerIcon className='md:size-6 size-7' />
          </button>
        </Tooltip>
      </div>
    )}
    </div>
    <div className='flex flex-col justify-center h-full gap-4'>
        <h1 className='text-xl font-semibold'>Start chatting!</h1>
        <h2 className='text-sm text-muted-foreground'>
          Select a friend or chat room from the list.
        </h2>
      </div>
        {/* <Messages roomId={''} />
        <TextArea id={''} participants={[]} onRefresh={() => {}}/> */}
    </div>
  )
}
