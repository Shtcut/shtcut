import { cn } from '@shtcut-ui/react';
import { CLIENTS } from '@shtcut/_shared/constant';
import Brands from '@shtcut/components/brand';
import Image from 'next/image';

export const Clients = () => {
    return (
        <section id="clients" className="space-y-6">
            <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-2xl drop-shadow-xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent sm:text-3xl md:text-4xl">
                    Elevate your team&apos;s abilities to superhero status at top-tier companies.
                </h2>
            </div>

           <Brands />
        </section>
    );
};
