import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shtcut-ui/react';
import React from 'react';
import ActionsTable from './action-table';

const RolesTable = ({ onClickViewUser, onClickEdit }: { onClickViewUser: () => void; onClickEdit: () => void }) => {
    const headers = ['Roles', 'Users assigned', 'Last Updated', 'Status', ''];
    return (
        <div>
            <Table className="border mt-6">
                <TableHeader>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableHead key={index} className="text-[#667085] font-normal text-sm">
                                {header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className=" bg-white border-b cursor-pointer">
                    {[1, 2, 3, 4, 5].map((data) => (
                        <TableRow className=" " key={data}>
                            <TableCell className="font-medium py-4  text-xs">Super Admin</TableCell>
                            <TableCell className="font-medium text-[#5A5555]  text-xs py-2">01</TableCell>
                            <TableCell className="font-medium text-[#5A5555] text-xs ">
                                April 29th, 2023 12:30pm
                            </TableCell>
                            <TableCell className="font-medium text-[#5A5555] text-xs ">Active</TableCell>
                            <TableCell className="font-medium text-[#5A5555] ">
                                <ActionsTable onClickViewUser={onClickViewUser} onClickEdit={onClickEdit} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default RolesTable;
