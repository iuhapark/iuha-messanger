'use client';
import {Card} from "@heroui/react";

export default function SingleCarousel() {
  return (
    <>
      <div>
        <div className='hidden md:block md:max-w-screen md:w-screen md:px-40'>
          <Card>
            <video
              autoPlay
              loop
              muted
              playsInline
              className='z-0 w-full h-full object-cover'
              src='/assets/feature.mov'
            />
          </Card>
        </div>
      </div>
      <div className='carousel-container md:hidden'>
        <div className='carousel-visual md:max-w-screen md:w-screen md:px-40'>
          <Card className=''>
            <video
              autoPlay
              loop
              muted
              playsInline
              className='z-0 w-full h-full object-cover'
              src='/assets/feature.mov'
            />
          </Card>
        </div>
      </div>
    </>
  );
}
