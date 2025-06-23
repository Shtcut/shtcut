// hooks/useWorkspaceData.ts
import { useEffect } from 'react';
import { useWorkspace } from '@shtcut/hooks';
import { RootState, useAppDispatch } from '@shtcut/redux/store';
import { useSelector } from 'react-redux';
import { setActiveWorkspace } from '@shtcut/redux/slices/workspace';

export const useWorkspaceData = () => {
    const dispatch = useAppDispatch();
    const {
        findAllWorkspacesResponse,
        triggerSwitchWorkspace,
        switchWorkspaceLoading,
        triggerWorkspaces: triggerNonDefaultWorkspaces
    } = useWorkspace({
        callWorkspaces: true,
        callSwitchWorkspace: true,
        filter: { isDefault: false }
    });
    const {
        findAllWorkspacesResponse: findWorkSpaceData,
        triggerWorkspaces: triggerDefaultWorkspace,
        findAllWorkspacesLoading
    } = useWorkspace({
        callWorkspaces: true,
        callSwitchWorkspace: true,
        filter: { isDefault: true }
    });
    useEffect(() => {
        if (Array.isArray(findWorkSpaceData?.data) && findWorkSpaceData.data.length > 0) {
            dispatch(setActiveWorkspace(findWorkSpaceData.data[0]));
        }
    }, [findWorkSpaceData, dispatch]);

    const activeWorkspace = useSelector((state: RootState) => state.workspace.activeWorkspace);
    const activeWorkspaceName = activeWorkspace?.name ?? findWorkSpaceData?.data?.[0]?.name;
    return {
        findAllWorkspacesResponse,
        findAllWorkspacesLoading,
        findWorkSpaceData,
        activeWorkspace,
        activeWorkspaceName,
        switchWorkspaceLoading,
        triggerSwitchWorkspace,
        triggerWorkspaces: () => {
            triggerNonDefaultWorkspaces();
            triggerDefaultWorkspace();
        }
    };
};
