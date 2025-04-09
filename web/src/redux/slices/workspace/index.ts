import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkspaceNameSpace } from '@shtcut/_shared/namespace/workspace';

interface WorkspaceState {
    activeWorkspace: WorkspaceNameSpace.Workspace | null;
}

const initialState: WorkspaceState = {
    activeWorkspace: null
};

const workspaceSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        setActiveWorkspace: (state, action: PayloadAction<WorkspaceNameSpace.Workspace>) => {
            state.activeWorkspace = action.payload;
        },
        clearActiveWorkspace: (state) => {
            state.activeWorkspace = null;
        }
    }
});

export const { setActiveWorkspace, clearActiveWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;
