import { Button } from '@shtcut-ui/react';

import Image from 'next/image';
import React, { useState } from 'react';

const WorkspaceScreen = () => {
    const [showMember, setShowMember] = useState(false);
    return (
        <div>
            {showMember ? (
                <></>
            ) : (
                <>
                    {' '}
                    <section>
                        <section className="flex justify-between gap-8 items-center w-full">
                            <section className="h-12 flex items-center w-full px-4 border border-[#e3e3e3] bg-[#f7f7f7] rounded-[4px]">
                                <h3 className="font-semibold text-sm">Workspace</h3>
                            </section>
                            <Button className="text-xs h-8 rounded bg-primary-0">Create Workspace</Button>
                        </section>
                        <section className="flex flex-col gap-4 mt-6">
                            {[1, 2, 3, 4].map((list) => (
                                <div
                                    key={list}
                                    className="flex bg-white border border-[#e3e3e3] px-3 py-2 rounded justify-between items-center "
                                >
                                    <div className="flex items-center gap-4">
                                        <Image src={'/images/send-icon.png'} width={44} height={44} alt="send" />
                                        <div>
                                            <p className="text-sm font-semibold">Timeweb</p>
                                            <p className="text-xs text-[#83899F]">10 Members</p>
                                        </div>
                                    </div>
                                    <Button variant={'unstyled'} className="text-primary-0 text-xs font-semibold">
                                        Manage workspace
                                    </Button>
                                </div>
                            ))}
                        </section>
                    </section>
                </>
            )}
        </div>
    );
};

export default WorkspaceScreen;
