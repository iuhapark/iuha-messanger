'use client'

import Messages from "./messages"
import TextArea from "./text-area"

export default function EmptyChatView() {
  
  return (
    <div className='chat-room text-center text-gray-500 dark:text-gray-400'>
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
