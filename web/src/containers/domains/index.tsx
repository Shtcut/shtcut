'use client';
import { DomainsComponent } from '@shtcut/components/dashboard';
import React, { useState } from 'react';

const DomainsContainer = () => {
    const [showModal, setShowModal] = useState(false);
    const [cnModal, setCnModal] = useState(false);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const handleModalShow = (open: boolean) => {
        setShowModal(open);
    };
    const handleModalCn = (open: boolean) => {
        setCnModal(open);
    };
    const handleTabClick = (index: number) => {
        setSelectedTabIndex(index);
    };
    return (
        <DomainsComponent
            handleModalShow={handleModalShow}
            showModal={showModal}
            setShowModal={setShowModal}
            handleModalCn={handleModalCn}
            cnModal={cnModal}
            setCnModal={setCnModal}
            selectedTabIndex={selectedTabIndex}
            setSelectedTabIndex={setSelectedTabIndex}
            handleTabClick={handleTabClick}
        />
    );
};

export default DomainsContainer;
