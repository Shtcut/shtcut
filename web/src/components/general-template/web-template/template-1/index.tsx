import { File, Link, MapPin, User, UserRound } from 'lucide-react';
import React, { useState } from 'react';
import SkeletonLoaderWeb from '../components/skeleton-loader';
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@shtcut-ui/react';
import InfoField from '../components/info-field';
import { Phone, Mail, Globe } from 'lucide-react';
import { ImageComponent } from '@shtcut/components/imageComponent';
import Modal from '@shtcut/components/modal';
import SocialTabContent from '../components/social-media';
import { usePathname } from 'next/navigation';

const WebTemplate1 = ({ linkData, isLoading }: { linkData: any | undefined; isLoading: boolean }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div>
            {isLoading ? (
                <SkeletonLoaderWeb />
            ) : (
                <>
                    {' '}
                    <section
                        className=" h-[372px] "
                        style={{ backgroundColor: linkData?.colors?.presetColor || linkData?.bgColor }}
                    >
                        <div className="flex justify-center gap-y-2 flex-col items-center pt-8">
                            {linkData?.profileImage ? (
                                <ImageComponent
                                    src={linkData?.profileImage?.file?.url}
                                    width={130}
                                    height={130}
                                    className="rounded-full"
                                    alt={linkData?.profileImage?.file?.name}
                                />
                            ) : (
                                <User size={130} />
                            )}

                            <section>
                                <h1 className="font-semibold text-center  ">{linkData?.title}</h1>
                                <p className=" text-center  ">{linkData?.description}</p>
                            </section>
                        </div>
                    </section>
                    <section className="w-[508px] relative bottom-24 h-[500px] mx-auto">
                        <div className="rounded-2xl   bg-white shadow-sm border h-full w-full  px-12 ">
                            <Tabs
                                defaultValue={
                                    linkData?.type === 'pdf'
                                        ? 'file'
                                        : linkData?.type === 'multi-link'
                                          ? 'social'
                                          : 'contact'
                                }
                                className="w-full   pt-4"
                            >
                                <TabsList className=" bg-transparent m-0 h-12 border-none flex gap-4 py-6 px-0 items-center  w-full">
                                    {linkData?.type !== 'multi-link' && linkData?.type !== 'pdf' && (
                                        <TabsTrigger
                                            value="contact"
                                            className="text-secondary-5  font-medium w-full  rounded-md  text-xs shadow-none  p-0 px-0  h-10 data-[state=active]:text-primary-0  data-[state=active]:border-primary-0 text-[#121211] bg-[#FAFAFA] flex items-center gap-x-2  border data-[state=active]:bg-[#DCE5FB] "
                                        >
                                            <UserRound size={16} /> CONTACT
                                        </TabsTrigger>
                                    )}
                                    {linkData?.type === 'pdf' && (
                                        <TabsTrigger
                                            value="file"
                                            className="text-secondary-5  font-medium w-full  rounded-md  text-xs shadow-none  p-0 px-0  h-10 data-[state=active]:text-primary-0  data-[state=active]:border-primary-0 text-[#121211] bg-[#FAFAFA] flex items-center gap-x-2  border data-[state=active]:bg-[#DCE5FB] "
                                        >
                                            <File size={16} /> FILE
                                        </TabsTrigger>
                                    )}
                                    {(linkData?.type === 'multi-link' || linkData?.type === 'vcard') && (
                                        <TabsTrigger
                                            value="social"
                                            className="text-secondary-5 font-medium w-full rounded-md text-xs shadow-none p-0 px-0 h-10 
                                                       data-[state=active]:text-primary-0 data-[state=active]:border-primary-0 
                                                       text-[#121211] bg-[#FAFAFA] flex items-center gap-x-2 border 
                                                       data-[state=active]:bg-[#DCE5FB]"
                                        >
                                            SOCIAL MEDIA
                                        </TabsTrigger>
                                    )}

                                    {linkData?.type !== 'multi-link' && linkData?.type !== 'pdf' && (
                                        <TabsTrigger
                                            value="address"
                                            className="text-secondary-5  font-medium w-full  rounded-md  text-xs shadow-none  p-0 px-0  h-10 data-[state=active]:text-primary-0  data-[state=active]:border-primary-0 text-[#121211] bg-[#FAFAFA] flex items-center gap-x-2  border data-[state=active]:bg-[#DCE5FB] "
                                        >
                                            <MapPin size={16} /> ADDRESS
                                        </TabsTrigger>
                                    )}

                                    {linkData?.type !== 'pdf' &&
                                        (linkData?.type === 'multi-link' || pathname?.includes('link-bio')) && (
                                            <TabsTrigger
                                                value="links"
                                                className="text-secondary-5 font-medium w-full rounded-md text-xs shadow-none p-0 px-0 h-10 
                       data-[state=active]:text-primary-0 data-[state=active]:border-primary-0 
                       text-[#121211] bg-[#FAFAFA] flex items-center gap-x-2 border 
                       data-[state=active]:bg-[#DCE5FB]"
                                            >
                                                <Link size={16} /> LINKS
                                            </TabsTrigger>
                                        )}
                                </TabsList>
                                <div className=" mt-4 p-0 m-0 py-0 rounded-md border shadow-sm">
                                    <TabsContent value="contact" className="w-full p-4">
                                        <section className="space-y-4">
                                            <InfoField
                                                label="Mobile"
                                                value={linkData?.contacts?.phone}
                                                icon={<Phone size={16} />}
                                            />
                                            <InfoField
                                                label="Email"
                                                value={linkData?.contacts?.email}
                                                icon={<Mail size={16} />}
                                            />
                                            <InfoField
                                                label="Website"
                                                value={linkData?.contacts?.website}
                                                icon={<Globe size={16} />}
                                                hasDivider={false}
                                            />
                                        </section>
                                    </TabsContent>
                                    <TabsContent value="links" className="w-full m-0 py-0 shadow-none border-none p-0 ">
                                        <section className="">
                                            {linkData && linkData?.links?.length > 0 ? (
                                                <section className="w-full justify-center  flex  flex-col  px-4">
                                                    {linkData &&
                                                        linkData?.links.map((link, index) => (
                                                            <a
                                                                href={link.url}
                                                                className={`flex gap-2 h-14 p-0 items-center w-full    ${
                                                                    index !== linkData.links.length - 1
                                                                        ? 'border-b '
                                                                        : ''
                                                                } `}
                                                                target="_blank "
                                                                key={link.id}
                                                            >
                                                                <section className="h-fit w-12 ">
                                                                    {linkData?.profileImage ? (
                                                                        <ImageComponent
                                                                            src={link.image?.file?.url ?? ''}
                                                                            alt={linkData?.title}
                                                                            width={0}
                                                                            height={0}
                                                                            className="rounded w-full h-full"
                                                                            unoptimized
                                                                            priority
                                                                        />
                                                                    ) : (
                                                                        <Link size={15} />
                                                                    )}
                                                                </section>
                                                                <p className="text-sm ">{link?.label}</p>
                                                            </a>
                                                        ))}
                                                </section>
                                            ) : (
                                                <section className="h-14 flex flex-col justify-center px-2">
                                                    <p>no data </p>
                                                </section>
                                            )}
                                        </section>
                                    </TabsContent>
                                    <TabsContent value="address" className="p-4">
                                        <section className="space-y-4">
                                            <InfoField label="Street" value={linkData?.address?.street} />
                                            <InfoField label="State" value={linkData?.address?.state} />
                                            <InfoField label="Country" value={linkData?.address?.country} />
                                            <InfoField label="City" value={linkData?.address?.city} />
                                            <InfoField
                                                label="Zipcode"
                                                value={linkData?.address?.zipCode}
                                                hasDivider={false}
                                            />
                                        </section>
                                    </TabsContent>
                                    <TabsContent value="file" className="p-4">
                                        <section className=" ">
                                            <File className="float-left" />
                                            <p className="ml-8">{linkData?.file?.file?.name}</p>
                                            <Button
                                                variant={'unstyled'}
                                                className="border-b mt-2"
                                                onClick={() => setIsModalOpen(true)}
                                            >
                                                View File
                                            </Button>
                                        </section>
                                    </TabsContent>
                                    <TabsContent value="social" className="px-4">
                                        <SocialTabContent socialMedia={linkData?.socialMedia} />
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </div>
                    </section>
                </>
            )}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {linkData?.file?.file?.url ? (
                    <div className="w-full h-[80vh]">
                        <iframe
                            src={linkData?.file?.file?.url}
                            title="PDF Viewer"
                            width="100%"
                            height="100%"
                            className="rounded"
                        ></iframe>
                    </div>
                ) : (
                    <p>No file to display</p>
                )}
            </Modal>
        </div>
    );
};

export default WebTemplate1;
