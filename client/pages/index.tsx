import { useAuth } from "@/context/AuthContext";
import { notoSansKR } from "@/styles/fonts";
import Image from "next/image";
import { useState, useCallback } from "react";
import { IoIosArrowRoundBack, IoLogoGithub, IoIosGlobe } from "react-icons/io";
import { FaRegFileLines } from "react-icons/fa6";
import Login from "./auth/login";
import Chat from "./chat";

export default function Home() {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const onBack = useCallback(() => setShowLogin(false), []);

  if (loading) return <div>Loading...</div>;
  if (user) return <Chat />;

  return (
    <div>
      {showLogin && <IoIosArrowRoundBack onClick={onBack} className='icon' />}
    <div className={`${notoSansKR.className} content-wrapper`}>
      <main className='font-[family-name:var(--font-noto-sans-kr)]'>
        {showLogin ? (
            <Login onBack={onBack} />
        ) : (
          <>
            <Image
              src='/assets/img/main.png'
              alt='iuha'
              width={500}
              height={500}
              className='pt-8 px-4'
            />
            <video
              className='video-background'
              autoPlay
              loop
              muted
              playsInline
            >
              <source src='gradient.mp4' type='video/mp4' />
            </video>
            <h1 className='text-[clamp(5rem,5vw,4rem)] font-semibold tracking-[-.01em] font-[family-name:var(--font-geist-sans)] text-black'>
              iuha
            </h1>
            <button className='btn w-1/4' onClick={() => setShowLogin(true)}>
              로그인
            </button>
            <p className='text-[clamp(1.5rem,2vw,2rem)] font-medium flex flex-col tracking-[-.01em] text-black'>
              <span>실시간 채팅 앱.</span>
              <span>언제든 모두와 대화하세요.</span>
            </p>
            <footer className='flex gap-4 mt-8 text-black'>
              <a href='/' target='_blank' rel='noopener noreferrer'>
                <FaRegFileLines /> Portfolio
              </a>
              <a href='https://github.com/iuhapark' target='_blank' rel='noopener noreferrer'>
                <IoLogoGithub /> GitHub
              </a>
              <a href='https://iuhapark.github.io/' target='_blank' rel='noopener noreferrer'>
                <IoIosGlobe /> Blog
              </a>
            </footer>
          </>
        )}
      </main>
    </div>
    </div>
  );
}
