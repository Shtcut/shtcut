import { AMOUNTS, IMPACT } from '@shtcut/_shared/data';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import _ from 'lodash';

const ImpactShorten = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div>
            <div className="max-w-screen-xl mx-auto  px-4">
                <section className="flex lg:flex-row flex-col justify-between ">
                    <div className="w-full lg:w-1/2 ">
                        <section className="flex w-full lg:w-4/5 flex-col gap-6">
                            <h2
                                className="font-heading text-2xl drop-shadow-xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent sm:text-3xl md:text-4xl "
                                data-aos="fade-up"
                            >
                                Experience the impact yourself, let results speak louder than our claims.
                            </h2>
                            <p className="text-black/60" data-aos="fade-up">
                                SaaS become a common delivery model for many business application, including office
                                software, messaging software, payroll processing software, DBMS software, management
                                software
                            </p>
                            <div data-aos="fade-up">
                                {AMOUNTS.map((_e) => (
                                    <section className="flex items-center gap-6 " key={_e.id}>
                                        <h1 className="font-heading text-2xl drop-shadow-xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent ">
                                            {_e.title}
                                        </h1>
                                        <p className={`${_e.id === 3 ? 'px-3' : ''}`}>{_e.text}</p>
                                    </section>
                                ))}
                            </div>
                        </section>
                    </div>
                    <div className="w-full mt-6 lg:w-1/2 mx-auto">
                        <section className="lg:w-3/4 mx-auto flex flex-col gap-6">
                            {IMPACT.map((_e) => (
                                <section key={_e.title} className="flex gap-2 sm:gap-6 ">
                                    <div className="relative top-2">
                                        {React.createElement(_e.icons, { size: 24, color: 'blue' })}
                                    </div>
                                    <section>
                                        <h1 className="font-heading text-2xl drop-shadow-xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent ">
                                            {_e.title}
                                        </h1>
                                        <p className="text-black/60 font-medium ">{_e.text}</p>
                                    </section>
                                </section>
                            ))}
                        </section>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ImpactShorten;
