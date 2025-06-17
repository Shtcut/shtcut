import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@shtcut-ui/react';
import TemplateCard from '../template-card';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import InfoField from '../info-field';

const WebCardPreview = ({ linkData }: { linkData: any | undefined }) => {
    return (
        <div className="rounded-2xl  h-full w-full">
            <Tabs defaultValue="contact" className="w-full   ">
                <TabsList className=" bg-transparent m-0 h-12 border-none flex gap-4 p-6 px-12 items-center  w-full">
                    <TabsTrigger
                        value="contact"
                        className="text-secondary-5  font-medium w-full  rounded-md  text-xs shadow-none  p-0 px-0  h-10 data-[state=active]:text-primary-0  data-[state=active]:border-primary-0 text-[#121211] bg-[#FAFAFA] flex items-center gap-x-2  border data-[state=active]:bg-[#DCE5FB] "
                    >
                        CONTACT
                    </TabsTrigger>
                    <TabsTrigger
                        value="address"
                        className="text-secondary-5  font-medium w-full  rounded-md  text-xs shadow-none  p-0 px-0  h-10 data-[state=active]:text-primary-0  data-[state=active]:border-primary-0 text-[#121211] bg-[#FAFAFA] flex items-center gap-x-2  border data-[state=active]:bg-[#DCE5FB] "
                    >
                        <MapPin size={15} /> ADDRESS
                    </TabsTrigger>
                    <TabsTrigger
                        value="links"
                        className="text-secondary-5  font-medium w-full  rounded-md  text-xs shadow-none  p-0 px-0  h-10 data-[state=active]:text-primary-0  data-[state=active]:border-primary-0 text-[#121211] bg-[#FAFAFA] flex items-center gap-x-2  border data-[state=active]:bg-[#DCE5FB] "
                    >
                        LINKS
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
                                            image={link.image ?? ''}
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
                </section>
            </Tabs>
        </div>
    );
};

export default WebCardPreview;
