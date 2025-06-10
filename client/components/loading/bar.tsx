import {CircularProgress, Progress} from "@heroui/react";
import React from "react";

export default function Loading() {
  
  return(
    <Progress 
      classNames={{
            base: 'max-w-xs',
            track: 'drop-shadow-md',
            indicator: 'bg-[#7f9cd6]',
            label: 'tracking-wider font-medium text-default-600',
            value: 'text-foreground/60',
      }}
      label='Loading...' value={100} color='secondary' />
  );
}