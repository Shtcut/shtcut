import { ApiRequest, AppObject } from '..';
import { WorkspaceNameSpace } from '../workspace';

export namespace UserNamespace {
    export interface LoggedInUser extends AppObject {
        email: string;
        firstName: string;
        lastName: string;
        publicId: string;
        workspaces?: WorkspaceNameSpace.Workspace[];
    }
}


