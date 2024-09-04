import { Button, Modal } from '@shtcut-ui/react';

import Image from 'next/image';
import React, { useState } from 'react';
import MembersTable from '../../members/members-table';
import { SearchInput } from '../../nav-component';
import { Filter } from 'lucide-react';
import { PiSortDescendingBold } from 'react-icons/pi';
import { useForm } from 'react-hook-form';
import { users } from '@shtcut/_shared/data';
import Tabs from '@shtcut/components/_shared/Tabs';
import RolesTable from '@shtcut/components/workspace-table';
import InviteModal from './invite-modal';
import UserModal from './user-modal';
import CreateRole from './create-role';
import EditRole from './edit-role';

const WorkspaceScreen = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showMember, setShowMember] = useState(false);
    const [showInvite, setShowInvite] = useState(false);
    const [inputs, setInputs] = useState(['', '', '']);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [selectedStatus,] = useState<string | null>(null);
    const [modalType, setModalType] = useState<string | null>(null);
    const addInput = () => {
        if (inputs.length < 10) {
            setInputs([...inputs, '']);
        }
    };

    const removeInput = () => {
        setInputs(inputs.slice(0, -1));
    };

    const form = useForm({
        defaultValues: {
            email: ''
        }
    });
    const handleFormSubmit = (values: any) => {
        console.log(values);
    };

    const filteredData = users.filter((user) => {
        const matchesQuery =
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus ? user.status === selectedStatus : true;
        return matchesQuery && matchesStatus;
    });
    const handleTabChange = (index: number) => {
        setSelectedTabIndex(index);
    };

    const tabs = [
        { id: 'members', label: 'Members' },
        { id: 'roles', label: 'Roles' }
    ];

    const handleOpenModal = (type: string) => {
        setModalType(type);
        setShowInvite(true);
    };

    return (
        <div>
            {showMember ? (
                <>
                    <section>
                        <section className="flex justify-between gap-8 items-center w-full">
                            <section className="h-12 flex items-center w-full px-4 border border-[#e3e3e3] bg-[#f7f7f7] rounded-[4px]">
                                <h3 className="font-semibold text-sm">Time Web</h3>
                            </section>
                            <Button
                                onClick={() => {
                                    selectedTabIndex === 0 ? handleOpenModal('invite') : handleOpenModal('create-role');
                                }}
                                className="text-xs h-8 rounded bg-primary-0"
                            >
                                {selectedTabIndex === 0 ? ' Invite Member' : 'Create Role'}
                            </Button>
                        </section>

                        <div className="flex mt-6 items-center justify-between flex-wrap md:flex-nowrap   pb-4 dark:bg-gray-900">
                            <div className="w-40">
                                <Tabs tabs={tabs} selectedTabIndex={selectedTabIndex} onTabClick={handleTabChange} />
                            </div>

                            <div className="flex items-center space-x-[12px]">
                                <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

                                <Button className="flex border hover:bg-primary-0 border-[#CCCBCB]  hover:text-white shadow-none text-[#5A5555] items-center bg-white gap-x-2 text-xs">
                                    <Filter size={18} /> Filter
                                </Button>
                                <Button className="flex border border-[#CCCBCB]  hover:bg-primary-0 hover:text-white shadow-none text-[#5A5555] items-center bg-white gap-x-2 text-xs">
                                    <PiSortDescendingBold size={18} /> Sort by
                                </Button>
                            </div>
                        </div>
                        {selectedTabIndex === 0 && (
                            <MembersTable filteredData={filteredData} searchQuery={searchQuery} />
                        )}
                        {selectedTabIndex === 1 && (
                            <RolesTable
                                onClickViewUser={() => handleOpenModal('user')}
                                onClickEdit={() => handleOpenModal('edit-role')}
                            />
                        )}
                    </section>
                </>
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
                                    <Button
                                        variant={'unstyled'}
                                        className="text-primary-0 text-xs font-semibold"
                                        onClick={() => setShowMember(true)}
                                    >
                                        Manage workspace
                                    </Button>
                                </div>
                            ))}
                        </section>
                    </section>
                </>
            )}
            <Modal
                onClose={() => setShowInvite(false)}
                showModel={showInvite}
                setShowModal={setShowInvite}
                className={`relative ${modalType === 'user' ? 'max-w-2xl' : 'max-w-md'} p-4`}
            >
                {modalType === 'invite' && (
                    <InviteModal
                        removeInput={removeInput}
                        handleFormSubmit={handleFormSubmit}
                        form={form}
                        inputs={inputs}
                        addInput={addInput}
                    />
                )}
                {modalType === 'user' && <UserModal onClose={() => setShowInvite(false)} />}
                {modalType === 'create-role' && <CreateRole onClose={() => setShowInvite(false)} />}
                {modalType === 'edit-role' && <EditRole onClose={() => setShowInvite(false)} />}
            </Modal>
        </div>
    );
};

export default WorkspaceScreen;
