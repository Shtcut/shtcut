import { useParams } from 'next/navigation';
import { useWorkspace } from '..';

export const useCurrentWorkSpace = () => {
    const { findAllWorkspacesResponse } = useWorkspace({ callWorkspaces: true });

    const params = useParams();
    const { workspace: workspaceSlug } = params;

    const currentWorkspace = findAllWorkspacesResponse?.data?.find((workspace) => workspace.slug === workspaceSlug);

    return currentWorkspace || null;
};
