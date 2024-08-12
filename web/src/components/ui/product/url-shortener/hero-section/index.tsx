'use client';

import { Button, Card, Modal } from '@shtcut-ui/react';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import Image from 'next/image';
import React, { useState } from 'react';
import { FiPlayCircle } from 'react-icons/fi';
import { Link } from 'lucide-react';

const HeroSection = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <div className="relative max-w-screen-custom mx-auto px-4  pt-28">
            <AnimatedContainer className="flex flex-col items-center gap-y-4">
                <h1 className="text-4xl sm:text-[50px] sm:w-[60%] sm:leading-[60px] mx-auto text-center font-semibold">
                    Powerful features for seamless URL Shortener
                </h1>
                <div>
                    <p className="text-[#737A8A] w-full  text-center">
                        Transform how you manage and share your links with shtcut – the smarter way to connect.
                    </p>
                    <p className="text-[#737A8A] w-full  text-center">
                        share your links with shtcut – the smarter way to connect.
                    </p>
                </div>
                <div className="flex justify-center items-center gap-x-3">
                    <Button className="bg-primary-0 cursor-pointer text-xs font-semibold ">Start For Free</Button>
                    <Button variant={'outline'} className="border cursor-pointer text-xs border-black font-semibold ">
                        Watch a Demo
                    </Button>
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
                        <Link className="text-primary-0" />
                    </Card>
                    <h2 className="text-white text-2xl font-semibold">URL Shortener</h2>
                    <div
                        onClick={openModal}
                        className="flex items-center gap-2 bg-[#FAFAFA]/50 h-12 w-40 justify-center rounded-full"
                    >
                        <FiPlayCircle size={20} color="white" className="opacity-80" />
                        <p className="text-xs font-semibold text-white">Watch Demo</p>
                    </div>
                </div>
            </AnimatedContainer>
            <Modal
                showModel={showModal}
                setShowModal={setShowModal}
                onClose={closeModal}
                showCloseIcon={true}
                className="w-full h-full max-w-screen-lg max-h-[30rem]"
            >
                <div className="relative w-full h-full">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/lIEiJPNYPyM?autoplay=1"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </Modal>
        </div>
    );
};

export default HeroSection;
