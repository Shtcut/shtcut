'use client';

import { Button, Card, Modal } from '@shtcut-ui/react';
import React, { useState } from 'react';
import { Check, ChevronUp, ChevronDown, Info } from 'lucide-react';
import { social_media } from '@shtcut/_shared/data';
import Image from 'next/image';
import {
    FaceBookPreview,
    InstagramPreview,
    PinInterestPreview,
    TwitterPreviewCard,
    YoutubePreview,
    AddLabels,
    NewHashTag,
    HashTag,
    CreateNewLabel,
    GalleryPreview,
    SchedulePostModal
} from '../component';
import PostContent from '../component/post-content';
import LinkedinPreview from '../component/linkeldln-preview';
import TiktokPreview from '../component/tiktok-preview';

import { SocialMedia } from '@shtcut/types/types';
import ManagePostAction from './manage-post-action';

const CreatePostComponent = () => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState('');
    const [postText, setPostText] = useState('');
    const [showSocial, seShowSocial] = useState(false);
    const [showPost, setShowPost] = useState(false);
    const [activeSocialId, setActiveSocialId] = useState<string | null>(null);
    const [selectedSocial, setSelectedSocial] = useState<SocialMedia | null>(null);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostText(e.target.value);
    };

    const handleOpen = (open: boolean, modalType: string) => {
        setShowModal(open);
        setType(modalType);
    };
    const handleSocialClick = (id: string, social: any) => {
        setActiveSocialId((prevId) => (prevId === id ? null : id));
        setSelectedSocial(social);
    };

    return (
        <div className="">
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-[#2B2829] text-xl">Create Post</h1>
                <div className="flex items-center gap-4">
                    <Button variant={'outline'} className="h-9 border border-[#4D4D4D] bg-white text-xs rounded">
                        Save Draft
                    </Button>
                    <ManagePostAction openSchedule={() => handleOpen(true, 'schedule')} />
                </div>
            </div>

            <section>
                <Card className=" shadow-sm p-5  mt-6">
                    <section className="flex justify-between items-center  px-4">
                        {social_media.map((_sc) => (
                            <section
                                key={_sc.id}
                                className="relative cursor-pointer flex flex-col items-center"
                                onClick={() => handleSocialClick(_sc.id, _sc)}
                            >
                                {_sc.isActive && (
                                    <section className="bg-green-500 w-4 h-4 absolute top-[-10px] right-[-8px] rounded-full flex justify-center items-center">
                                        <Check className=" text-white" size={10} />
                                    </section>
                                )}
                                <Image src={_sc.default_img[0]} width={30} height={30} alt={_sc.name} />
                                <p
                                    className={`text-xs mt-2 font-medium ${_sc.isActive ? 'text-black' : 'text-[#CCCBCB]'} `}
                                >
                                    {_sc.name}
                                </p>
                                {activeSocialId === _sc.id && (
                                    <section className="absolute top-6 z-503">
                                        <Card className="shadow-sm">
                                            <div className="mt-2  w-80 p-2">
                                                <Info color="#FFA500" size={18} className="float-left" />
                                                <p className="text-xs pl-6">
                                                    You have not yet made a connection to {selectedSocial?.name}.
                                                    Publishing will need to be done manually until you&apos;ve created a
                                                    connection. Please update your connections.
                                                </p>
                                            </div>

                                            <section className="flex justify-end pb-4 px-4 ">
                                                <Button className="text-xs h-9 bg-primary-0">
                                                    Connect {selectedSocial?.name}
                                                </Button>
                                            </section>
                                        </Card>
                                    </section>
                                )}
                            </section>
                        ))}
                    </section>
                </Card>
            </section>
            <Card className="mt-8 shadow-sm w-full">
                <div className={`flex items-center  ${showPost ? 'border-b' : ''} px-10 py-4 justify-between`}>
                    <h3 className="font-medium">Post Content</h3>
                    {showPost ? (
                        <ChevronDown className="cursor-pointer" onClick={() => setShowPost(!showPost)} />
                    ) : (
                        <ChevronUp className="cursor-pointer" onClick={() => setShowPost(!showPost)} />
                    )}
                </div>
                <section className="bg-[#FAFAFA] rounded-b-xl">
                    {showPost && (
                        <PostContent
                            postText={postText}
                            handleTextChange={handleTextChange}
                            setSelectedImages={setSelectedImages}
                            selectedImages={selectedImages}
                            handleOpen={handleOpen}
                            setPostText={setPostText}
                        />
                    )}
                </section>
            </Card>

            <Card className="mt-8 shadow-sm">
                <div className={`flex items-center ${showSocial ? 'border-b' : ''} px-10 py-4 justify-between`}>
                    <h3 className="font-medium">Social Media Preview</h3>
                    {showSocial ? (
                        <ChevronDown className="cursor-pointer" onClick={() => seShowSocial(!showSocial)} />
                    ) : (
                        <ChevronUp className="cursor-pointer" onClick={() => seShowSocial(!showSocial)} />
                    )}
                </div>
                {showSocial && (
                    <section className="bg-[#FAFAFA] ">
                        <div className="grid px-10 py-8 grid-cols-2 w-full gap-6 ">
                            <TwitterPreviewCard postText={postText} selectedImages={selectedImages} />
                            <InstagramPreview postText={postText} selectedImages={selectedImages} />
                            <TiktokPreview postText={postText} selectedImages={selectedImages} />
                            <LinkedinPreview postText={postText} selectedImages={selectedImages} />
                            <FaceBookPreview postText={postText} selectedImages={selectedImages} />
                            <PinInterestPreview postText={postText} selectedImages={selectedImages} />
                            <YoutubePreview postText={postText} selectedImages={selectedImages} />
                        </div>
                    </section>
                )}
            </Card>

            <Modal
                setShowModal={setShowModal}
                showModel={showModal}
                onClose={() => setShowModal(false)}
                className={`relative bg-white ${type === 'gallery' ? 'max-w-[35rem]' : type === 'schedule' ? 'max-w-96' : ''}  p-6`}
            >
                <div>
                    {type === 'hash' && <HashTag handleOpen={handleOpen} handleClose={() => handleOpen(false, '')} />}
                    {type === 'new-hash' && (
                        <NewHashTag handleOpen={handleOpen} handleClose={() => handleOpen(false, '')} />
                    )}
                    {type === 'add-labels' && (
                        <AddLabels handleClose={() => handleOpen(false, '')} handleOpen={handleOpen} />
                    )}
                    {type === 'create-labels' && <CreateNewLabel handleClose={() => handleOpen(false, '')} />}
                    {type === 'gallery' && <GalleryPreview handleClose={() => handleOpen(false, '')} />}
                    {type === 'schedule' && <SchedulePostModal handleClose={() => handleOpen(false, '')} />}
                </div>
            </Modal>
        </div>
    );
};

export default CreatePostComponent;
