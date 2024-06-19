import { Button } from '@shtcut-ui/react';
import React from 'react';

const FeaturedShorten = () => {
    return (
        <section>
            <div className="max-w-screen-xl mx-auto  px-4">
                <div className="flex justify-between gap-4 lg:flex-row flex-col items-center  lg:text-start  ">
                    <h1 className="font-heading text-2xl drop-shadow-xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent sm:text-3xl md:text-5xl w-80">
                        Features you can get
                    </h1>
                    <p className="w-full sm:w-96 text-tertiary-200">
                        We offer a variety of interesting features that you can help brand and manage links
                    </p>
                    <Button className="bg-primary-0 rounded-full h-12">Get Started</Button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedShorten;
