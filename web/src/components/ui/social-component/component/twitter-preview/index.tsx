import { Card } from '@shtcut-ui/react';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import { MessageCircle, Repeat2, Heart, Upload } from 'lucide-react';
import { PostContentProps } from '@shtcut/types/types';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { IoStatsChart } from 'react-icons/io5';

const TwitterPreviewCard = ({ postText, selectedImages }: PostContentProps) => {
    const ReusableIcons = ({ icon, description }: { icon: ReactNode; description?: string }) => {
        return (
            <div className="flex cursor-pointer items-center gap-2">
                <div className="cursor-pointer">{icon}</div>
                <p className="text-xs text-[#6D6D6D]">{description}</p>
            </div>
        );
    };
    return (
        <Card className="shadow-sm">
            <section>
                <div className="flex items-center gap-2 border-b p-4">
                    <Image src={'/social/Twitter.png'} alt="" width={16} height={16} />
                    <p className="text-xs font-medium">Twitter</p>
                </div>

                <section className="p-4">
                    <Image
                        src={'/social/apt.png'}
                        width={30}
                        height={30}
                        className="rounded-full h-[30px] float-left "
                        alt=""
                        unoptimized
                    />
                    <section className="ml-12 flex flex-col gap-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-x-1">
                                <p className="text-xs font-bold">Elon Musk</p>
                                <Image src={'/images/tag.png'} width={10} height={10} className="" alt="" unoptimized />
                                <span className="text-[10px] text-[#8E8E93]">@Sarahwt</span>
                                <span className="text-xs text-[#8E8E93]">May 29</span>
                            </div>
                            <IoEllipsisHorizontal />
                        </div>
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
                        <section className="flex justify-between mt-4 items-center">
                            <ReusableIcons icon={<MessageCircle size={14} color="#6D6D6D" />} description="408" />
                            <ReusableIcons icon={<Repeat2 size={14} color="#6D6D6D" />} description="902" />
                            <ReusableIcons icon={<Heart size={14} color="#6D6D6D" />} description="4.5k" />
                            <ReusableIcons icon={<IoStatsChart size={14} color="#6D6D6D" />} description="22.4k" />
                            <ReusableIcons icon={<Upload size={14} color="#6D6D6D" />} />
                        </section>
                    </section>
                </section>
            </section>
        </Card>
    );
};

export default TwitterPreviewCard;
