
import Landing from "@/components/home/landing";
import Feature from "@/components/home/feature";
import Showcase from "@/components/home/showcase";
import { Spacer } from "@heroui/react";

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center relative'>
      <div
        className='fixed inset-0 z-0 w-full h-full bg-no-repeat bg-cover bg-center opacity-70'
        style={{ backgroundImage: "url('/assets/img/home/main.jpeg')" }}
      />
      <div className='relative z-10 w-full flex flex-col items-center justify-center'>
        <Landing />
        <Feature />
        <Spacer y={40} />
        <Showcase />
      </div>
      <Spacer y={40} />
    </div>
  );
}
