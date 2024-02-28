'use client';

import { Input } from '@shtcut-ui/react';
import { Logo, NavLink } from '@shtcut/components';
import Image from 'next/image';
import { useState } from 'react';

const WorkSpace = () => {
    const [active, setActive] = useState(0);

    const workspaces = [
        {
            name: 'For myself',
            type: 'personal',
            icon: '/mdi_account.svg',
            description: 'Create custom domains, links and QR codes, Stay organized.'
        },
        {
            name: 'With my team',
            icon: '/ri_team-fill.svg',
            type: 'team',
            description: 'Streamline processes, generate shareable links or QR codes.Collaborate.'
        }
    ];

    const handleOnSelect = (e, index) => {
        e.preventDefault();
        setActive(index);
        const workspace = workspaces[index];
        console.log('workspace::', workspace);
    };

    return (
        <div className=" block w-full p-4 py-6 sm:p-6 sm:rounded-lg text-gray-600 space-y-8">
            <div className="text-center">
                <NavLink href="/">
                    <Logo width={150} className="mx-auto" />
                </NavLink>
                <div className="mt-5 space-y-2 w-full mx-auto md:w-1/2">
                    <h3 className="text-gray-800 text-2xl font-poppins font-[300] sm:text-3xl">
                        How are you planning to use SHTCUT?
                    </h3>
                    <p className="font-poppins font-thin mt-3 items-center">
                        We’ll streamline your setup experience accordingly.
                    </p>
                </div>
            </div>
            <div>
                <h1 className='items-center justify-center justify-items-center mx-auto'>Workspace</h1>
            </div>
        </div>
    );
};

export default WorkSpace;
