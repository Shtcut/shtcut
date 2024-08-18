import Tabs from '@shtcut/components/_shared/Tabs';
import React, { useState } from 'react';
import {
    ApiKeysScreen,
    BillingsScreen,
    GeneralScreen,
    NotificationScreen,
    SecurityScreen,
    TagsScreen,
    WorkspaceScreen
} from './component';

const SettingComponent = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const tabs = [
        { id: 'general', label: 'General' },
        { id: 'tags', label: ' Tags' },
        { id: 'billings', label: 'Billing' },
        { id: 'workspace', label: 'Workspace' },
        { id: 'security', label: 'Security' },
        { id: 'notification', label: 'Notification' },
        { id: 'api-keys', label: 'API Keys' }
    ];
    const handleTabClick = (index: number) => {
        setSelectedTabIndex(index);
    };
    return (
        <div>
            <div className="">
                <h1 className="font-semibold text-[#2B2829] text-xl">Settings</h1>
            </div>
            <div className="w-1/2 mt-7">
                <Tabs selectedTabIndex={selectedTabIndex} onTabClick={handleTabClick} tabs={tabs} />
            </div>
            <section>
                {selectedTabIndex === 1 && <GeneralScreen />}
                {selectedTabIndex === 2 && <TagsScreen />}

                {selectedTabIndex === 3 && <BillingsScreen />}

                {selectedTabIndex === 4 && <WorkspaceScreen />}
                {selectedTabIndex === 5 && <SecurityScreen />}
                {selectedTabIndex === 6 && <NotificationScreen />}
                {selectedTabIndex === 7 && <ApiKeysScreen />}
            </section>
        </div>
    );
};

export default SettingComponent;
