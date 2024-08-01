import { Checkbox } from '@shtcut-ui/react';
import React from 'react';
import { Clock3 } from 'lucide-react';
import { Globe, Calendar } from 'lucide-react';
import DomainActions from '../domain-actions';

const DomainsCard = ({ edit, handleModalCn }: { handleModalCn: (open: boolean) => void; edit?: any }) => {
    return (
        <div className="bg-white  cursor-pointer rounded-[10px] p-4 border bg-card ">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-3">
                    {!edit && (
                        <div className="relative top-1">
                            <Checkbox id="terms" className="p-0 m-0 border shadow-none border-[#D2D5DA] " />
                        </div>
                    )}
                    <div className=" bg-[#fafafa] w-[50px] h-[50px] rounded-[10px] flex justify-center items-center">
                        <Globe size={18} />
                    </div>
                    <div className="">
                        <div>
                            <h1 className="font-semibold text-sm text-[#151314]">amandadaniels.com</h1>
                            <p className="text-xs text-primary-0 font-normal">No redirect configured</p>
                        </div>
                        <div className="flex items-center gap-x-2 mt-2">
                            <Calendar size={16} />
                            <span className="text-[#726C6C] text-xs font-medium">Oct 15, 2024</span>
                        </div>
                    </div>
                </div>
                <div>
                    <DomainActions handleModalCn={handleModalCn} />
                </div>
            </div>
        </div>
    );
};

export default DomainsCard;
