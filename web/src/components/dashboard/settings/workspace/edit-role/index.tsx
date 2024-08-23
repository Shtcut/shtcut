import { Button, Checkbox, Input, Label } from '@shtcut-ui/react';
import { X } from 'lucide-react';
import React, { useState } from 'react';
const EditRole = ({ onClose }: { onClose: () => void }) => {
    const roles = [
        'View Dashboard',
        'Create  & edit  QR Code',
        'Create & edit  Short link',
        'Create & edit  Domain',
        'Create & edit  Links-in-bio',
        'View Analytics'
    ];
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const handleCheckboxChange = (role: string) => {
        setSelectedRoles((prevSelectedRoles) =>
            prevSelectedRoles.includes(role)
                ? prevSelectedRoles.filter((item) => item !== role)
                : [...prevSelectedRoles, role]
        );
    };
    return (
        <div className="px-4">
            <div className="flex items-center justify-between border-b pt-2 pb-4">
                <h1 className="font-medium">Edit Role</h1>
                <X onClick={onClose} size={18} />
            </div>
            <section className="mt-4 border-b pb-6">
                <Label className=" font-medium">Role Name</Label>
                <Input placeholder="Enter Name" className="mt-2 h-10" />
            </section>
            <div className="mt-2 border-b pb-6 flex flex-col pt-4 gap-4">
                {roles.map((role, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <Checkbox
                            id={role}
                            checked={selectedRoles.includes(role)}
                            onCheckedChange={() => handleCheckboxChange(role)}
                        />
                        <Label htmlFor={role} className="ml-2 text-xs text-[#464748] font-medium">
                            {role}
                        </Label>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-4 mt-6">
                <Button variant={'outline'} className="w-full h-9 text-xs">
                    Cancel
                </Button>
                <Button className="w-full h-9 text-xs bg-primary-0 ">Create Role</Button>
            </div>
        </div>
    );
};

export default EditRole;
