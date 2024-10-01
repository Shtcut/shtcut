import { Button, Card, Input } from '@shtcut-ui/react';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import { MessageCircle, Send, Bookmark } from 'lucide-react';
import { PostContentProps } from '@shtcut/types/types';
import { FaUserAlt } from 'react-icons/fa';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { IoIosHeart } from 'react-icons/io';

const InstagramPreview = ({ postText, selectedImages }: PostContentProps) => {
    const ReusableIcons = ({ icon, description }: { icon: ReactNode; description?: string }) => {
        return (
            <div className="flex cursor-pointer items-center gap-2">
                <div className="">{icon}</div>
                <p className="text-xs">{description}</p>
            </div>
        );
    };
    return (
        <Card className="shadow-sm">
            <section>
                <div className="flex items-center gap-2 border-b p-4">
                    <Image src={'/social/instagram.png'} alt="" width={16} height={16} />
                    <p className="text-xs font-medium">Instagram</p>
                </div>

                <section className="p-4">
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
                        <section className="flex absolute top-0  justify-between w-full ">
                            <div className="w-full ml-11">
                                <p className="text-xs font-bold">Elon Musk</p>
                                <p className="text-xs">Sponsored</p>
                            </div>
                            <IoEllipsisHorizontal />
                        </section>
                    </section>
                    {selectedImages && selectedImages.length > 0 && (
                        <section>
                            {selectedImages && (
                                <section className="mt-3 relative ">
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
                                    <div className="bg-black/80 absolute left-2 top-[80%] w-7 h-7 rounded-full flex justify-center items-center">
                                        <FaUserAlt size={14} color="white" />
                                    </div>
                                </section>
                            )}
                        </section>
                    )}
                    <section className="flex justify-between mt-3 items-center">
                        <section className="flex items-center gap-x-2">
                            <ReusableIcons icon={<IoIosHeart size={14} color="#FE0135" />} description="2,456" />
                            <ReusableIcons icon={<MessageCircle size={14} color="#6D6D6D" />} description="408" />
                            <ReusableIcons icon={<Send size={14} color="#6D6D6D" />} />
                        </section>
                        <section>
                            <ReusableIcons icon={<Bookmark size={14} color="#6D6D6D" />} />
                        </section>
                    </section>
                    <p className="text-[13px] w-full break-words font-medium mt-3">
                        {postText
                            ? postText
                            : ' We built Safari to be the best browser for your Mac, iPhone and iPad Built-in privacy features.🎊🎊🎊🎊'}
                    </p>
                    <Button className="text-xs p-0 text-[#808080]" variant={'unstyled'}>
                        View all 16 comments
                    </Button>
                    <section className="relative">
                        <Input
                            placeholder="Add a comment..."
                            className="pl-8 shadow-none border border-none focus-visible:ring-0 "
                        />
                        <section className="absolute top-2 left-2">
                            <Image
                                src={'/social/apt.png'}
                                width={20}
                                height={20}
                                className=" rounded-full   h-[20px]  "
                                alt=""
                                unoptimized
                            />
                        </section>
                    </section>
                    <p className="text-xs text-[#6E6E6E]">30 minutes ago</p>
                </section>
            </section>
        </Card>
    );
};

export default InstagramPreview;
