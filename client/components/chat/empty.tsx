'use client'

export default function EmptyChatView() {
  
  return (
    <div className='flex items-center justify-center text-center px-6 py-10 text-gray-500 dark:text-gray-400'>
      <div className='space-y-4'>
        <h1 className='text-xl font-semibold'>Start chatting!</h1>
        <h2 className='text-sm text-muted-foreground'>
          Select a friend or chat room from the list.
        </h2>
      </div>
    </div>
  )
}
