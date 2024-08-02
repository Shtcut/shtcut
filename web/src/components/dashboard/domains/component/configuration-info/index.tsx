import React from 'react';
import { Info } from 'lucide-react';
import { IoCopyOutline } from 'react-icons/io5';

const ConfigurationInfo = () => {
    return (
        <div className="mt-4">
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F6F6F8] rounded w-full flex items-center px-2 h-12">
                    <p className="text-tertiary-600 text-sm font-medium">
                        Type: <span>A</span>{' '}
                    </p>
                </div>
                <div className="bg-[#F6F6F8] rounded w-full flex items-center px-2 h-12">
                    <p className="text-tertiary-600 text-sm font-medium">
                        Name: <span>www</span>{' '}
                    </p>
                </div>
                <div className="bg-[#F6F6F8] text-tertiary-600 rounded w-full flex items-center justify-between px-2 h-12 ">
                    <div className="flex items-center gap-1">
                        <p className="text-tertiary-600 text-sm font-medium ">Value: </p>
                        <p className="text-tertiary-600 text-sm font-medium ">76.33.23.34</p>
                    </div>
                    <IoCopyOutline size={14} />
                </div>
                <div className="bg-[#F6F6F8] rounded w-full flex items-center px-2 h-12">
                    <p className="text-tertiary-600 text-sm font-medium">
                        TTL: <span>45653</span>{' '}
                    </p>
                </div>
            </div>
            <div className="flex mt-3  text-primary-0 gap-2">
                <Info size={16} />
                <p className="text-xs text-primary-0">
                    If a TTL value is not available, choose the highest available. This may take up to 12 hours{' '}
                </p>
            </div>
        </div>
    );
};

export default ConfigurationInfo;
