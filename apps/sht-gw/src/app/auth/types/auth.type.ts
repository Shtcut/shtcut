import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Meta, Verifications } from '../../../_core/types';

export enum SOCIAL_TYPE {
  'facebook' = 'facebook',
  'google' = 'google',
}

export enum VERIFY_TYPE {
  'email' = 'email',
  'mobile' = 'mobile',
}

registerEnumType(SOCIAL_TYPE, {
  name: 'SOCIAL_TYPE',
});

registerEnumType(VERIFY_TYPE, {
  name: 'VERIFY_TYPE',
});

@ObjectType({ description: 'auth' })
export class AuthType {
  @Field((type) => ID)
  public _id: string;

  @Field((type) => String)
  public email: string;

  @Field((type) => String)
  public publicId: string;

  @Field((type) => Verifications)
  public verification: Verifications;

  @Field(() => Boolean)
  public isAdmin: boolean;

  @Field(() => Boolean)
  public socialAuth: boolean;

  @Field(() => Boolean)
  public accountVerified: boolean;

  @Field(() => Date)
  public readonly createdAt: Date;

  @Field(() => Date)
  public readonly updatedAt: Date;
}

@ObjectType()
export class AuthData {
  @Field(() => Meta)
  public readonly meta: Meta;

  @Field(() => AuthData, { nullable: true })
  public readonly data: AuthData;
}
