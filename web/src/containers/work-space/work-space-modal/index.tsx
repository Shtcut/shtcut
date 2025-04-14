import { Button } from '@shtcut-ui/react';
import React, { useState } from 'react';
import Tabs from '@shtcut/components/_shared/Tabs';
import TeamForm from '@shtcut/components/ui/work-space/workspace-main/team-form';
import { ModuleUi } from '@shtcut/components/ui/work-space/workspace-main/steps-ui';
import InviteForm from '@shtcut/components/ui/work-space/workspace-main/invite-form';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';

const CreateWorkSpace = ({
    form,
    workspaceType,
    setWorkspaceType,
    moduleValues,
    onSubmit,
    isLoading,
    handleOnSelectModule
}: any) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const tabs = [
        { id: 'team', label: 'Team' },
        { id: 'personal', label: 'Personal' }
    ];

    const handleTabClick = (index: number) => {
        setSelectedTabIndex(index);
        if (selectedTabIndex === 0) {
            setWorkspaceType('personal');
        } else if (selectedTabIndex === 1) {
            setWorkspaceType('team');
        }
    };

    return (
        <div className="px-6 py-2">
            <div>
                <h1 className="font-medium">Create Workspace</h1>
                <p className="text-sm mt-2 text-[#475467]">
                    Add users and roles, give them more access select an option.
                </p>
                <section className="mt-4">
                    <Tabs tabs={tabs} selectedTabIndex={selectedTabIndex} onTabClick={handleTabClick} />
                </section>

                <section className="mt-4 flex flex-col gap-4 w-full">
                    <section className="flex flex-col gap-2 w-full ">
                        <TeamForm form={form} userValue={workspaceType} />
                    </section>
                    {selectedTabIndex === 0 && (
                        <section className="mt-6">
                            <InviteForm form={form} />
                        </section>
                    )}
                    <section className={`${workspaceType === 'personal' ? 'mt-6' : 'mt-2'}`}>
                        <ModuleUi
                            handleSelect={handleOnSelectModule}
                            modules={moduleValues}
                            userValue={workspaceType}
                            uiUpdate={true}
                        />
                    </section>
                    <section className="flex w-full mt-6  items-center gap-4">
                        <Button variant={'outline'} className="h-9 text-xs rounded w-full">
                            Cancel
                        </Button>
                        <LoadingButton
                            loading={isLoading}
                            className="h-9 text-xs bg-primary-0 rounded w-full"
                            onClick={onSubmit}
                        >
                            Save
                        </LoadingButton>
                    </section>
                </section>
            </div>
        </div>
    );
};

export default CreateWorkSpace;
