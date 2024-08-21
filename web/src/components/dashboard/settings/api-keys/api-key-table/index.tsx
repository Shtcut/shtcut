import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shtcut-ui/react';
import { headers } from 'next/headers';
import React from 'react';
import ActionsTable from '../action-table';

const ApiKeyDataTable = ({ headers, data }: { headers: string[]; data: number[] }) => {
    return (
        <div>
            <Table className='border mt-6'>
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
                    {data.map((list, index) => (
                        <TableRow key={index} className=" ">
                            <TableCell className="font-medium py-4  text-xs">Trust vain</TableCell>
                            <TableCell className="font-medium text-[#5A5555]  text-xs py-2">8e3...</TableCell>
                            <TableCell className="font-medium text-[#5A5555] text-xs ">Today</TableCell>
                            <TableCell className="font-medium text-[#5A5555] ">
                                <ActionsTable />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApiKeyDataTable;
