import React from 'react';

export function PageLayout({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <>
      <div className="w-screen min-h-screen fixed -z-[1] flex justify-center p-[120px_24px_160px_24px] pointer-events-none dart:invert">
        <div
          className={
            className
              ? className
              : 'bg-[radical-gradient(circle, rgba(0,0,0,0.5)0, #ffffff_100%)] absolute content-[""] z-[2] w-full h-full top-0'
          }
        >
          <div className={"content-[''] bg-grid-pattern z-[1] absolute w-full h-full top-0 opacity-[0.4] invert-[1]"} />
          {/* <div className="z-[3] w-full max-w-[640px] bg-radial-gradient-pattern absolute  h-full blur-[100px] saturate-[150%] top-[80px] opacity-[0.15]" /> */}
          <div className="z-10 pointer-events-auto" />
        </div>
      </div>
      {children}
    </>
  );
}
