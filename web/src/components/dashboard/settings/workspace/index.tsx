import { Button, toast } from '@shtcut-ui/react';
import React, { useState } from 'react';
import MembersTable from '../../members/members-table';
import { SearchInput } from '../../nav-component';
import { FormProvider, useForm } from 'react-hook-form';
import Tabs from '@shtcut/components/_shared/Tabs';
import RolesTable from '@shtcut/components/workspace-table';
import InviteModal from './invite-modal';
import UserModal from './user-modal';
import CreateRole from './create-role';
import { useWorkspace } from '@shtcut/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { inviteFormSchema } from '@shtcut/components/form/auth/sign-up-form/validation';
import { useCurrentWorkSpace } from '@shtcut/hooks/current-workspace';
import { useRole } from '@shtcut/hooks/roles';
import { RolesDataResponse } from '@shtcut/types/workspace';
import CreateWorkSpace from '@shtcut/containers/work-space/work-space-modal';
import { useCreateWorkspace } from '@shtcut/hooks/current-workspace/create-workspace';
import Modal from '@shtcut/components/modal';
import PaginationActions from '@shtcut/components/pagination-component';
import { useMembers } from '@shtcut/hooks/members';
import { handleError } from '@shtcut/_shared';
import SkeletonPlaceholder from '@shtcut/components/skeleton-placeholder';
import InitialsAvatar from '@shtcut/components/initial-avatar';
import { CgArrowLongLeft } from 'react-icons/cg';
import DeleteRole from './delete-role';

