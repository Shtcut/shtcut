import { Button, Card, Separator } from '@shtcut-ui/react';
import { PostContentProps } from '@shtcut/types/types';
import { Bookmark, Check, ThumbsDown, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { RiShareForwardLine } from 'react-icons/ri';

const YoutubePreview = ({ postText, selectedImages }: PostContentProps) => {
    const ReusableComponent = ({ names, icon }: { names: string; icon: ReactNode }) => {
        return (
            <section className="bg-black/5 w-16 h-8 justify-center cursor-pointer flex items-center gap-x-1 rounded-full">
                <div>{icon}</div>
                <p className="text-[10px] font-semibold">{names}</p>
            </section>
        );
    };
    return (
        <Card className="shadow-sm">
            <section>
                <div className="flex items-center gap-2 border-b p-4">
                    <Image src={'/social/youtube.png'} alt="" width={16} height={16} />
                    <p className="text-xs font-medium">Youtube</p>
                </div>
                <section className="p-4 flex flex-col gap-3">
                    {selectedImages && selectedImages.length > 0 && (
                        <section
                            className={`grid gap-2 ${selectedImages.length > 5 ? 'h-96 ' : 'h-fit'}  overflow-y-auto ${selectedImages.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}
                        >
                            {selectedImages.map((image, index) => (
                                <section key={index}>
                                    <Image
                                        src={URL.createObjectURL(image)}
                                        alt="Preview"
                                        className="w-full rounded-md h-40 object-cover"
                                        height={0}
                                        width={0}
                                    />
                                </section>
                            ))}
                        </section>
                    )}
                    <p className="font-semibold text-sm">Master Spacing in UI Design 💪</p>
                    <section className="">
                        <div className=" ">
                            <Image
                                src={'/social/apt.png'}
                                width={30}
                                height={30}
                                className=" rounded-full   h-[30px] "
                                alt=""
                                unoptimized
                            />
                            <div className="relative bottom-7 left-10">
                                <div className="flex gap-2">
                                    <div>
                                        <div className="flex items-center gap-x-[4px]">
                                            <p className="text-[10px] font-semibold">Jesse Showalter</p>
                                            <div className="h-[10px] w-[0.5px] bg-[#606060] " />
                                            <div className="flex items-center justify-center w-3 h-3 rounded-full bg-[#606060]">
                                                <Check size={6} color="white" />
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-[#606060]">399K subscribers</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <Button className="text-[10px] h-8 w-12 bg-black/5 text-black rounded-full font-semibold hover:text-white">
                                            Join
                                        </Button>
                                        <Button className="text-[10px] h-8 w-16  rounded-full font-semibold">
                                            Subscribe
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <section className="bg-black/5 flex cursor-pointer items-center w-24 rounded-2xl justify-center gap-2 h-8 ">
                                <div className="flex items-center gap-x-1">
                                    <ThumbsUp size={16} />
                                    <span className="text-[10px]">2.1K</span>
                                </div>
                                <div className="h-full w-[0.5px] bg-[#606060] " />
                                <ThumbsDown size={16} />
                            </section>
                            <ReusableComponent names="Share" icon={<RiShareForwardLine size={16} />} />
                            <ReusableComponent names="Save" icon={<Bookmark size={16} />} />
                            <div className="bg-black/5 rounded-full w-8 h-8 flex items-center cursor-pointer justify-center shadow-none">
                                <IoEllipsisHorizontal size={16} />
                            </div>
                        </div>
                    </section>
                    <section className="bg-black/5 rounded-md p-2 ">
                        <p className="text-xs font-medium"> 44K views 5 months ago</p>
                        <p className="text-xs mt-1">
                            Join us in this video as we delve into the art of mastering spacing in UI design. We&apos;ll
                            share key tips and strategies, such as embracing the 8pt grid for consistent and precise
                            spacing, understanding the basics of spacing
                        </p>
                    </section>
                </section>
            </section>
        </Card>
    );
};

export default YoutubePreview;
