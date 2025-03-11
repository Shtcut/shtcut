import { Card } from '@shtcut-ui/react';
import { formatDate } from '@shtcut/_shared';
import CardsActions from '@shtcut/components/card-actions';
import useCopyToClipboard from '@shtcut/hooks/useCopyToClipboard';
import { LinkBioDataResponse } from '@shtcut/types/link-bio';
import { Clock3 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { CiImageOff } from 'react-icons/ci';

const SingleLinkBioCard = ({ data }: { data: LinkBioDataResponse }) => {
    const { handleCopy } = useCopyToClipboard();
    const handleCopyLink = () => {
        const textToCopy = `https://beta.shtcut.co/link-bio/${data?.slug}`;
        handleCopy(textToCopy);
    };

    return (
        <Card className=" cursor-pointer border border-gray-200 shadow-sm  rounded-[10px] p-4  ">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-3">
                    <div className=" border  w-[50px] h-[50px] rounded-full flex justify-center items-center">
                        {data?.profileImage ? (
                            <Image
                                src={data?.profileImage}
                                width={18}
                                height={18}
                                alt={data?.name}
                                unoptimized
                                priority
                            />
                        ) : (
                            <CiImageOff size={24} />
                        )}
                    </div>
                    <div className="">
                        <div className="flex gap-1 flex-col">
                            <h1 className="font-semibold text-sm text-[#151314]">{data?.title}</h1>
                            <a href={`/link-bio/${data?.slug}`} target="_blank" className="text-primary-0 text-xs">
                                beta.shtcut.co/{data?.slug}
                            </a>
                            <p className="text-xs">{data?.links?.length} Links</p>
                        </div>
                        <div className="flex items-center gap-x-2 mt-2">
                            <Clock3 size={16} />
                            <span className="text-[#726C6C] text-xs font-medium">
                                {data?.createdAt && formatDate(data?.createdAt ?? '')}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <CardsActions
                        numberOfClicks={data?.clicks ?? 0}
                        handleCopy={handleCopyLink}
                        onDeleteClick={() => {}}
                        onClickNavigation={() => {}}
                        edit={true}
                    />
                </div>
            </div>
        </Card>
    );
};

export default SingleLinkBioCard;
