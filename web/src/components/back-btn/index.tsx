/** @format */

import { useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = ({ navigation, className }: { navigation?: any; className?: string }) => {
    const router = useRouter();
    return (
        <div className={`cursor-pointer shadow-none border-none bg-none w-fit h-10  ${className}`}>
            <div
                onClick={() => {
                    if (navigation) {
                        navigation();
                    } else router.back();
                }}
                className=" text-black   w-full h-full rounded-full flex justify-center items-center"
            >
                <FaArrowLeft size={16} />
            </div>
        </div>
    );
};

export default BackButton;
