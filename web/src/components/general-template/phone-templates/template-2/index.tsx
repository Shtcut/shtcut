import React from 'react';
import ReusableComponent from '../reusable-component';
import { Image as LucideImage } from 'lucide-react';
import { Card } from '@shtcut-ui/react';
import Image from 'next/image';
import { PhoneTemplateProps } from '@shtcut/types/link';
import StarLoader from '@shtcut/components/loader/star-loader';

const PhoneTemplate_2 = ({
    contactActions,
    title,
    linksBio,
    description,
    imageSelected,
    presetColor,
    btnColor,
    isUploadingMainImage
}: PhoneTemplateProps) => {
    return (
        <>
            <div className="relative h-60 w-full">
                <div className="absolute rounded-t-[32px] inset-0 bg-black bg-opacity-50 z-10" />
                <section className="relative flex items-center justify-center h-60 w-full z-0">
                    {isUploadingMainImage ? (
                        <StarLoader />
                    ) : (
                        <Image
                            src={imageSelected ? imageSelected : '/images/steve.jpeg'}
                            alt="steve"
                            className="h-60 rounded-t-[32px] w-full object-cover"
                            height={0}
                            width={0}
                            unoptimized
                            priority
                        />
                    )}
                </section>
            </div>
            <section className="absolute top-20 flex flex-col gap-2 z-40 p-5">
                <div className="flex flex-col  ">
                    <p className="text-white text-xs font-semibold">{title ? String(title) : 'Name'}</p>
                    <p className="text-[10px] text-[#CCCBCB]">{description ? description : 'Description'} </p>
                </div>
                <section className="flex  gap-2 w-full ">
                    {contactActions.map((_c) => (
                        <Card
                            style={{ backgroundColor: presetColor, border: `1px solid ${presetColor}` }}
                            className="  py-1 shadow-sm w-8 h-8  gap-1 flex flex-col items-center justify-center  rounded-full"
                            key={_c.name}
                        >
                            <div className="text-white">{_c.icon}</div>
                        </Card>
                    ))}
                </section>
            </section>
            <section className="flex  flex-col gap-2 px-6 overflow-y-auto h-[55%] pt-4 ">
                {linksBio && linksBio.length > 0 ? (
                    <section className="flex flex-col mt-4 gap-2">
                        {linksBio.map((bio, index) =>
                            bio ? (
                                <ReusableComponent
                                    key={index}
                                    icons={
                                        bio.image ? (
                                            <Image
                                                src={(bio.image.preview as string) || bio?.image?.file?.url}
                                                width={14}
                                                height={16}
                                                alt=""
                                            />
                                        ) : (
                                            <LucideImage size={14} color="#B5B3B3" />
                                        )
                                    }
                                    name={bio.label || 'Untitled'}
                                    btnColor={btnColor}
                                    href={bio?.url}
                                />
                            ) : null
                        )}
                    </section>
                ) : null}
            </section>
        </>
    );
};

export default PhoneTemplate_2;
