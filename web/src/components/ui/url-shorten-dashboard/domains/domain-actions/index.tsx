import React from 'react';
import { PiChartBar } from 'react-icons/pi';
import FeatureActions from '../feature-actions';
import { Loader, RefreshCcw } from 'lucide-react';

const DomainActions = ({ handleModalCn }: { handleModalCn: (open: boolean) => void }) => {
    return (
        <div className="flex items-center gap-x-6">
            <div className="flex items-center gap-x-2">
                <div
                    className={`text-xs cursor-pointer flex mx-auto items-center w-[83px] justify-center text-primary-0 rounded h-[34px] bg-[#F4F7FF]  font-semibold border gap-x-1 border-primary-0`}
                >
                    <PiChartBar size={16} /> <span>30 Clicks</span>
                </div>

                <div
                    className={`text-xs cursor-pointer flex mx-auto items-center w-[83px] justify-center text-[#CC7914] rounded h-[34px] bg-[#FFF3E5]  font-semibold border gap-x-1 border-[#F4C790]`}
                >
                    <Loader size={16} /> <span>Pending</span>
                </div>
                <div className="bg-[#F5F5F5]  border border-[#B5B3B3] w-[42px] h-[34px] flex items-center justify-center rounded cursor-pointer">
                    <RefreshCcw size={16} />
                </div>
            </div>
            <FeatureActions handleModalCn={handleModalCn} />
        </div>
    );
};

export default DomainActions;
