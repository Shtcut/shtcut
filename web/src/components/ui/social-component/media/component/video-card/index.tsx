import { Card } from '@shtcut-ui/react';
import { Check } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { PiFolderDuotone } from 'react-icons/pi';

const VideoCard = ({ type, photo }: { type?: string; photo: any }) => {
    return (
        <Card className="relative w-full cursor-pointer ">
            <button
                className={`absolute top-2 left-2 w-5 h-5 rounded-full bg-white border border-[#D3DBE4] flex items-center justify-center duration-200 
                `}
            >
                {/* <Check size={12} className="black " /> */}
            </button>

            <div className=" w-full h-28">
                <Image
                    src={photo.urls.small}
                    alt={photo.alt_description || 'Unsplash Image'}
                    width={photo.width}
                    height={photo.height}
                    className="object-cover rounded-t-xl w-full h-28"
                    loading="eager"
                />
                {/* <iframe
                    className="w-full h-full rounded-t-md"
                    src="https://www.youtube.com/embed/1WRj1so9lMU?autoplay=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                /> */}
            </div>
            <div className="p-4 flex flex-col gap-y-1">
                <section className="flex items-center justify-between">
                    <p className="text-sm font-semibold ">{type === 'file' ? 'Folder Name' : 'Blog transparent'} </p>
                    <p className="text-xs text-[#726C6C]">128MB</p>
                </section>
                <p className="text-xs mb-1 text-[#433E3F]">Aug 24, 2024</p>

                <section className="bg-[#EAEEF9] w-14 h-6 rounded flex items-center justify-center ">
                    <p className="text-xs text-primary-0 font-medium">Video</p>
                </section>
            </div>
        </Card>
    );
};

export default VideoCard;
