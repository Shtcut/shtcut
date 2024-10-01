import { Card, Input } from '@shtcut-ui/react';
import { PostContentProps } from '@shtcut/types/types';
import Image from 'next/image';
import React from 'react';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { MdOutlineFileDownload } from 'react-icons/md';

const PinInterestPreview = ({ postText, selectedImages }: PostContentProps) => {
    return (
        <Card className="shadow-sm">
            <section>
                <div className="flex items-center gap-2 border-b p-4">
                    <Image src={'/social/pininterest-outline.png'} alt="" width={16} height={16} />
                    <p className="text-xs font-medium">Pinterest</p>
                </div>
                <Card className="m-4 shadow-sm flex  ">
                    {selectedImages && selectedImages.length > 0 && (
                        <section className="w-1/2">
                            <Image
                                src={URL.createObjectURL(selectedImages[0])}
                                alt="Preview"
                                className="w-full rounded-l-xl h-96 object-cover"
                                height={0}
                                width={0}
                            />
                        </section>
                    )}
                    <div className="w-1/2  relative">
                        <section className="flex p-2 items-center justify-between">
                            <div className="flex items-center gap-x-2">
                                <IoEllipsisHorizontal className="cursor-pointer" />
                                <MdOutlineFileDownload className="cursor-pointer" />
                            </div>
                            <div className="w-12 h-8 flex items-center justify-center rounded-full font-semibold bg-[#E60023] cursor-pointer text-white text-xs">
                                Save
                            </div>
                        </section>
                        <p className="text-[10px] p-2 w-full break-words font-medium mt-2">
                            {postText
                                ? postText
                                : ' We built Safari to be the best browser for your Mac, iPhone and iPad Built-in privacy features.🎊🎊🎊🎊'}
                        </p>
                        <section className="mt-2 p-2 relative">
                            <div className="w-8 mr-2 h-8 flex items-center justify-center rounded-full font-semibold bg-[#e9e9e9] float-left cursor-pointer  text-xs">
                                A
                            </div>
                            <div className="">
                                <p className="text-[10px] font-semibold">Adebayo Stephen</p>
                                <p className="text-[10px] ">1 followers</p>
                            </div>
                        </section>
                        <section className="absolute flex flex-col gap-y-2 p-2 ">
                            <p className="text-xs font-semibold">Comments</p>
                            <p className="text-[10px] text-[#767676]">
                                No comments yet! Add one to start the conversation.
                            </p>
                            <section className="relative">
                                <Input
                                    className="shadow-none rounded-full text-[10px] focus-visible:ring-0"
                                    placeholder="Add a comment"
                                />
                                <div className="absolute cursor-pointer top-1 right-2">😃</div>
                            </section>
                        </section>
                    </div>
                </Card>
            </section>
        </Card>
    );
};

export default PinInterestPreview;
