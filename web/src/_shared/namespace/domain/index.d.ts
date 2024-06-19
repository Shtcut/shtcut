import { AppObject } from '../index';
import { UserNamespace } from '../user';
import { WorkspaceNameSpace } from '../workspace';

export namespace DomainNameSpace {
    export interface Domain extends AppObject {
        verification: {
            code: string;
            dnsType: string;
            verified: boolean;
        };
        user: string | UserNamespace.LoggedInUser;
        workspace: string | WorkspaceNameSpace.Workspace;
        links: string[];
        name: string;
        slug: string;
        landingPage: string;
        isDefault: boolean;
        type: string;
        banned: boolean;
    }

    export interface DomainRequest extends ApiRequest {
        payload?: {
            _id?: string;
            id?: string;
            name: string;
            workspace: string;
        };
    }
}
