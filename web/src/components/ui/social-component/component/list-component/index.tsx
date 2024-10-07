import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shtcut-ui/react';
import { Calendar, Flag } from 'lucide-react';

import React from 'react';

const ListComponent = () => {
    const headers = ['Name', 'Assignee', 'Due Date', 'Priority '];
    return (
        <div>
            <Table className=" mt-4">
                <TableHeader>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableHead key={index} className="  text-black text-xs">
                                {header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className=" bg-white border-b cursor-pointer">
                    {[1, 2, 3, 4, 5].map((data) => (
                        <TableRow className=" " key={data}>
                            <TableCell className="font-medium py-4  text-xs">Improve cards readability</TableCell>
                            <TableCell className="">
                                <div className="font-medium  text-xs flex gap-x-2 items-center">
                                    <div className="w-7 h-7 rounded-full flex justify-center items-center bg-[#ea4335] text-xs text-white">
                                        ST
                                    </div>{' '}
                                    Stephen Adebayo
                                </div>
                            </TableCell>
                            <TableCell className="">
                                <div className="font-medium  text-xs flex gap-x-2 items-center">
                                    <Calendar size={14} /> 22/10/2024
                                </div>
                            </TableCell>
                            <TableCell className="">
                                <div className="font-medium  text-xs flex gap-x-2">
                                    <Flag color="#C03744" size={14} />
                                    High
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ListComponent;
