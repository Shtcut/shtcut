'use client';

import {
    Card,
    Label,
    Modal
} from '@shtcut-ui/react';
import { Workspaces } from '@shtcut/_shared/constant';
import { Logo, NavLink } from '@shtcut/components';
import Image from 'next/image';
import { useState } from 'react';
import { WorkspaceContainer } from '@shtcut/containers';

const Welcome = () => {
    const [active, setActive] = useState(0);
    const [openWorkspace, setOpenWorkspace] = useState(false);
    const [workspaceType, setWorkspaceType] = useState('team');

    const handleOnSelect = (e, index) => {
        e.preventDefault();
        setActive(index);
        const type = Workspaces[index].type;
        setWorkspaceType(type);
    };

    const handleVisibility = (open: boolean) => {
        setOpenWorkspace(open);
    };

    return (
        <>
            <div className=" block w-full p-4 py-6 sm:p-6 sm:rounded-lg text-gray-600 space-y-8">
                <div className="text-center">
                    <NavLink href="/">
                        <Logo width={150} className="mx-auto" />
                    </NavLink>
                    <div className="mt-5 space-y-2 w-full mx-auto md:w-1/2">
                        <Label className="text-gray-800 text-2xl font-poppins font-[300] sm:text-3xl">
                            Welcome on Board, how are you planning to use SHTCUT?
                        </Label>
                        <p className="font-poppins font-normal mt-3 items-center">
                            <Label> We’ll streamline your setup experience accordingly.</Label>
                        </p>
                    </div>
                </div>
                <div
                    className="cursor-pointer mt-16 max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8"
                    style={{ maxWidth: '700px' }}
                >
                    <ul className="cursor-pointer border-blue-600 mt-16 w-[50] h-[100] space-y-6 justify-center gap-2 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-2">
                        {Workspaces.map((item, idx) => (
                            <Card
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
                                        <div className="mt-4 text-gray-800 text-sm font-poppins font-normal">
                                            {item.description}{' '}
                                        </div>
                                    </div>
                                </label>
                            </Card>
                        ))}
                    </ul>
                    <div className="flex-1 flex items-end mt-5">
                        <button
                            className="px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700"
                            onClick={(e) => handleVisibility(true)}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                showModel={openWorkspace}
                setShowModal={setOpenWorkspace}
                showCloseIcon={true}
                onClose={() => handleVisibility(false)}
                className="px-10 bg-gray-50"
            >
                <WorkspaceContainer type={workspaceType} />
            </Modal>
        </>
    );
};

export default Welcome;
