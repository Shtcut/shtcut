import { Button, Modal as ShadModal, toast } from '@shtcut-ui/react';

import Image from 'next/image';
import React, { useState } from 'react';
import MembersTable from '../../members/members-table';
import { SearchInput } from '../../nav-component';
import { Filter } from 'lucide-react';
import { PiSortDescendingBold } from 'react-icons/pi';
import { FormProvider, useForm } from 'react-hook-form';
import { users } from '@shtcut/_shared/data';
import Tabs from '@shtcut/components/_shared/Tabs';
import RolesTable from '@shtcut/components/workspace-table';
import InviteModal from './invite-modal';
import UserModal from './user-modal';
import CreateRole from './create-role';
import { useWorkspace } from '@shtcut/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { inviteFormSchema } from '@shtcut/components/form/auth/sign-up-form/validation';
import { useCurrentWorkSpace } from '@shtcut/hooks/current-workspace';
import { useCreateInviteMutation } from '@shtcut/services/members';
import StarLoader from '@shtcut/components/loader/star-loader';
import { useRole } from '@shtcut/hooks/roles';
import { RolesDataResponse } from '@shtcut/types/workspace';
import CreateWorkSpace from '@shtcut/containers/work-space/work-space-modal';
import { useCreateWorkspace } from '@shtcut/hooks/current-workspace/create-workspace';
import Modal from '@shtcut/components/modal';

const WorkspaceScreen = () => {
    const currentWorkspace = useCurrentWorkSpace();
    const [singleRole, setSingleRole] = useState<RolesDataResponse | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showMember, setShowMember] = useState(false);
    const [showInvite, setShowInvite] = useState(false);
    const [emailsInput, setEmailsInput] = useState(['', '', '']);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [selectedStatus] = useState<string | null>(null);
    const [modalType, setModalType] = useState<string | null>(null);
    const { findAllWorkspacesResponse, findAllWorkspacesLoading } = useWorkspace({ callWorkspaces: true });
    const [createInvite, { isLoading }] = useCreateInviteMutation();
    const { findRolesResponse } = useRole({ callRoles: true });
    const {
        handleOnSelectModule,
        workspaceType,
        form: workspaceForm,
        isLoading: workspaceLoading,
        moduleValues,
        onSubmit,
        setWorkspaceType,
        setShowModal,
        showModal: workspaceShowModal,
        handleModalClose
    } = useCreateWorkspace();
    const addInput = () => {
        if (emailsInput.length < 10) {
            setEmailsInput([...emailsInput, '']);
        }
    };
    const removeInput = () => {
        setEmailsInput(emailsInput.slice(0, -1));
    };

    const form = useForm({
        resolver: zodResolver(inviteFormSchema),
        defaultValues: {
            emails: ['', '', '']
        }
    });

    const handleFormSubmit = async (values: { emails: string[] }) => {
        if (currentWorkspace?._id) {
            const payload = {
                emails: values.emails,
                workspace: currentWorkspace?._id,
                redirectLink: process.env.NEXT_PUBLIC_REDIRECT_URL || ''
            };
            try {
                await createInvite(payload).unwrap();
                setShowInvite(false);
                form.reset();
                toast({
                    description: 'Invitation sent successfully!',
                    title: 'Members Invitation'
                });
            } catch (error) {
                toast({
                    description: 'Something went wrong!',
                    title: 'Members Invitation'
                });
            }
        }
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

    const handleOpenModal = (type: string, role?: RolesDataResponse) => {
        if (type === 'edit-role' && role) {
            setSingleRole(role);
        }
        setModalType(type);
        setShowInvite(true);
    };

    const handleClose = () => {
        setSingleRole(null);
        setModalType(null);
        setShowInvite(false);
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
                                onClickEdit={handleOpenModal}
                                findRolesResponse={findRolesResponse?.data}
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
                            <Button onClick={() => setShowModal(true)} className="text-xs h-8 rounded bg-primary-0">
                                Create Workspace
                            </Button>
                        </section>
                        <section>
                            {findAllWorkspacesLoading ? (
                                <div className="pt-10">
                                    <StarLoader />
                                </div>
                            ) : findAllWorkspacesResponse && findAllWorkspacesResponse?.length > 0 ? (
                                <section className="flex flex-col gap-4 mt-6">
                                    {findAllWorkspacesResponse &&
                                        findAllWorkspacesResponse.map((workspace) => (
                                            <div
                                                key={workspace?._id}
                                                className="flex bg-white border border-[#e3e3e3] px-3 py-2 rounded justify-between items-center "
                                            >
                                                <div className="flex items-center gap-4">
                                                    <Image
                                                        src={'/images/send-icon.png'}
                                                        width={44}
                                                        height={44}
                                                        alt="send"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-semibold">{workspace?.name}</p>
                                                        <p className="text-xs text-[#83899F]">
                                                            {workspace?.members?.length} Members
                                                        </p>
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
                            ) : (
                                <div className="text-center text-sm">No avaliable workspace</div>
                            )}
                        </section>
                    </section>
                </>
            )}
            <ShadModal
                onClose={handleClose}
                showModel={showInvite}
                setShowModal={setShowInvite}
                className={`relative ${modalType === 'user' ? 'max-w-2xl' : 'max-w-md'} p-4`}
            >
                {modalType === 'invite' && (
                    <InviteModal
                        removeInput={removeInput}
                        handleFormSubmit={handleFormSubmit}
                        form={form}
                        emailsInput={emailsInput}
                        addInput={addInput}
                        isLoading={isLoading}
                    />
                )}
                {modalType === 'user' && <UserModal onClose={() => setShowInvite(false)} />}
                {(modalType === 'create-role' || modalType === 'edit-role') && (
                    <CreateRole onClose={handleClose} singleRole={singleRole} />
                )}
            </ShadModal>
            <Modal isOpen={workspaceShowModal} onClose={handleModalClose} className={`relative max-w-lg`}>
                <FormProvider {...workspaceForm}>
                    <CreateWorkSpace
                        form={workspaceForm}
                        setWorkspaceType={setWorkspaceType}
                        workspaceType={workspaceType}
                        moduleValues={moduleValues}
                        onSubmit={onSubmit}
                        isLoading={workspaceLoading}
                        handleOnSelectModule={handleOnSelectModule}
                    />
                </FormProvider>
            </Modal>
        </div>
    );
};

export default WorkspaceScreen;
