'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SingleCarousel from "@/components/card/carousel";
import { subtitle, title } from "@/components/primitives";
import clsx from "clsx";

export default function Feature() {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  const imageInView = useInView(imageRef, { amount: 0.05, once: false });
  const textInView = useInView(textRef, { amount: 0.05, once: false });

  return (
    <>
      <motion.div
        ref={imageRef}
        initial={{ opacity: 0, y: 50 }}
        animate={imageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <SingleCarousel />
      </motion.div>

      <motion.div
        ref={textRef}
        className='text-center my-16 px-6'
        initial={{ opacity: 0, y: 50 }}
        animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className={clsx('z-[1]', title())}>All about messaging</span>
        <br />
        <span className={clsx('z-[1]', subtitle())}>A place to connect, share, and be heard.</span>
      </motion.div>
    </>
  );
}
