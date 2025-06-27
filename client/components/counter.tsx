'use client';

import { useState } from "react";
import { Button } from "@heroui/button";
import { HeartFilledIcon } from "./icons/icons";

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <Button 
      className='flex gap-0.5 items-center h-7 border-1 border-default-400 rounded-full text-default-600 dark:text-default-500 bg-default-200'
      startContent={<HeartFilledIcon className='text-danger' />}
      onPress={() => setCount(count + 1)}>
      {count}
    </Button>
  );
};
