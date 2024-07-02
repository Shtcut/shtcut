import { Checkbox } from '@shtcut-ui/react';
import Image from 'next/image';
import React from 'react';
import { Clock3 } from 'lucide-react';
import { Tag } from 'lucide-react';
import CardsActions from '../card-actions';

const LinkListedComponent = ({ data, edit }: { edit?: boolean; data?: any }) => {
    return (
        <div className="bg-white  drop-shadow-sm border cursor-pointer border-gray-50 rounded-[10px] p-4">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-3">
                    {!edit && (
                        <div className="relative top-1">
                            <Checkbox id="terms" className="p-0 m-0 border shadow-none border-[#D2D5DA] " />
                        </div>
                    )}
                    <div className="shadow border border-gray-50 w-[50px] h-[50px] rounded-[10px] flex justify-center items-center">
                        <Image src={'/images/figma.png'} width={26} height={26} alt="figma" />
                    </div>
                    <div className="">
                        <div>
                            <h1 className="font-semibold text-[#151314]">Figma</h1>
                            <p className="text-sm text-primary-0 font-normal">shrtcutdribble/34567f</p>
                            <p className="text-[#2B2829] text-sm">
                                https://dribble.com/shots/1971969600-justadmin-Finance-SaaS-Hero
                            </p>
                        </div>
                        <div className="flex items-center gap-x-2 mt-2">
                            <Clock3 size={16} />
                            <span className="text-[#726C6C] text-xs font-medium">Oct 15, 2024</span>
                            <div className="flex items-center space-x-1 w-[60px] h-6  rounded justify-center border bg-[#ECFFFC] border-[#0B7B69]">
                                <Tag size={16} color="#0B7B69" />
                                <span className="text-xs text-[#0B7B69]">Tags</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <CardsActions edit={edit} />
                </div>
            </div>
        </div>
    );
};

export default LinkListedComponent;
