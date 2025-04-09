// hooks/useWorkspaceData.ts
import { useEffect } from 'react';
import { useWorkspace } from '@shtcut/hooks';
import { RootState, useAppDispatch } from '@shtcut/redux/store';
import { useSelector } from 'react-redux';
import { setActiveWorkspace } from '@shtcut/redux/slices/workspace';

export const useWorkspaceData = () => {
    const dispatch = useAppDispatch();

    // Fetch non-default workspaces
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

    // Fetch default workspace
    const { findAllWorkspacesResponse: findWorkSpaceData, triggerWorkspaces: triggerDefaultWorkspace } = useWorkspace({
        callWorkspaces: true,
        callSwitchWorkspace: true,
        filter: { isDefault: true }
    });

    // Automatically set active workspace when default workspace data loads
    useEffect(() => {
        if (findWorkSpaceData && findWorkSpaceData[0]) {
            dispatch(setActiveWorkspace(findWorkSpaceData[0]));
        }
    }, [findWorkSpaceData, dispatch]);

    const activeWorkspace = useSelector((state: RootState) => state.workspace.activeWorkspace);
    const activeWorkspaceName = activeWorkspace?.name ?? findWorkSpaceData?.[0]?.name;

    return {
        // Data
        findAllWorkspacesResponse,
        findWorkSpaceData,
        activeWorkspace,
        activeWorkspaceName,

        // Loading states
        switchWorkspaceLoading,

        // Methods
        triggerSwitchWorkspace,
        triggerWorkspaces: () => {
            triggerNonDefaultWorkspaces();
            triggerDefaultWorkspace();
        }
    };
};
