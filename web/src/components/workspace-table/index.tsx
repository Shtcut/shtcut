import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shtcut-ui/react';
import React from 'react';
import ActionsTable from './action-table';
import { RolesDataResponse } from '@shtcut/types/workspace';
import { fullFormatDate } from '@shtcut/_shared/constant';
import SkeletonPlaceholder from '../skeleton-placeholder';

const RolesTable = ({
    onClickEdit,
    findRolesResponse,
    isLoading
}: {
    onClickEdit: (type: string, role: RolesDataResponse) => void;
    findRolesResponse: RolesDataResponse[] | undefined;
    isLoading: boolean;
}) => {
    const headers = ['Roles', 'Last Updated', ''];
    if (isLoading) {
        return (
            <div className="flex flex-col py-12">
                <SkeletonPlaceholder width="100%" count={5} height="60px" />
            </div>
        );
    }

    if (!findRolesResponse || findRolesResponse.length === 0) {
        return <div className="flex justify-center py-12 text-sm text-gray-400">No roles found.</div>;
    }
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
                    {findRolesResponse &&
                        findRolesResponse?.map((role) => (
                            <TableRow className=" " key={role?._id}>
                                <TableCell className="font-medium py-4  text-xs">{role?.title}</TableCell>
                                <TableCell className="font-medium text-[#5A5555] text-xs ">
                                    {fullFormatDate(role?.updatedAt)}
                                </TableCell>

                                <TableCell className="font-medium text-[#5A5555] ">
                                    <ActionsTable
                                        onClickEdit={() => onClickEdit('edit-role', role)}
                                        onClickDelete={() => onClickEdit('delete-role', role)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default RolesTable;
