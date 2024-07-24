import React from 'react';
import SelectValue from '../../select-value';
import { HiUserGroup } from 'react-icons/hi';
import { RiUserFill } from 'react-icons/ri';
import TeamForm from '../../team-form';
import { PropsCreate } from '@shtcut/types/types';

const HowTopPlan = ({ userValue, handleOptionChange, form }: PropsCreate) => {
    return (
        <div>
            <div className="flex items-center gap-x-5 justify-center w-full ">
                <SelectValue
                    label="With my team"
                    value="team"
                    selected={userValue === 'team'}
                    onSelect={handleOptionChange}
                    description="Collaborate with team members"
                    icon={<HiUserGroup size={24} />}
                />
                <SelectValue
                    label="For my self"
                    value="myself"
                    selected={userValue === 'myself'}
                    onSelect={handleOptionChange}
                    description="For a private project for myself"
                    icon={<RiUserFill size={24} />}
                />
            </div>
            <div className="flex items-center gap-x-3 my-3">
                <TeamForm form={form} />
            </div>
        </div>
    );
};

export default HowTopPlan;
