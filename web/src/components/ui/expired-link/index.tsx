import React from 'react';
import { TimerOff } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@shtcut-ui/react';
const ExpireLinkComponent = ({ handleNavigate }: { handleNavigate: () => void }) => {
    return (
        <div className="flex items-center justify-center h-screen">
            <section className="flex items-center justify-center flex-col gap-y-5">
                <section className="mb-6">
                    <Image src={'/logos/shtcut-logo.png'} width={110} height={30} alt="shtcut-logo" />
                </section>
                <section
                    className="bg-primary-0 w-36 h-36 rounded-full
                    flex justify-center text-white items-center"
                >
                    <TimerOff size={64} />
                </section>
                <section className="flex flex-col items-center  w-full sm:w-80 mx-auto ">
                    <h1 className="font-bold">Expired Link</h1>
                    <p className="text-sm text-center text-[#5A5555]">
                        This link has expired. Please contact the owner to get a new one.
                    </p>
                </section>
                <Button onClick={handleNavigate} className="w-64 text-[13px] bg-primary-0">
                    Create Your Own Link
                </Button>
            </section>
        </div>
    );
};

export default ExpireLinkComponent;
