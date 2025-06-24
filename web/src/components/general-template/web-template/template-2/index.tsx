import React from 'react';
import WebCardPreview from '../components/web-card-preview';
import SkeletonLoaderWeb from '../components/skeleton-loader';
import { User } from 'lucide-react';
import { Card } from '@shtcut-ui/react';
import { ImageComponent } from '@shtcut/components/imageComponent';

const WebTemplate2 = ({ linkData, isLoading }: { linkData: any | undefined; isLoading: boolean }) => {
    return (
        <section>
            {isLoading ? (
                <SkeletonLoaderWeb />
            ) : (
                <>
                    <section
                        className="h-[372px] relative"
                        style={{
                            backgroundImage: linkData?.profileImage
                                ? `url(${linkData?.profileImage?.file?.url})`
                                : undefined,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <section className="items-center flex justify-center left-0 right-0 z-20 absolute bottom-[-30px] mx-auto">
                            <Card
                                className="rounded-full w-fit mx-auto
                         h-fit  p-3 shadow-none border items-center flex justify-center   m-0 mb-0 mt-0"
                            >
                                {linkData?.profileImage ? (
                                    <ImageComponent
                                        src={linkData?.profileImage?.file?.url}
                                        width={130}
                                        height={130}
                                        className="rounded-full bg-cover"
                                        alt={linkData?.profileImage?.file?.name}
                                        priority
                                        unoptimized
                                    />
                                ) : (
                                    <User size={130} />
                                )}
                            </Card>
                        </section>
                    </section>
                    <Card
                        className="w-[508px] relative  mx-auto rounded-t-none"
                        style={{ backgroundColor: linkData?.colors?.background }}
                    >
                        <div className=" ">
                            <section className="pt-14">
                                <h1 className="font-semibold text-center  ">{linkData?.name || linkData?.title}</h1>
                                <p className=" text-center  ">{linkData?.description}</p>
                            </section>
                        </div>{' '}
                        <section className="pt-4 ">
                            <WebCardPreview linkData={linkData} />
                        </section>
                    </Card>{' '}
                </>
            )}
        </section>
    );
};

export default WebTemplate2;
