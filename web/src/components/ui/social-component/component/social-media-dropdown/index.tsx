'use client';
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@shtcut-ui/react';
import { socialDropdown } from '@shtcut/_shared/data';
import Image from 'next/image';
const SocialMediaDropdown = ({ handleSelect }: { handleSelect: (val: string) => void }) => {
    const [selectedSocial, setSelectedSocial] = useState<{ img: string; name: string } | null>(null);

    const handleValueChange = (value: string) => {
        const selected = socialDropdown.find((social) => social.name.toLowerCase() === value);
        if (selected) {
            setSelectedSocial(selected);
            handleSelect(value);
        }
    };
    return (
        <div>
            <Select onValueChange={handleValueChange}>
                <SelectTrigger id="select-short-link" className=" text-sm text-[#2B3034]  shadow-none  w-32  ">
                    {selectedSocial ? (
                        <div className="flex items-center gap-2 text-xs">
                            <Image width={16} height={16} src={selectedSocial.img} alt={selectedSocial.name} />
                            {selectedSocial.name}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-xs">
                            <Image width={16} height={16} src={'/social/instagram.png'} alt={'instagram'} />
                            Instagram
                        </div>
                    )}
                </SelectTrigger>
                <SelectContent>
                    {socialDropdown.map((social) => (
                        <SelectItem
                            key={social.name.toLowerCase()}
                            value={social.name.toLowerCase()}
                            className="text-sm text-[#2B3034]"
                        >
                            <div className="flex items-center gap-2 text-xs">
                                <Image width={16} height={16} src={social.img} alt={social.name} className="" />
                                {social.name}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default SocialMediaDropdown;
