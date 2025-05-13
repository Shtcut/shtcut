import React from 'react';
import { FormatName } from '@shtcut/_shared/constant';
import { ActionsTable } from '../actions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shtcut-ui/react';
import { highlightText } from '@shtcut/_shared';
import SkeletonPlaceholder from '@shtcut/components/skeleton-placeholder';

const MembersTable = ({
    onOpenRole = () => {},
    onOpenDelete = () => {},
    findMembersResponse,
    searchQuery,
    isLoading
}: {
    onOpenRole?: () => void;
    onOpenDelete?: () => void;
    onOpenAdded?: () => void;
    findMembersResponse?: any;
    searchQuery: string;
    isLoading: boolean;
}) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
    const getColor = (id: number): string => colors[id % colors.length];
    const headers = ['Name', 'Email', 'Role', 'Last active', 'Actions'];
    const members = findMembersResponse?.data || [];

    if (isLoading) {
        return (
            <div className="flex flex-col py-12">
                <SkeletonPlaceholder width="100%" count={6} height="60px" />
            </div>
        );
    }

    if (!isLoading && members.length === 0) {
        return <div className="flex justify-center py-12 text-sm text-gray-400">No members found.</div>;
    }

    return (
        <div className="relative mt-6 overflow-x-auto rounded-[10px] border">
            <Table className="w-full rounded-md">
                <TableHeader>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableHead key={index} className="text-xs text-[#5A5555]">
                                {header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members.map((user) => (
                        <TableRow
                            key={user.id}
                            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <TableCell className="flex items-center gap-x-2 text-[#5A5555]">
                                <div
                                    className={`${getColor(user.id)} w-7 h-7 rounded-full flex justify-center items-center text-white text-xs`}
                                >
                                    {FormatName(user.name || 'N/A')}
                                </div>
                                <p className="text-xs">
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: highlightText(user.name || 'N/A', searchQuery)
                                        }}
                                    />
                                </p>
                            </TableCell>
                            <TableCell className="text-xs text-[#5A5555]">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: highlightText(user.email || 'N/A', searchQuery)
                                    }}
                                />
                            </TableCell>
                            <TableCell className="text-xs text-[#5A5555]">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: highlightText(user.position || 'N/A', searchQuery)
                                    }}
                                />
                            </TableCell>
                            <TableCell className="text-xs text-[#5A5555]">{user.lastActive || 'N/A'}</TableCell>
                            <TableCell>
                                <ActionsTable onOpenRole={onOpenRole} onOpenDelete={onOpenDelete} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default MembersTable;
