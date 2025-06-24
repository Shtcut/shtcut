import React, { useState } from 'react';
import SkeletonLoaderWeb from '../components/skeleton-loader';
import { File, Globe, Link, Mail, MapPin, Phone, User, UserRound } from 'lucide-react';
import { Button, Card, Tabs, TabsContent, TabsList, TabsTrigger } from '@shtcut-ui/react';
import InfoField from '../components/info-field';
import TemplateCard from '../components/template-card';
import { ImageComponent } from '@shtcut/components/imageComponent';
import { usePathname } from 'next/navigation';
import SocialTabContent from '../components/social-media';
import Modal from '@shtcut/components/modal';

const WebTemplate3 = ({ linkData, isLoading }: { linkData: any | undefined; isLoading: boolean }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pathname = usePathname();
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
                                        className="rounded-full"
                                        alt={linkData.name}
                                    />
                                ) : (
                                    <User size={130} />
                                )}
                            </Card>
                        </section>
                    </section>
                    <Card
                        className="w-[508px] relative  mx-auto pb-10 "
                        style={{ backgroundColor: linkData?.colors?.background }}
                    >
                        <div className=" ">
                            <section className="pt-14">
                                <h1 className="font-semibold text-center  ">{linkData?.name}</h1>
                                <p className=" text-center  ">{linkData?.description}</p>
                            </section>
                        </div>{' '}
                        <section className="pt-4 ">
                            <div className="   h-full w-full  px-12 ">
                                <Tabs
                                    defaultValue="contact"
                                    className="w-full   pt-4 shadow-none bg-transparent  border-none"
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
                                    <Card className=" mt-4 shadow-sm">
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
                                        <TabsContent value="links" className="w-full shadow-none border-none">
                                            <section className="w-full p-4 flex flex-col gap-4">
                                                {linkData &&
                                                    linkData?.links.map((link) => (
                                                        <a
                                                            href={link.url}
                                                            className="flex w-full"
                                                            target="_blank"
                                                            key={link.id}
                                                        >
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
                                        <TabsContent value="social" className="px-4">
                                            <SocialTabContent socialMedia={linkData?.socialMedia} />
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
                                    </Card>
                                </Tabs>
                            </div>
                        </section>
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
                    </Card>{' '}
                </>
            )}
        </section>
    );
};

export default WebTemplate3;
