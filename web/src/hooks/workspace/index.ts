import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { Dict } from "@shtcut-ui/react";
import { Pagination } from "@shtcut/_shared/namespace";


interface UseWorkspace {
    key?: string;
    callWorkspace?: boolean;
    search?: string;
    filter?: Dict;
}

interface UseWorkspaceReturnsProps {
    createWorkspace: MutationTrigger<any>;
    findAllWorkspace: MutationTrigger<any>;
    deleteWorkspace: MutationTrigger<any>;
    updateWorkspace: MutationTrigger<any>;
    searchOneWorkspace: MutationTrigger<any>;
    

    pagination: Pagination;

}