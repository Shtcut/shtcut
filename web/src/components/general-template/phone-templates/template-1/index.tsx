import Image from 'next/image';
import React from 'react';
import { Image as LucideImage } from 'lucide-react';
import ReusableComponent from '../reusable-component';
import { Card } from '@shtcut-ui/react';
import { PhoneTemplateProps } from '@shtcut/types/link';
import StarLoader from '@shtcut/components/loader/star-loader';

const PhoneTemplate_1 = ({
    contactActions,
    imageSelected,
    title,
    linksBio,
    description,
    presetColor,
    btnColor,
    isUploadingMainImage
}: PhoneTemplateProps) => {
    return (
        <>
            <div
                style={{ backgroundColor: presetColor }}
                className=" rounded-t-[32px] h-[50%] w-full px-4 flex justify-center items-center"
            >
                <div className="flex gap-4 flex-col  items-center w-full">
                    {isUploadingMainImage ? (
                        <StarLoader color="white" />
                    ) : imageSelected ? (
                        <Image alt="" src={imageSelected as string} width={60} height={60} className="rounded-full" />
                    ) : (
                        <section className="h-20 w-20 rounded-full border bg-white shadow-sm flex justify-center items-center">
                            <LucideImage color="#B5B3B3" size={40} />
                        </section>
                    )}
                    <div>
                        <p className="text-sm text-white font-medium text-center "> {title ? String(title) : 'Name'}</p>
                        <p className="text-xs text-center text-[#DCE5FB]">
                            {' '}
                            {description ? description : 'Description'}{' '}
                        </p>
                    </div>
                    <section className="flex gap-2 w-full">
                        {contactActions.map((_c) => (
                            <Card
                                className="bg-white w-full shadow-sm h-11  flex flex-col items-center justify-center rounded-md"
                                key={_c.name}
                            >
                                <div style={{ color: presetColor }}>{_c.icon}</div>
                                <p className="text-[10px] font-medium" style={{ color: presetColor }}>
                                    {_c.name}
                                </p>
                            </Card>
                        ))}
                    </section>
                </div>
            </div>
            <section className="flex  flex-col gap-2 px-6 overflow-y-auto h-[50%] py-4 mb-3">
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

export default PhoneTemplate_1;
