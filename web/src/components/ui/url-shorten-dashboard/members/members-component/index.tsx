import { Button, Modal } from '@shtcut-ui/react';
import React, { useState } from 'react';
import { MembersTable } from '../..';
import ManageWorkSpaceModal from '../manage-modal';
import SwitchRoleModal from '../switch-role-modal';
import DeleteModal from '../delete-modal';
import AddedModal from '../added-modal';
import { SearchInput } from '../../nav-component';
import { ChevronDown, Filter } from 'lucide-react';
import { PiSortDescendingBold } from 'react-icons/pi';
import InviteModal from '../invite-modal';
import { users } from '@shtcut/_shared/data';

const MembersComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<'manage' | 'role' | 'delete' | 'add' | 'invite' | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const handleModalVisibility = (content: 'manage' | 'role' | 'delete' | 'add' | 'invite' | null) => {
        setModalContent(content);
        setIsModalOpen(!!content);
    };
    const filteredData = users.filter((user) => {
        const matchesQuery =
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus ? user.status === selectedStatus : true;
        return matchesQuery && matchesStatus;
    });
    return (
        <div>
            <div className="flex justify-between  items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">Timeweb</h1>
                <Button onClick={() => handleModalVisibility('manage')} className="bg-primary-0 h-8 text-xs rounded">
                    Manage Workspace
                </Button>
            </div>
            <div className="bg-white rounded-[10px] py-[24px] px-[45px] mt-8">
                <div className="flex items-center justify-between flex-wrap md:flex-nowrap   pb-4 dark:bg-gray-900">
                    <div>
                        <h1 className="text-[22px] font-semibold text-[#2B2829]">Members</h1>
                    </div>

                    <div className="flex items-center space-x-[12px]">
                        <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        <Button
                            className="flex  items-center gap-x-2 text-xs  bg-primary-0"
                            onClick={() => handleModalVisibility('invite')}
                        >
                            Invite as Member <ChevronDown size={18} />
                        </Button>
                        <Button className="flex border hover:bg-primary-0 border-[#CCCBCB]  hover:text-white shadow-none text-[#5A5555] items-center bg-white gap-x-2 text-xs">
                            <Filter size={18} /> Filter
                        </Button>
                        <Button className="flex border border-[#CCCBCB]  hover:bg-primary-0 hover:text-white shadow-none text-[#5A5555] items-center bg-white gap-x-2 text-xs">
                            <PiSortDescendingBold size={18} /> Sort by
                        </Button>
                    </div>
                </div>
                <MembersTable
                    searchQuery={searchQuery}
                    onOpenRole={() => handleModalVisibility('role')}
                    onOpenDelete={() => handleModalVisibility('delete')}
                    onOpenAdded={() => handleModalVisibility('add')}
                    filteredData={filteredData}
                />
            </div>
            <Modal
                showModel={isModalOpen}
                setShowModal={setIsModalOpen}
                showCloseIcon={modalContent === 'add' ? false : modalContent === 'delete' ? false : true}
                onClose={() => handleModalVisibility(null)}
                className={`${modalContent === 'invite' ? '' : 'px-[24px]'} z-50 bg-white  ${
                    modalContent === 'add'
                        ? 'max-w-sm'
                        : modalContent === 'delete'
                          ? 'max-w-sm'
                          : modalContent === 'role'
                            ? 'max-w-sm'
                            : modalContent === 'invite'
                              ? 'max-w-sm'
                              : 'max-w-lg'
                }`}
            >
                {modalContent === 'manage' && <ManageWorkSpaceModal />}
                {modalContent === 'invite' && <InviteModal />}
                {modalContent === 'role' && <SwitchRoleModal />}
                {modalContent === 'delete' && <DeleteModal onClose={() => handleModalVisibility(null)} />}
                {modalContent === 'add' && <AddedModal onClose={() => handleModalVisibility(null)} />}
            </Modal>
        </div>
    );
};

export default MembersComponent;
