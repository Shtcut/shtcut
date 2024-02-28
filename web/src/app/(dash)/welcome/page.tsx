'use client';

import { Logo, NavLink } from '@shtcut/components';
import Image from 'next/image';
import { useState } from 'react';

const Welcome = () => {
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
                        Welcome on Board, how are you planning to use SHTCUT?
                    </h3>
                    <p className="font-poppins font-thin mt-3 items-center">
                        We’ll streamline your setup experience accordingly.
                    </p>
                </div>
            </div>
            <div
                className="cursor-pointer mt-16 max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8"
                style={{ maxWidth: '700px' }}
            >
                <ul className="cursor-pointer border-blue-600 mt-16 w-[50] h-[100] space-y-6 justify-center gap-2 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-2">
                    {workspaces.map((item, idx) => (
                        <li
                            key={idx}
                            onClick={(e) => handleOnSelect(e, idx)}
                            className={`cursor-pointer ${
                                idx === active ? 'border-blue-600' : ''
                            } relative flex-1 flex items-stretch flex-col p-8 rounded-xl border-2`}
                        >
                            <label>
                                <div className="">
                                    <Image src={item.icon} alt="Icon" width={24} height={24} />
                                    <p className="text-black mt-2 font-medium">
                                        <span>{item.name}</span>
                                    </p>
                                    <div className="mt-4 text-gray-800 text-sm font-poppins font-thin">
                                        {item.description}{' '}
                                    </div>
                                </div>
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="flex-1 flex items-end mt-5">
                    <button className="px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700">
                        Create Workspace
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
