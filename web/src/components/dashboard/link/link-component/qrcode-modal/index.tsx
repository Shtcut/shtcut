import { getApexDomain } from '@shtcut/_shared';
import { GOOGLE_FAVICON_URL } from '@shtcut/_shared/constant';
import { LinkNameSpace } from '@shtcut/_shared/namespace/link';
import DownloadBtn from '@shtcut/components/download-btn';
import QrCodeScan from '@shtcut/components/dashboard/qr-code-scan';
import Image from 'next/image';
import React from 'react';
import { CiImageOff } from 'react-icons/ci';
const QrCodeModal = ({ data, qrCodeRef }: { data: LinkNameSpace.Link; qrCodeRef: any }) => {
    const apexDomain = getApexDomain(data?.target);

    return (
        <div>
            <div className="flex flex-col p-4 items-center gap-2 ">
                <div className=" border  w-[50px] h-[50px] rounded-full flex justify-center items-center">
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

                <h1 className="font-semibold">Download QR Code</h1>
                <div className="border p-2  rounded-md border-[##E3E3E3]" ref={qrCodeRef}>
                    <QrCodeScan id={data?._id} value={`https://${data?.domain?.slug}/${data?.alias}`} />
                </div>
                <div className="flex mt-10 items-center w-full gap-4">
                    <DownloadBtn qrCodeRef={qrCodeRef} value={`https://${data?.domain?.slug}/${data?.alias}`} />
                </div>
            </div>
        </div>
    );
};

export default QrCodeModal;
