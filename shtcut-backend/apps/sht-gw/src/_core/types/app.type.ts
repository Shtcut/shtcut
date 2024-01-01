import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Meta {
  @Field(() => String, { nullable: true })
  public readonly token: string;

  @Field(() => Boolean, { defaultValue: true })
  public readonly success: string;

  @Field(() => Int, { nullable: true })
  public readonly statusCode: number;

  @Field(() => MetaError, { nullable: true })
  public readonly error: Record<string, any> | Array<Record<string, any>>;
}

@ObjectType()
export class MetaError {
  @Field(() => String, { nullable: true })
  public readonly message: string;

  @Field(() => String || Object, { nullable: true })
  public readonly messages: string | Record<string, any>;

  @Field(() => Int, { nullable: true })
  public readonly statusCode: number;
}

@ObjectType()
export class Pagination {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  public readonly totalNumber: string;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  public readonly perPage: number;

  @Field(() => Int, { nullable: true })
  public readonly statusCode: number;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  public readonly previous: number;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  public readonly current: number;
}

@ObjectType()
export class DeletedObject {
  @Field(() => ID)
  public readonly _id: string;
}

@ObjectType()
export class Verifications {
  @Field(() => Boolean, { defaultValue: false })
  public readonly email: boolean;

  @Field(() => Boolean, { defaultValue: false })
  public readonly mobile: boolean;
}
