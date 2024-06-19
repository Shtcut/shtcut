import { AppObject } from '../index';
import { UserNamespace } from '../user';

export namespace WorkspaceNameSpace {
    export interface Workspace extends AppObject {
        _id: string;
        publicId: string;
        user: string | UserNamespace.LoggedInUser;
        isDefault: boolean;
        name: string;
        slug: string;
        modules: string[];
        type: string;
        domains: string[];
        subscriptions: string[];
        logo: string;
    }

    export interface WorkspaceRequest extends ApiRequest {
        payload?: {
            _id?: string;
            id?: string;
            name: string;
            slug: string;
            type?: string;
            plan: string;
            module: string;
        };
    }
}
