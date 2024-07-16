import { Button } from '@shtcut-ui/react';
import BreadCrumb from '@shtcut/components/bread-crumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import QrCodeCard from './qr-code-component';
import Image from 'next/image';

const QrCodeComponent = () => {
    const pathName = usePathname();
    const [selectedQRCodes, setSelectedQRCodes] = useState<number[]>([]);
    const data = [1, 2, 3, 4, 5];

    const handleCheckboxChange = (id: number, isChecked: boolean) => {
        if (isChecked) {
            setSelectedQRCodes((prevSelected) => [...prevSelected, id]);
        } else {
            setSelectedQRCodes((prevSelected) => prevSelected.filter((qrId) => qrId !== id));
        }
    };
    const handleDelete = () => {
        setSelectedQRCodes([]);
    };
    return (
        <div className="">
            <BreadCrumb />
            <div className="flex justify-between  items-center">
                <h1 className="font-semibold text-[#2B2829] text-2xl">QR Codes</h1>
                <Link href={`${pathName}/create`}>
                    <Button className="bg-primary-0 flex justify-center items-center gap-x-2">Create QR Code</Button>
                </Link>
            </div>
            {selectedQRCodes.length > 0 && (
                <div className="flex justify-end mt-4">
                    <Button className="bg-red-500 text-white" onClick={handleDelete}>
                        Delete Selected
                    </Button>
                </div>
            )}
            {data.length > 0 ? (
                data.map((id) => (
                    <div key={id} className="mt-[22px]">
                        <QrCodeCard id={id} handleCheckboxChange={handleCheckboxChange} />
                    </div>
                ))
            ) : (
                <div className="flex flex-col items-center rounded-[10px] bg-white h-[500px]  justify-center gap-4 mt-10">
                    <Image src="/images/qrcode-data.png" width={232} height={172} alt="No Data" />
                    <p className="text-center  text-lg font-medium ">Get started with QR Codes</p>
                    <Link href={`${pathName}/create`}>
                        <Button className="bg-primary-0 ">Create QR Code</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default QrCodeComponent;
