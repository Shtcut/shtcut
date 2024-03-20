'use client';

import { Fragment } from 'react';
import { Button } from '@shtcut-ui/react';
import { dummyLinkHistory } from '@shtcut/_shared/constant';
import { LayoutBody } from '@shtcut/components';
import { motion } from 'framer-motion';

const Links = () => {
    return (
        <LayoutBody className="space-y-4">
            <div className="flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-light md:text-3xl">Links</h1>
                <Button className="bg-blue-600 w-[231px] font-medium flex justify-center items-center h-10 px-8 rounded-md text-white hover:bg-blue-700">
                    Create Link
                </Button>
            </div>
            <div className="max-w[640px] mx-auto my-10">
                <div className="my-10">
                    {dummyLinkHistory.map(({ id, ...link }) => (
                        <Fragment key={id}>
                            <motion.div
                                key={id}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            ></motion.div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </LayoutBody>
    );
};

export default Links;
