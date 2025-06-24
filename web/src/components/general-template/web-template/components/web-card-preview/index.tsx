import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent, Button } from '@shtcut-ui/react';
import TemplateCard from '../template-card';
import { File, Globe, Link, Mail, MapPin, Phone } from 'lucide-react';
import InfoField from '../info-field';
import SocialTabContent from '../social-media';
import { usePathname } from 'next/navigation';
import Modal from '@shtcut/components/modal';

const WebCardPreview = ({ linkData }: { linkData: any | undefined }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="rounded-2xl  h-full w-full">
            <Tabs
                defaultValue={
                    linkData?.type === 'pdf' ? 'file' : linkData?.type === 'multi-link' ? 'social' : 'contact'
                }
                className="w-full   "
            >
                <TabsList className=" bg-transparent m-0 h-12 border-none flex gap-4 p-6 px-12 items-center  w-full">
                    {linkData?.type !== 'multi-link' && linkData?.type !== 'pdf' && (
                        <TabsTrigger
                            value="contact"
                            className="text-secondary-5  font-medium w-full  rounded-md  text-xs shadow-none  p-0 px-0  h-10 data-[state=active]:text-primary-0  data-[state=active]:border-primary-0 text-[#121211] bg-[#FAFAFA] flex items-center gap-x-2  border data-[state=active]:bg-[#DCE5FB] "
                        >
                            CONTACT
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

                    {linkData?.type !== 'multi-link' && linkData?.type !== 'pdf' && (
                        <TabsTrigger
                            value="address"
                            className="text-secondary-5 font-medium w-full rounded-md text-xs shadow-none p-0 px-0 h-10 
                   data-[state=active]:text-primary-0 data-[state=active]:border-primary-0 
                   text-[#121211] bg-[#FAFAFA] flex items-center gap-x-2 border 
                   data-[state=active]:bg-[#DCE5FB]"
                        >
                            <MapPin size={15} /> ADDRESS
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

                    <TabsTrigger
                        value="links"
                        className="text-secondary-5  font-medium w-full  rounded-md  text-xs shadow-none  p-0 px-0  h-10 data-[state=active]:text-primary-0  data-[state=active]:border-primary-0 text-[#121211] bg-[#FAFAFA] flex items-center gap-x-2  border data-[state=active]:bg-[#DCE5FB] "
                    >
                        <Link size={16} /> LINKS
                    </TabsTrigger>
                </TabsList>
                <section className=" px-8 mt-4">
                    <TabsContent value="contact" className="w-full p-4">
                        <section className="space-y-4">
                            <InfoField
                                label="Mobile"
                                value={linkData?.contacts?.phone}
                                icon={<Phone size={16} color={linkData?.colors?.presetColor} />}
                            />
                            <InfoField
                                label="Email"
                                value={linkData?.contacts?.email}
                                icon={<Mail size={16} color={linkData?.colors?.presetColor} />}
                            />
                            <InfoField
                                label="Website"
                                value={linkData?.contacts?.website}
                                icon={<Globe size={16} color={linkData?.colors?.presetColor} />}
                                hasDivider={false}
                            />
                        </section>
                    </TabsContent>
                    <TabsContent value="links" className="w-full">
                        <section className="w-full p-4 flex flex-col gap-4">
                            {linkData &&
                                linkData?.links.map((link) => (
                                    <a href={link.url} className="flex w-full" target="_blank" key={link.id}>
                                        <TemplateCard
                                            color={linkData?.colors?.btnColor ?? ''}
                                            label={link?.label}
                                            image={link.image?.file?.url ?? ''}
                                            presetColor={linkData?.colors?.presetColor}
                                        />
                                    </a>
                                ))}
                        </section>
                    </TabsContent>
                    <TabsContent value="address" className="p-4">
                        <section className="space-y-4">
                            <InfoField
                                label="Street"
                                value={linkData?.address?.street}
                                color={linkData?.colors?.presetColor}
                            />
                            <InfoField
                                label="State"
                                value={linkData?.address?.state}
                                color={linkData?.colors?.presetColor}
                            />
                            <InfoField
                                label="Country"
                                value={linkData?.address?.country}
                                color={linkData?.colors?.presetColor}
                            />
                            <InfoField
                                label="City"
                                value={linkData?.address?.city}
                                color={linkData?.colors?.presetColor}
                            />
                            <InfoField
                                label="Zipcode"
                                value={linkData?.address?.zipCode}
                                hasDivider={false}
                                color={linkData?.colors?.presetColor}
                            />
                        </section>
                    </TabsContent>
                    <TabsContent value="file" className="p-4">
                        <section className=" ">
                            <File className="float-left" />
                            <p className="ml-8">{linkData?.file?.file?.name}</p>
                            <Button variant={'unstyled'} className="border-b mt-2" onClick={() => setIsModalOpen(true)}>
                                View File
                            </Button>
                        </section>
                    </TabsContent>
                    <TabsContent value="social" className="px-4">
                        <SocialTabContent socialMedia={linkData?.socialMedia} />
                    </TabsContent>
                </section>
            </Tabs>
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

export default WebCardPreview;
