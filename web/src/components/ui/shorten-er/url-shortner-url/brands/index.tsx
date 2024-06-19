import Brands from '@shtcut/components/brand';
import { Logo } from '@shtcut/components/ui/logo';
import React from 'react';

const BrandShorten = () => {
    return (
        <section>
            <div>
                <h2 className="text-center">
                    <span className="font-heading text-2xl drop-shadow-xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent sm:text-3xl md:text-4xl text-center">
                        More than 25,000 Brands use
                    </span>{' '}
                    <span className="font-light sm:text-3xl md:text-4xl ">SHTCUT</span>
                </h2>
                <div className='mt-5'>
                    <Brands />
                </div>
            </div>
        </section>
    );
};

export default BrandShorten;
