import { Card } from '@shtcut-ui/react';
import { Check } from 'lucide-react';
import React from 'react';
import { PiFolderDuotone } from 'react-icons/pi';

const FolderFileCard = ({ type }: { type: string }) => {
    return (
        <Card className="relative w-full cursor-pointer ">
            <button
                className={`absolute top-2 left-2 w-5 h-5 rounded-full bg-white border border-[#D3DBE4] flex items-center justify-center duration-200 
                `}
            >
                {/* <Check size={12} className="black " /> */}
            </button>

            <div className="bg-[#E7EBEF] flex items-center justify-center w-full h-28">
                <PiFolderDuotone size={50} color="#CCCBCB" />
            </div>
            <div className="p-4 flex flex-col gap-y-1">
                <section className="flex items-center justify-between">
                    <p className="text-sm font-semibold ">{type === 'file' ? 'Folder Name' : 'Blog transparent'} </p>
                    <p className="text-xs text-[#726C6C]">128MB</p>
                </section>
                <p className="text-xs mb-1 text-[#433E3F]">Aug 24, 2024</p>

                <section className="bg-[#EAEEF9] w-14 h-6 rounded flex items-center justify-center ">
                    <p className="text-xs text-primary-0 font-medium">{type === 'file' ? 'pdf' : '8 Files'} </p>
                </section>
            </div>
        </Card>
    );
};

export default FolderFileCard;
