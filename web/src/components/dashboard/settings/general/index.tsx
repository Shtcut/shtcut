/** @format */
'use client';

import { Button, Dict, Input, Label } from '@shtcut-ui/react';
import ImageSkeleton from '@shtcut/components/image-skeleton';
import React, { useRef } from 'react';
import { Camera } from 'lucide-react';
import { useLinksManager } from '@shtcut/hooks/use-links-manager';
import useGeneralState from '@shtcut/hooks/general-state';
import StarLoader from '@shtcut/components/loader/star-loader';

const GeneralScreen = ({ onOpenModal, user }: { onOpenModal: () => void; user: Dict }) => {
    const {
        actions: { handleAvatarImageChange },
        state: { imgError, isUploadingMainImage }
    } = useLinksManager();
    const { profileImage } = useGeneralState();
    const fileInputRef = useRef<any>(null);

    const handleTriggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div>
            <section className="flex gap-4">
                <div className="w-full">
                    <section className="h-10 flex items-center px-4 border border-[#e3e3e3] bg-[#f7f7f7] rounded-[4px] justify-between">
                        <h3 className="font-semibold text-sm">Profile</h3>
                    </section>
                    <section className="flex border border-[##E3E3E3] flex-col gap-3 mt-5 rounded-[4px] p-4">
                        <section>
                            <Label className="text-xs">Full Name</Label>
                            <Input
                                placeholder="Stephen Adebayo"
                                className="mt-2"
                                defaultValue={user?.firstName + ' ' + user?.lastName}
                                disabled
                            />
                        </section>
                        <section>
                            <Label className="text-xs">Email</Label>
                            <Input placeholder="Stephen Adebayo" className="mt-2" defaultValue={user?.email} disabled />
                        </section>
                        <Button className="h-9 bg-transparent w-fit text-xs" variant={'outline'} onClick={onOpenModal}>
                            Edit Profile
                        </Button>
                    </section>
                    <section className="h-10 mt-4 flex items-center px-4 border border-[#e3e3e3] bg-[#f7f7f7] rounded-[4px]">
                        <h3 className="font-semibold text-sm">Account</h3>
                    </section>
                    <section className="bg-background p-4 border border-[#e3e3e3] mt-4 rounded-[4px]">
                        <h3 className="text-sm">Delete Account</h3>
                        <p className="text-xs text-[#A4A4A4] font-medium mt-2">
                            Permanently delete your Shtcut account, all of your workspaces, links and their respective
                            stats. This action cannot be undone - please proceed with caution.
                        </p>
                        <Button className="mt-6 text-xs h-8 w-36 bg-[#EF1D1D]">Delete</Button>
                    </section>
                </div>
                <div className="border p-4 rounded-[4px] border-[#e3e3e3] h-fit w-1/2">
                    <h3 className="font-semibold text-sm">Your Avatar</h3>
                    <section className="flex justify-center mt-6">
                        <section className="relative w-36 h-36">
                            <label
                                htmlFor="avatar-upload"
                                className="cursor-pointer rounded-lg items-center flex-col justify-center w-full h-full"
                            >
                                {isUploadingMainImage ? (
                                    <StarLoader />
                                ) : profileImage?.preview ? (
                                    <img
                                        src={profileImage.preview}
                                        className="w-full h-full rounded-full object-cover"
                                        alt="User avatar"
                                    />
                                ) : (
                                    <ImageSkeleton />
                                )}
                            </label>

                            <input
                                id="avatar-upload"
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleAvatarImageChange}
                            />

                            <section
                                className="bg-[#E3E3E3] absolute w-9 h-9 flex bottom-2 justify-center left-[100px] items-center rounded-full"
                                onClick={handleTriggerFileInput}
                            >
                                <Camera color="black" size={18} />
                            </section>

                            {imgError && <p className="text-xs text-red-500 mt-2">{imgError}</p>}
                        </section>
                    </section>

                    <p className="text-xs font-medium mt-4 text-[#808080]">
                        Square image recommended. Accepted file types: .png, .jpg. Max file size: 2MB.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default GeneralScreen;
