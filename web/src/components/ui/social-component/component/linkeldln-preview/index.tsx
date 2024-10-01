import { Card, Separator } from '@shtcut-ui/react';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import { Repeat, ThumbsUp } from 'lucide-react';
import { PostContentProps } from '@shtcut/types/types';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { IoIosSend } from 'react-icons/io';
import { BsChatText } from 'react-icons/bs';

const LinkedinPreview = ({ postText, selectedImages }: PostContentProps) => {
    const ReusableIcons = ({ icon, description }: { icon: ReactNode; description?: string }) => {
        return (
            <div className="flex cursor-pointer items-center gap-2">
                <div className="cursor-pointer">{icon}</div>
                <p className="text-xs">{description}</p>
            </div>
        );
    };
    return (
        <Card className="shadow-sm">
            <section>
                <div className="flex items-center gap-2 border-b p-4">
                    <Image src={'/social/linkedin.png'} alt="" width={16} height={16} />
                    <p className="text-xs font-medium">Linkedin</p>
                </div>
                <section className="p-4 flex flex-col gap-3">
                    <section className="relative">
                        <div>
                            <Image
                                src={'/social/apt.png'}
                                width={30}
                                height={30}
                                className=" rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5  h-[30px]  "
                                alt=""
                                unoptimized
                            />
                        </div>
                        <section className="flex absolute top-0 justify-between w-full ">
                            <div className="w-full ml-11">
                                <p className="text-xs font-bold">Elon Musk</p>
                                <p className="text-[10px]">Product designer at revolute</p>
                                <p className="text-[10px]">1w</p>
                            </div>
                            <IoEllipsisHorizontal />
                        </section>

                        <section className="flex flex-col gap-2 mt-6">
                            <p className="text-[13px] w-full break-words font-medium">
                                {postText
                                    ? postText
                                    : ' We built Safari to be the best browser for your Mac, iPhone and iPad Built-in privacy features.🎊🎊🎊🎊'}
                            </p>
                            <p className="text-[13px] text-primary-0 mt-2">#Technology #Evolution #iPhones #Payment</p>
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
                            <section className="flex mt-3 gap-y-2 flex-col w-full">
                                <section className="flex items-center justify-between">
                                    <section className="flex items-center gap-x-3">
                                        <div className="flex items-center">
                                            <Image
                                                src={'/images/thumbs.png'}
                                                width={20}
                                                height={20}
                                                className="rounded-full"
                                                alt=""
                                                unoptimized
                                            />
                                            <Image
                                                src={'/images/love.png'}
                                                width={20}
                                                height={20}
                                                className="rounded-full  "
                                                alt=""
                                                unoptimized
                                            />
                                        </div>
                                        <p className="text-xs text-[#606163] font-medium">1025</p>
                                    </section>
                                    <div className="text-xs text-[#606163] font-medium">
                                        <p>753 comments • 234 shares</p>
                                    </div>
                                </section>
                                <Separator className=" w-full" />
                                <section className="flex justify-between  items-center">
                                    <ReusableIcons icon={<ThumbsUp size={14} color="#6A6A6A" />} description="Like" />
                                    <ReusableIcons
                                        icon={<BsChatText size={14} color="#6D6D6D" />}
                                        description="Comment"
                                    />
                                    <ReusableIcons icon={<Repeat size={14} color="#6D6D6D" />} description="Repost" />

                                    <ReusableIcons icon={<IoIosSend size={14} color="#6D6D6D" />} description="Send" />
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </Card>
    );
};

export default LinkedinPreview;
