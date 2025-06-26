import {CircularProgress} from "@heroui/react";
import React from "react";

export default function Loading() {
  
  return(
  <div className='loading'>
    <CircularProgress aria-label='Loading...' size='sm' color='default'
/>
  </div>
  );
}
