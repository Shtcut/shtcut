'use client';

import { Button, Card, Modal } from '@shtcut-ui/react';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import { Link } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { FiPlayCircle } from 'react-icons/fi';
import ReusableCard from '../../reusable-card';

const LinkManagement = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    return (
        <div className="bg-[#FAFAFA]">
            <section className="relative max-w-screen-custom mx-auto px-4  py-14">
                <AnimatedContainer className="flex flex-col items-center gap-y-4">
                    <h1 className="text-4xl sm:text-[50px]  sm:leading-[60px] mx-auto text-center font-semibold">
                        Link Management
                    </h1>
                    <p className="text-[#737A8A] w-full sm:w-[40rem] text-center">
                        Simplify and organize your digital presence with our robust link management system. Easily
                        create, edit and manage all your links from a single, intuitive dashboard.
                    </p>
                    <div className="flex justify-center items-center gap-x-3">
                        <Button className="bg-primary-0 cursor-pointer text-xs font-semibold ">Start For Free</Button>
                        <Button
                            variant={'outline'}
                            className="border cursor-pointer text-xs border-black font-semibold "
                        >
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
                        src="https://img.youtube.com/vi/1WRj1so9lMU/maxresdefault.jpg"
                        alt="Video Thumbnail"
                        className="w-full h-[450px] rounded-[20px]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 gap-3 rounded-[20px] flex-col">
                        <div
                            onClick={openModal}
                            className="flex items-center gap-2 bg-[#FAFAFA]/50 h-12 w-40 justify-center rounded-full"
                        >
                            <FiPlayCircle size={20} color="white" className="opacity-80" />
                            <p className="text-xs font-semibold text-white">Watch Demo</p>
                        </div>
                    </div>
                </AnimatedContainer>
                <section className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
                    {/* Top Row */}
                    <ReusableCard
                        text="Create a personalized bio link page to showcase all your important links in one place. Ideal for social media profiles, allowing your audience to find everything they need with a single click."
                        title="Intuitive Dashboard"
                        className="md:col-span-1"
                    />
                    <ReusableCard
                        text="Gain valuable insights with our comprehensive analytics tools. Track link performance, monitor user behavior, and optimize your strategies with real-time data"
                        title="Easily Create short links"
                        className="md:col-span-2 "
                        textClassName="w-3/4"
                    />
                    {/* Bottom Row */}
                    <ReusableCard
                        text="Create a personalized bio link page to showcase all your important links in one place. Ideal for social media profiles, allowing your audience to find everything they need with a single click."
                        title="Manage your links"
                        className="md:col-span-1"
                    />
                    <ReusableCard
                        text="Gain valuable insights with our comprehensive analytics tools. Track link performance, monitor user behavior, and optimize your strategies with real-time data"
                        title="Analytics"
                        className="md:col-span-1"
                    />
                    <ReusableCard
                        text="Gain valuable insights with our comprehensive analytics tools. Track link performance, monitor user behavior, and optimize your strategies with real-time data"
                        title="Share Links"
                        className="md:col-span-1"
                    />
                </section>

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
                            src="https://www.youtube.com/embed/1WRj1so9lMU?autoplay=1"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </Modal>
            </section>
        </div>
    );
};

export default LinkManagement;
