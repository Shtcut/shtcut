'use client';

import { Card, toast } from '@shtcut-ui/react';
import { formatDate, getApexDomain, truncate } from '@shtcut/_shared';
import { GOOGLE_FAVICON_URL } from '@shtcut/_shared/constant';
import { LinkNameSpace, LinkTypeResponse } from '@shtcut/_shared/namespace/link';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';
import BackButton from '@shtcut/components/back-btn';
import StarLoader from '@shtcut/components/loader/star-loader';
import { ArchiveRestore, Clock3, Tag } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { CiImageOff } from 'react-icons/ci';

const LinkArchiveComponent = ({
    findAllLinksResponse,
    isLoading,
    isLoadingState,
    updateLink,
    updateLinkResponse,
    setLoadingState,
    findAllLinks,
    archived,
    handleCheckboxChange,
    handleArchivedMany,
    doFind = () => {}
}: LinkTypeResponse) => {
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleRecover = async (data: LinkNameSpace.Link) => {
        setLoadingId(data._id);
        setLoadingState('updating', true);
        const payload = {
            title: data?.title,
            target: data?.target,
            devices: {
                android: data?.devices?.android,
                ios: data?.devices?.ios
            },
            archived: false
        };
        try {
            await updateLink({ payload, id: data?._id });
            const successMessage = updateLinkResponse?.data?.meta?.message;
            toast({
                variant: 'default',
                title: 'Link Updated',
                description: successMessage || 'links successfully Archived'
            });
            doFind();
            setLoadingState('updating', false);
        } catch (err) {
            const errorMessage = (err as any)?.data?.message || 'Failed . Please try again.';
            setLoadingState('updating', false);
            toast({
                variant: 'destructive',
                title: 'Error!',
                description: errorMessage
            });
        } finally {
            setLoadingId(null);
            setLoadingState('updating', false);
        }
    };

    return (
        <div>
            <BackButton />
            <div className="flex pt-6 justify-between items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">Link Archive </h1>

                <section className="flex items-center gap-x-4">
                    {archived.length > 0 && (
                        <LoadingButton
                            className="bg-[#E7EBEF] hover:bg-[#E7EBEF] border border-[#E7EBEF] text-[#5A5555] shadow-none text-xs h-8 rounded"
                            onClick={handleArchivedMany}
                            loading={isLoadingState}
                        >
                            Recover all
                        </LoadingButton>
                    )}
                </section>
            </div>
            {isLoading ? (
                <div className="flex flex-1 h-[70vh] justify-center items-center">
                    <StarLoader />
                </div>
            ) : (
                <section>
                    {findAllLinksResponse && findAllLinksResponse?.data && findAllLinksResponse.data.length > 0 ? (
                        <section className="flex flex-col gap-y-[14px] mt-8">
                            {findAllLinksResponse?.data.map((data) => {
                                const apexDomain = getApexDomain(data?.target ?? '');
                                return (
                                    <Card
                                        key={data?._id}
                                        className="cursor-pointer border border-gray-200 shadow-sm rounded-[10px] p-4"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-x-3">
                                                <div className="checkbox-container float-left mt-2">
                                                    <input
                                                        type="checkbox"
                                                        id={`qr-checkbox-${data?._id}`}
                                                        checked={archived.includes(data?._id)}
                                                        className="cbox cursor-pointer"
                                                        onChange={() =>
                                                            handleCheckboxChange(data._id, !archived.includes(data._id))
                                                        }
                                                    />
                                                </div>
                                                <div className="border w-[50px] h-[50px] rounded-full flex justify-center items-center">
                                                    {apexDomain ? (
                                                        <Image
                                                            src={`${GOOGLE_FAVICON_URL}${apexDomain}`}
                                                            width={18}
                                                            height={18}
                                                            alt={apexDomain}
                                                            unoptimized
                                                            priority
                                                        />
                                                    ) : (
                                                        <CiImageOff size={24} />
                                                    )}
                                                </div>
                                                <div>
                                                    <div>
                                                        <h1 className="font-semibold text-sm text-[#151314]">
                                                            {data?.title}
                                                        </h1>
                                                        <p className="text-xs text-primary-0 font-normal">
                                                            {data?.domain?.name}/{data?.alias}
                                                        </p>
                                                        <a
                                                            href={data?.target}
                                                            target="_blank"
                                                            className="text-[#2B2829] text-xs"
                                                        >
                                                            {truncate(data?.target ?? '', 100)}
                                                        </a>
                                                    </div>
                                                    <div className="flex items-center gap-x-2 mt-2">
                                                        <Clock3 size={16} />
                                                        <span className="text-[#726C6C] text-xs font-medium">
                                                            {data?.createdAt && formatDate(data?.createdAt ?? '')}
                                                        </span>
                                                        <div className="flex items-center space-x-1 w-[60px] h-6 rounded justify-center border bg-[#ECFFFC] border-[#0B7B69]">
                                                            <Tag size={14} color="#0B7B69" />
                                                            <span className="text-xs text-[#0B7B69]">Tags</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <LoadingButton
                                                variant={'outline'}
                                                loading={loadingId === data._id}
                                                className="flex items-center shadow-none gap-x-2 w-24 bg-transparent border"
                                                onClick={() => handleRecover(data)}
                                            >
                                                <ArchiveRestore size={16} /> Recover
                                            </LoadingButton>
                                        </div>
                                    </Card>
                                );
                            })}
                        </section>
                    ) : (
                        <div className="flex h-[60vh] justify-center items-center text-gray-500">No data available</div>
                    )}
                </section>
            )}
        </div>
    );
};

export default LinkArchiveComponent;
