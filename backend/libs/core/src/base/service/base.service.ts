import { ClientSession } from 'mongoose';
import * as _ from 'lodash';
import { Dict, Utils } from 'shtcut/core';

export abstract class BaseService {
    protected abstract model: any;
    protected abstract entity: any;
    protected abstract modelName: string;
    protected abstract defaultConfig: any;
    protected abstract routes: any;

    public async createNewObject(obj: Dict, session?: ClientSession): Promise<any> {
        try {
            // Check if this already handles object creation with different types
            const toFill: string[] = this.entity.config.createFillables;
            obj = toFill && toFill.length > 0 ? _.pick(obj, ...toFill) : { ...obj };
            obj.publicId = Utils.generateUniqueId(this.defaultConfig.idToken);
            return await this.model.create([obj], { session });
        } catch (e) {
            throw e;
        }
    }

    public async postFind(data: { queryParser: any; value: any; code: number; message?: string }) {
        return data;
    }
} 