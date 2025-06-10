import {CircularProgress, Progress} from "@heroui/react";
import React from "react";

export default function Loading() {
  
  return(
  <div className='loading-overlay'>
    <CircularProgress aria-label="Loading..."
      classNames={{
              svg: "w-36 h-36 drop-shadow-md",
              indicator: "#7f9cd6",
              track: "stroke-white/10",
            }}
            showValueLabel={true}
            strokeWidth={6}
    />
  </div>
  );
}