const WorkspaceScreen = () => {
    const currentWorkspace = useCurrentWorkSpace();
    const [ids, setIds] = useState('');
    const [singleRole, setSingleRole] = useState<RolesDataResponse | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showMember, setShowMember] = useState(false);
    const [showInvite, setShowInvite] = useState(false);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [modalType, setModalType] = useState<string | null>(null);
    const {
        findAllWorkspacesResponse,
        findAllWorkspacesLoading,
        pagination,
        paginationActions,
        getWorkSpaceData,
        getWorkspaceLoading
    } = useWorkspace({
        callWorkspaces: true,
        id: ids
    });
    const { createInvite, isLoadingState, setLoadingState } = useMembers({
        callMembers: true
    });
    const {
        findRolesResponse,
        isLoading: findRoleLoading,
        handleDeleteRole,
        deleteRoleResponse,
        findRoles,
        params,
        isLoadingState: findIsLoadingState
    } = useRole({
        callRoles: Boolean(ids),
        workspace: ids || undefined
    });

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
        const currentEmails = form.getValues('emails');
        if (currentEmails.length < 10) {
            form.setValue('emails', [...currentEmails, '']);
        }
    };

    const removeInput = () => {
        const currentEmails = form.getValues('emails');
        if (currentEmails.length > 3) {
            form.setValue('emails', currentEmails.slice(0, -1));
        }
    };

    const form = useForm({
        resolver: zodResolver(inviteFormSchema),
        defaultValues: {
            emails: ['']
        }
    });

    const handleFormSubmit = async (values: { emails: string[] }) => {
        if (values.emails.length === 0) {
            toast({
                description: 'Please enter at least one valid email address.',
                title: 'Members Invitation',
                variant: 'destructive'
            });
            return;
        }
        if (!currentWorkspace?._id) {
            toast({
                description: 'Workspace is undefined switch your workspace  ',
                title: 'Switch Workspace',
                variant: 'destructive'
            });
            return;
        }
        if (currentWorkspace?._id) {
            setLoadingState('creating', true);
            const filteredEmails = values.emails.filter((email) => email.trim() !== '');
            const payload = {
                emails: filteredEmails,
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
                handleError({ error });
            } finally {
                setLoadingState('creating', false);
            }
        }
    };

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
        if (type === 'delete-role' && role) {
            setSingleRole(role);
        }
        setModalType(type);
        setShowInvite(true);
    };

    const handleClose = () => {
        setSingleRole(null);
        setModalType(null);
        setShowInvite(false);
        form.reset();
    };

    const handleMemberId = (val: string) => {
        setIds(val);
        setShowMember(true);
    };

    const handleDeleteARole = async () => {
        setLoadingState('deleting', true);
        if (singleRole?._id) {
            try {
                await handleDeleteRole(singleRole?._id);
                const successMessage = deleteRoleResponse?.meta?.message || 'Role deleted successfully.';
                toast({
                    title: 'Role Deleted',
                    description: successMessage,
                    variant: 'default'
                });
                findRoles(params);
                handleClose();
            } catch (error) {
                handleError({ error });
            } finally {
                setLoadingState('deleting', false);
            }
        }
    };

    return (
        <div>
            {showMember ? (
                <>
                    <section>
                        <section className="flex justify-between gap-8 items-center w-full">
                            <section className="h-12 flex items-center w-full px-4 border border-[#e3e3e3] bg-[#f7f7f7] rounded-[4px]">
                                <h3 className="font-semibold text-sm">{currentWorkspace?.name}</h3>
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
                        <section
                            className="my-6 cursor-pointer"
                            onClick={() => {
                                setShowMember(false);
                                setIds('');
                            }}
                        >
                            <CgArrowLongLeft />
                        </section>
                        <div className="flex  items-center justify-between flex-wrap md:flex-nowrap   pb-4 dark:bg-gray-900">
                            <div className="w-40">
                                <Tabs tabs={tabs} selectedTabIndex={selectedTabIndex} onTabClick={handleTabChange} />
                            </div>

                            <div className="flex items-center space-x-[12px]">
                                <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                        </div>
                        {selectedTabIndex === 0 && (
                            <MembersTable
                                findMembersResponse={getWorkSpaceData}
                                searchQuery={searchQuery}
                                isLoading={getWorkspaceLoading}
                            />
                        )}
                        {selectedTabIndex === 1 && (
                            <RolesTable
                                // onClickViewUser={() => handleOpenModal('user')}
                                isLoading={findRoleLoading}
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
                                    <SkeletonPlaceholder width="100%" count={6} height="60px" />
                                </div>
                            ) : findAllWorkspacesResponse && findAllWorkspacesResponse?.data.length > 0 ? (
                                <section className="flex flex-col gap-4 mt-6">
                                    {findAllWorkspacesResponse &&
                                        findAllWorkspacesResponse?.data.map((workspace) => (
                                            <div
                                                key={workspace?._id}
                                                className="flex bg-white border border-[#e3e3e3] px-3 py-2 rounded justify-between items-center "
                                            >
                                                <div className="flex items-center gap-4">
                                                    <InitialsAvatar name={workspace?.name} size={44} />
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
                                                    onClick={() => handleMemberId(workspace?._id)}
                                                >
                                                    Manage workspace
                                                </Button>
                                            </div>
                                        ))}
                                </section>
                            ) : (
                                <div className="text-center text-sm">No avaliable workspace</div>
                            )}
                            <section>
                                <PaginationActions
                                    totalItems={findAllWorkspacesResponse?.meta.pagination.totalCount ?? 0}
                                    initialPage={pagination.page}
                                    initialPageSize={pagination.perPage}
                                    onPageChange={paginationActions.handlePageChange}
                                />
                            </section>
                        </section>
                    </section>
                </>
            )}
            <Modal onClose={handleClose} isOpen={showInvite} className={`relative max-w-md p-4`}>
                {modalType === 'invite' && (
                    <InviteModal
                        removeInput={removeInput}
                        handleFormSubmit={handleFormSubmit}
                        form={form}
                        emailsInput={form.watch('emails')}
                        addInput={addInput}
                        isLoading={isLoadingState}
                        handleClose={handleClose}
                    />
                )}
                {modalType === 'user' && <UserModal onClose={() => setShowInvite(false)} />}
                {(modalType === 'create-role' || modalType === 'edit-role') && (
                    <CreateRole onClose={handleClose} singleRole={singleRole} />
                )}
                {modalType === 'delete-role' && (
                    <DeleteRole
                        onClose={handleClose}
                        deleteRole={handleDeleteARole}
                        findIsLoadingState={findIsLoadingState}
                    />
                )}
            </Modal>
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
