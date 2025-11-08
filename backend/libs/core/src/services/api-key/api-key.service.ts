import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiKey, ApiKeyDocument } from 'shtcut/core';
import { Model } from 'mongoose';

type KeyType = 'test' | 'production' | 'internal';

@Injectable()
export class ApiKeyService {
  constructor(@InjectModel(ApiKey.name) private model: Model<ApiKeyDocument>) {
  }

  private generateKeyPrefix(keyType: KeyType) {
    if (keyType === 'test') return 'sht_test_sk_';
    if (keyType === 'internal') return 'sht_internal_sk_';
    return 'sht_production_sk_';
  }

  generateRawKey(keyType: KeyType) {
    const prefix = this.generateKeyPrefix(keyType);
    const random = [...Array(32)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join('');
    return prefix + random;
  }

}