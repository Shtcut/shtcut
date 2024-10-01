import { Card } from '@shtcut-ui/react';
import Image from 'next/image';
import React from 'react';
import { Music4, Plus } from 'lucide-react';
import { PostContentProps } from '@shtcut/types/types';
import { IoIosHeart } from 'react-icons/io';
import { BsChatDotsFill } from 'react-icons/bs';
import { PiShareFatFill } from 'react-icons/pi';

const TiktokPreview = ({ postText, selectedImages }: PostContentProps) => {
    return (
        <Card className="shadow-sm h-full">
            <section>
                <div className="flex items-center gap-2 border-b p-4">
                    <Image src={'/social/tiktok.png'} alt="Tiktok Icon" width={16} height={16} />
                    <p className="text-xs font-medium">Tiktok</p>
                </div>
                {selectedImages && selectedImages.length > 0 && (
                    <section className="p-4 relative h-full">
                        {selectedImages && selectedImages.length > 0 && (
                            <section>
                                <Image
                                    src={URL.createObjectURL(selectedImages[0])}
                                    alt="Preview"
                                    className="w-full rounded-md h-96 object-cover"
                                    height={0}
                                    width={0}
                                />
                            </section>
                        )}
                        <section className="absolute h-full flex justify-between top-0 px-4 w-full">
                            <div className="w-full flex flex-col justify-end mb-10">
                                <p className="text-white text-[10px] font-semibold">@craig_love</p>
                                <p className="text-white text-[10px] font-semibold w-4/5">
                                    We built Safari to be the best browser for your Mac, iPhone ... more
                                </p>
                                <p className="text-white text-[10px] font-semibold mb-4">
                                    #fyp #satisfying #roadmarking
                                </p>
                                <div className="text-white text-[10px] font-semibold flex items-center gap-x-1">
                                    <Music4 size={10} /> Roddy Roundicch - The Rou
                                </div>
                            </div>
                            <div className=" w-full flex-1 flex flex-col gap-4 items-center justify-end mb-10  pr-8">
                                <section className="w-10 relative h-10">
                                    <Image
                                        src={'/social/apt.png'}
                                        width={40}
                                        height={40}
                                        className=" rounded-full h-[40px] border-2 border-white"
                                        alt="Profile"
                                        unoptimized
                                    />
                                    <section className="absolute top-7 flex justify-center w-full">
                                        <section className="bg-[#EA4359] w-4 h-4 cursor-pointer rounded-full flex items-center justify-center">
                                            <Plus color="white" size={10} />
                                        </section>
                                    </section>
                                </section>
                                <section className="flex flex-col items-center">
                                    <IoIosHeart size={20} color="white" className="cursor-pointer" />
                                    <p className="text-[10px] font-semibold text-white">328.7K</p>
                                </section>
                                <section className="flex flex-col items-center gap-y-1">
                                    <BsChatDotsFill size={20} color="white" className="cursor-pointer" />
                                    <p className="text-[10px] font-semibold text-white">328.7K</p>
                                </section>
                                <section className="flex flex-col items-center">
                                    <PiShareFatFill size={20} color="white" className="cursor-pointer" />
                                    <p className="text-[10px] font-semibold text-white">Share</p>
                                </section>
                                <Image
                                    className="cursor-pointer"
                                    width={26}
                                    height={26}
                                    alt=""
                                    unoptimized
                                    src={'/images/Disc.png'}
                                />
                            </div>
                        </section>
                    </section>
                )}
            </section>
        </Card>
    );
};

export default TiktokPreview;
