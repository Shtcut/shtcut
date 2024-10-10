import { logos } from '@shtcut/_shared/data';
import Image from 'next/image';
import React from 'react';
import { Ban } from 'lucide-react';
import { IoImageOutline } from 'react-icons/io5';
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setQrCodeLogo } from '@shtcut/redux/slices/qr-code';

interface ReusableComponentProps {
    logoUrl?: string;
    title: string;
    icons?: any;
    onClick?: () => void;
}

const LogosQrCode = () => {
    const dispatch = useDispatch();
    const handleSelectQrCodeLogo = (color: string) => {
        dispatch(setQrCodeLogo(color));
    };

    const ReusableComponent = ({ onClick, logoUrl, title, icons }: ReusableComponentProps) => {
        return (
            <div className="relative group w-24 h-24 cursor-pointer" onClick={onClick}>
                <div className="bg-[#F9F9F9]  cursor-pointer rounded-[10px] border border-[#E3E3E3] w-full h-full flex justify-center items-center">
                    {icons ? icons : <Image src={logoUrl!} width={54} height={54} alt={title} />}
                </div>
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[10px]">
                    <p className="text-white text-center">{title}</p>
                </div>
            </div>
        );
    };
    return (
        <div className="flex flex-col gap-y-6">
            <div className="relative">
                <div className="w-24 h-24 bg-[#F9F9F9]  cursor-pointer rounded-[10px] border border-[#E3E3E3] flex justify-center items-center">
                    <IoImageOutline size={54} color="#9F9C9C" />
                </div>
                <div className="bg-black w-7 h-7 rounded-full absolute top-[-10px] left-20 flex justify-center items-center">
                    <Plus color="white" />
                </div>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-5 gap-y-[16px] w-5/6 gap-x-[20px]">
                <ReusableComponent
                    onClick={() => handleSelectQrCodeLogo('')}
                    title="empty"
                    icons={<Ban size={54} color="#9F9C9C" />}
                />
                {logos.map((data) => (
                    <div key={data.id}>
                        <ReusableComponent
                            logoUrl={data.logoUrl}
                            title={data.name}
                            onClick={() => handleSelectQrCodeLogo(data.logoUrl)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogosQrCode;
