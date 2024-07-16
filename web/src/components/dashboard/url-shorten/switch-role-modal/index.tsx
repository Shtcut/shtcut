import { Button, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shtcut-ui/react';
import React from 'react';
import { User } from 'lucide-react';

const SwitchRoleModal = () => {
    const roles = ['Admin', 'HR', 'Manager', 'Developer', 'Designer'];
    return (
        <div className="py-3">
            <h1 className="font-semibold text-lg">Switch User Role</h1>
            <p className="text-[#475467]  mt-2 text-sm">To update users role and give them more access select an option.</p>
            <section className="mt-4">
                <div className="bg-[#FF7BA3] text-white w-[38px] h-[38px] flex justify-center rounded-full items-center float-left mr-2">
                    <p className="text-xs font-medium">AS</p>
                </div>
                <div>
                    <p className="text-sm text-[#5A5555]">Adebayo Stephen</p>
                    <p className="text-[#5A5555] text-sm">stephenadebayo17@gmail.com</p>
                </div>
            </section>
            <div className="flex  flex-col gap-2 mt-4">
                <Label className="text-[#344054]">Role</Label>
                <Select>
                    <SelectTrigger className="">
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        {roles.map((role) => (
                            <SelectItem key={role} value={role.toLowerCase()} className="">
                                <div className="flex items-center gap-x-2">
                                    <User className="" size={18} color="#667085" /> {role}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-x-4 mt-10 w-full">
                <Button variant={'outline'} className="w-full ">
                    Cancel
                </Button>
                <Button className="bg-primary-0 w-full">Confirm</Button>
            </div>
        </div>
    );
};

export default SwitchRoleModal;
