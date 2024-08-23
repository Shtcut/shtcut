import { Card, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shtcut-ui/react';
import { X } from 'lucide-react';
import React from 'react';

const UserModal = ({ onClose }: { onClose: () => void }) => {
    const headers = ['User', 'Email', 'Date Added', 'Status'];
    const data = [1, 2, 3, 4, 5];

    return (
        <div className="">
            <div className="flex items-center justify-between border-b pt-2 pb-4">
                <h1 className="font-medium">Admin</h1>
                <X onClick={onClose} size={18} />
            </div>
            <Card className="shadow-sm mt-6">
                <Table className="">
                    <TableHeader>
                        <TableRow>
                            {headers.map((header, index) => (
                                <TableHead key={index} className="text-[#141414] font-medium text-xs">
                                    {header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody className=" cursor-pointer">
                        {data.map((item, index) => (
                            <TableRow key={index} className={index !== data.length - 1 ? 'border-b' : ' '}>
                                <TableCell
                                    className={`font-medium py-4 text-xs  ${index !== data.length - 1 ? 'rounded-bl-md' : ' '}`}
                                >
                                    Super Admin
                                </TableCell>
                                <TableCell className="font-medium text-[#5A5555] text-xs py-2">01</TableCell>
                                <TableCell className="font-medium text-[#5A5555] text-xs flex items-center gap-2">
                                    April 29th, 2023 <span> 12:30pm</span>
                                </TableCell>
                                <TableCell
                                    className={`font-medium     text-[#5A5555] text-xs ${index !== data.length - 1 ? 'rounded-br-md' : ' '}  `}
                                >
                                    <div className="w-16 bg-[#ECFDF3] text-[#027A48] py-2 flex items-center justify-center rounded-2xl">
                                        Active
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
};

export default UserModal;
