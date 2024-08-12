import { Button, Card } from '@shtcut-ui/react';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import Image from 'next/image';
import React from 'react'

const HeroSection = () => {
  return (
      <div>
          <section className="relative max-w-screen-custom mx-auto px-4  pt-28">
              <AnimatedContainer className="flex flex-col items-center gap-y-4">
                  <h1 className="text-4xl sm:text-[50px] sm:w-[80%] sm:leading-[60px] mx-auto text-center font-semibold">
                      Enhance customer experience and make data-driven improvements with powerful features
                  </h1>

                  <div>
                      <p className="text-[#737A8A] w-full  text-center">
                          Transform how you manage and share your links with shtcut – the smarter way to connect.
                      </p>
                      <p className="text-[#737A8A] w-full  text-center">
                          share your links with shtcut – the smarter way to connect.
                      </p>
                  </div>
                  <div className="">
                      <Button className="bg-primary-0 cursor-pointer font-semibold text-xs">COMING SOON</Button>
                  </div>
              </AnimatedContainer>
              <AnimatedContainer className="relative mt-8 cursor-pointer">
                  <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      loading="eager"
                      src="https://img.youtube.com/vi/lIEiJPNYPyM/maxresdefault.jpg"
                      alt="Video Thumbnail"
                      className="w-full h-[450px] rounded-[20px]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 gap-3 rounded-[20px] flex-col">
                      <Card className="w-14 h-14 rounded-full flex justify-center items-center">
                          <Image
                              src={'/images/social-icon.png'}
                              className=""
                              width={20}
                              height={20}
                              alt="social-media"
                          />
                      </Card>
                      <h2 className="text-white text-2xl font-semibold">Survey Creation</h2>
                  </div>
              </AnimatedContainer>
          </section>
      </div>
  );
}

export default HeroSection
