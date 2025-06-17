import Image from 'next/image';
import React, { ReactNode } from 'react';
import { Image as LucideImage } from 'lucide-react';
import { LinkBioDataType } from '@shtcut/types/link';
import useGeneralState from '@shtcut/hooks/general-state';
const LinkBioFrameComponent = ({ linksBio }: { linksBio: LinkBioDataType[] }) => {
    const { title, description, profileImage } = useGeneralState();

    const ReusableComponent = ({ icons, name }: { name: string; icons: ReactNode }) => {
        return (
            <section className="flex border-b p-2 gap-2 items-center bg-[#FFE8F0] rounded-md">
                <div> {icons}</div>
                <p className="text-[10px]">{name}</p>
            </section>
        );
    };
    return (
        <div className=" mt-4 w-full p-4">
            <div className="bg-[#FFE8F0] rounded-md h-40 w-full">
                <div className="flex flex-col h-full justify-center items-center">
                    {profileImage ? (
                        <Image alt="" src={profileImage.preview} width={80} height={60} className="rounded-md" />
                    ) : (
                        <section className="h-20 w-20 rounded-md border bg-white shadow-sm flex justify-center items-center">
                            <LucideImage color="#B5B3B3" size={40} />
                        </section>
                    )}
                    <p className="text-sm font-medium mt-2"> {title ? String(title) : 'Name'}</p>

                    <p className="text-xs ">{description ? (description as string) : 'Job title'}</p>
                </div>
            </div>
            {linksBio && linksBio.length > 0 ? (
                <section className="flex flex-col mt-4 gap-2">
                    {linksBio.map((bio, index) =>
                        bio ? (
                            <ReusableComponent
                                key={index}
                                icons={
                                    bio.image ? (
                                        <Image src={bio.image.preview as string} width={14} height={16} alt="" />
                                    ) : (
                                        <LucideImage size={14} color="#B5B3B3" />
                                    )
                                }
                                name={bio.label || 'Untitled'}
                            />
                        ) : null
                    )}
                </section>
            ) : null}
        </div>
    );
};

export default LinkBioFrameComponent;
