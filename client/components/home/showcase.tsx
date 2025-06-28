'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CarouselList from "@/components/card/carousel-list";
import { subtitle, title } from "@/components/primitives";
import clsx from "clsx";
import { Spacer } from "@heroui/react";

export default function Showcase() {
  const cardRef = useRef(null);
  const cardTextRef = useRef(null);

  const cardInView = useInView(cardRef, { amount: 0.1, once: false });
  const cardTextInView = useInView(cardTextRef, { amount: 0.1, once: false });

  return (
    <>
      <section className='flex flex-col items-center justify-center px-4 md:px-0'>
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 50 }}
          animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <CarouselList />
        </motion.div>
      </section>
      <motion.div
        ref={cardTextRef}
        className='text-center mt-16 px-6'
        initial={{ opacity: 0, y: 50 }}
        animate={cardTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className={clsx('z-[1]', title())}>Connect with anyone, anytime, anywhere.</span>
      </motion.div>
    </>
  );
}
