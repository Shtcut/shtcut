import { Card } from '@shtcut-ui/react';
import Image from 'next/image';
import React from 'react';
import ReusableComponent from '../reusable-component';
import { Image as LucideImage } from 'lucide-react';
import { PhoneTemplateProps } from '@shtcut/types/link';
import StarLoader from '@shtcut/components/loader/star-loader';

const PhoneTemplate_3 = ({
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
            <div className=" h-52 w-full flex items-center justify-center">
                {isUploadingMainImage ? (
                    <StarLoader />
                ) : (
                    <Image
                        src={imageSelected ? imageSelected : '/images/steve.jpeg'}
                        alt="steve"
                        className="h-full rounded-t-[32px] w-full object-cover"
                        height={0}
                        width={0}
                        unoptimized
                        priority
                    />
                )}
            </div>
            <section
                className="relative h-fit  rounded-b-[32px]  rounded-t-3xl bottom-8"
                style={{ backgroundColor: presetColor }}
            >
                <section className="rounded-t-2xl    flex flex-col gap-2 z-40 p-2">
                    <div className="flex flex-col items-center ">
                        <p className="text-white text-xs font-semibold">{title ? String(title) : 'Name'}</p>
                        <p className="text-[10px] text-center text-[#CCCBCB]">
                            {description ? description : 'Description'}{' '}
                        </p>
                    </div>
                    <section className="flex justify-center  gap-2 w-full ">
                        {contactActions.map((_c) => (
                            <Card
                                style={{ border: `1px solid ${presetColor}` }}
                                className="bg-white  py-1 shadow-sm w-8 h-8  gap-1 flex flex-col items-center justify-center  rounded-full"
                                key={_c.name}
                            >
                                <div style={{ color: presetColor }}>{_c.icon}</div>
                            </Card>
                        ))}
                    </section>

                    <section className="flex  flex-col gap-2 px-6 pt-4 h-[270px] overflow-y-auto">
                        {linksBio && linksBio.length > 0 ? (
                            <section className="flex flex-col mt-4 gap-2">
                                {linksBio.map((bio, index) =>
                                    bio ? (
                                        <ReusableComponent
                                            key={index}
                                            btnColor={btnColor}
                                            icons={
                                                bio.image?.preview ? (
                                                    <Image
                                                        src={(bio.image?.preview as string) || bio?.image?.file?.url}
                                                        width={14}
                                                        height={16}
                                                        alt=""
                                                    />
                                                ) : (
                                                    <LucideImage size={14} color="#B5B3B3" />
                                                )
                                            }
                                            name={bio.label || 'Untitled'}
                                            href={bio?.url}
                                        />
                                    ) : null
                                )}
                            </section>
                        ) : null}
                    </section>
                </section>
            </section>
        </>
    );
};

export default PhoneTemplate_3;
