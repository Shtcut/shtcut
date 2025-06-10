import { Card, Checkbox } from '@shtcut-ui/react';
import { Calendar, Link } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import LinkBioCardActions from '../link-card-actions';
import { PiChartBar } from 'react-icons/pi';
import { LinkBioDataResponse } from '@shtcut/types/link-bio';
import { formatDate } from '@shtcut/_shared';
import { capitalizeFirstLetter } from '@shtcut/_shared/constant';
import useCopyToClipboard from '@shtcut/hooks/useCopyToClipboard';
import { usePathname, useRouter } from 'next/navigation';

const LinkBioCard = ({
    data,
    handleShowDelete,
    handleNavigateAnalytics,
    handleShowQr
}: {
    data: LinkBioDataResponse;
    handleShowQr: () => void;
    handleShowDelete: () => void;
    handleNavigateAnalytics: () => void;
}) => {
    const router = useRouter();
    const pathName = usePathname();
    const { handleCopy } = useCopyToClipboard();
    return (
        <Card
            className=" cursor-pointer border border-gray-200 shadow-sm  rounded-[10px] p-4  "
            onClick={handleNavigateAnalytics}
        >
            <div className="flex justify-between items-center">
                <div className="flex gap-x-3">
                    <div className="relative top-1">
                        <Checkbox id="terms" className="p-0 m-0 border shadow-none border-[#D2D5DA] " />
                    </div>

                    <div className="shadow border border-gray-50 w-[50px] h-[50px] rounded-[10px] flex justify-center items-center">
                        {data?.profileImage ? (
                            <Image src={data?.profileImage} width={30} height={30} alt={data?.title} />
                        ) : (
                            <Link />
                        )}
                    </div>
                    <div className="">
                        <div>
                            <section>
                                <h1 className="font-semibold text-sm text-[#151314]">
                                    {capitalizeFirstLetter(data?.title)}
                                </h1>
                            </section>
                            <a
                                href={`/link-bio/${data?.slug}`}
                                className="text-xs cursor-pointer text-primary-0 font-normal"
                                target="_blank"
                                onClick={(e) => e.stopPropagation()}
                            >
                                beta.shtcut.co/{data?.slug}
                            </a>
                            <p className="text-[#2B2829] text-xs">{data?.links?.length} Links</p>
                        </div>
                        <div className="flex items-center gap-x-2 mt-2">
                            <Calendar size={14} color="#2B2829" />
                            <span className="text-[#726C6C] text-xs font-medium">{formatDate(data?.createdAt)}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-x-4">
                    <div
                        className={`text-xs cursor-pointer flex mx-auto items-center w-[83px] justify-center text-primary-0 rounded h-8 bg-[#F4F7FF]  font-semibold border gap-x-1 border-primary-0`}
                    >
                        <PiChartBar size={16} /> <span>{data?.clicks} Clicks</span>
                    </div>
                    <LinkBioCardActions
                        onDeleteShowModal={handleShowDelete}
                        handleCopy={() => handleCopy(`beta.shtcut.co/link-bio/${data?.slug}`)}
                        handleEdit={() => router.push(`${pathName}/edit-link-bio/${data?._id}`)}
                        handleShowQr={handleShowQr}
                    />
                </div>
            </div>
        </Card>
    );
};

export default LinkBioCard;
