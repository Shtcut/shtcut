import Tabs from '@shtcut/components/_shared/Tabs';
import React, { useState, useEffect } from 'react';
import {
    ApiKeysScreen,
    BillingsScreen,
    GeneralScreen,
    NotificationScreen,
    SecurityScreen,
    TagsScreen,
    WorkspaceScreen
} from './component';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

const SettingComponent = () => {
    const params = useParams();
    const { module, workspace } = params;
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryTag = searchParams.get('tag') || 'general';

    const tabs = [
        { id: 'general', label: 'General' },
        { id: 'tags', label: 'Tags' },
        { id: 'billings', label: 'Billing' },
        { id: 'workspace', label: 'Workspace' },
        { id: 'security', label: 'Security' },
        { id: 'notification', label: 'Notification' },
        { id: 'api-keys', label: 'API Keys' }
    ];

    const [selectedTabIndex, setSelectedTabIndex] = useState(() => {
        const index = tabs.findIndex((tab) => tab.id === queryTag);
        return index !== -1 ? index : 0;
    });

    const handleTabClick = (index: number, tag: string) => {
        router.push(`/${module}/${workspace}/settings?tag=${tag}`);
        setSelectedTabIndex(index);
    };

    useEffect(() => {
        const index = tabs.findIndex((tab) => tab.id === queryTag);
        if (index !== -1) {
            setSelectedTabIndex(index);
        }
    }, [queryTag]);

    return (
        <div className='px-10'>
            <div className="">
                <h1 className="font-semibold text-[#2B2829] text-xl">Settings</h1>
            </div>
            <div className="w-2/3 mt-7">
                <Tabs
                    selectedTabIndex={selectedTabIndex}
                    onTabClick={(index) => handleTabClick(index, tabs[index].id)}
                    tabs={tabs}
                />
            </div>
            <section className="mt-8 w-full">
                {selectedTabIndex === 0 && <GeneralScreen />}
                {selectedTabIndex === 1 && <TagsScreen />}
                {selectedTabIndex === 2 && <BillingsScreen />}
                {selectedTabIndex === 3 && <WorkspaceScreen />}
                {selectedTabIndex === 4 && <SecurityScreen />}
                {selectedTabIndex === 5 && <NotificationScreen />}
                {selectedTabIndex === 6 && <ApiKeysScreen />}
            </section>
        </div>
    );
};

export default SettingComponent;
