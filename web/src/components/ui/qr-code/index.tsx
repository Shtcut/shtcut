import { Button } from '@shtcut-ui/react';
import BreadCrumb from '@shtcut/components/bread-crumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import QrCodeCard from './qr-code-component';

const QrCodeComponent = () => {
    const pathName = usePathname();
    return (
        <div className="my-[38px] ">
            <BreadCrumb />
            <div className="flex justify-between  items-center">
                <h1 className="font-semibold text-[#2B2829] text-2xl">QR Codes</h1>
                <Link href={`${pathName}/create`}>
                    <Button className="bg-primary-0 flex justify-center items-center gap-x-2">
                        Create QR Code <div className="border border-white w-2 h-2 font-semibold rounded-full" />
                    </Button>
                </Link>
            </div>
            {[1, 2, 3, 4, 5].map((data, index) => (
                <div key={index} className="mt-[22px]">
                    <QrCodeCard />
                </div>
            ))}
        </div>
    );
};

export default QrCodeComponent;
