import useGeneralState from '@shtcut/hooks/general-state';
import { LucideImage } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const PdfFrameComponent = () => {
    const { title, description, profileImage } = useGeneralState();

    return (
        <div className="flex flex-col gap-5 items-center mt-8">
            <p className="text-center font-medium">PDF File</p>
            <section className="h-12 w-full rounded-lg border flex items-center px-2 gap-2">
                {profileImage?.preview ? (
                    <Image
                        alt="profile image"
                        src={profileImage?.preview as string}
                        width={28}
                        height={28}
                        className="rounded-md"
                    />
                ) : (
                    <LucideImage color="#B5B3B3" size={28} />
                )}
                <div>
                    <p className="text-xs font-medium">{title ? String(title) : 'Title'}</p>
                    <p className="text-xs text-[#0A0A0B]">{String(description) || 'Description'}</p>
                </div>
            </section>
        </div>
    );
};

export default PdfFrameComponent;
