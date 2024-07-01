import { Button, Modal } from '@shtcut-ui/react';
import React, { useState } from 'react';
import { MembersTable } from '../..';
import ManageWorkSpaceModal from '../manage-modal';
import SwitchRoleModal from '../switch-role-modal';
import DeleteModal from '../delete-modal';
import AddedModal from '../added-modal';

const OverviewComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<'manage' | 'role' | 'delete' | 'add' | null>(null);

    const handleModalVisibility = (content: 'manage' | 'role' | 'delete' | 'add' | null) => {
        setModalContent(content);
        setIsModalOpen(!!content);
    };

    return (
        <div>
            <div className="flex justify-between mt-[38px] items-center">
                <h1 className="font-semibold text-[#2B2829] text-2xl">Timeweb</h1>
                <Button onClick={() => handleModalVisibility('manage')} className="bg-primary-0">
                    Manage Workspace
                </Button>
            </div>
            <div className="bg-white rounded-[10px] py-[24px] px-[45px] mt-8">
                <MembersTable
                    onOpenRole={() => handleModalVisibility('role')}
                    onOpenDelete={() => handleModalVisibility('delete')}
                    onOpenAdded={() => handleModalVisibility('add')}
                />
            </div>
            <Modal
                showModel={isModalOpen}
                setShowModal={setIsModalOpen}
                showCloseIcon={modalContent === 'add' ? false : modalContent === 'delete' ? false : true}
                onClose={() => handleModalVisibility(null)}
                className={`px-[24px] z-50 bg-gray-50  ${modalContent === 'add' ? 'max-w-sm' : modalContent === 'delete' ? 'max-w-sm' : modalContent === 'role' ? 'max-w-sm' : 'max-w-lg'}`}
            >
                {modalContent === 'manage' && <ManageWorkSpaceModal />}
                {modalContent === 'role' && <SwitchRoleModal />}
                {modalContent === 'delete' && <DeleteModal onClose={() => handleModalVisibility(null)} />}
                {modalContent === 'add' && <AddedModal onClose={() => handleModalVisibility(null)} />}
            </Modal>
        </div>
    );
};

export default OverviewComponent;
