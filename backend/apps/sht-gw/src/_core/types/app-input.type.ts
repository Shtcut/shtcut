import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1, nullable: true })
  public readonly page: number;

  @Field(() => Int, { defaultValue: 10, nullable: true })
  public readonly perPage: number;
}

@InputType()
export class FilterInput {
  @Field(() => String)
  public readonly key: string;

  @Field(() => String)
  public readonly value: string;
}

@InputType()
export class QueryInput {
  @Field(() => PaginationInput, { defaultValue: { page: 1, perPage: 10 }, nullable: true })
  public readonly pagination: PaginationInput;

  @Field(() => String || Object || Array, { nullable: true })
  public readonly population: string | string[] | Record<string, any> | Record<string, any>[];

  @Field(() => String, { nullable: true })
  public readonly search: string;

  @Field(() => Boolean, { nullable: true })
  public readonly all: boolean;

  @Field(() => [FilterInput], { nullable: true })
  public readonly filter: boolean;
}

@InputType()
export class FileTypeInput {
  @Field(() => String, { nullable: true, defaultValue: null })
  public readonly url: string;

  @Field(() => String, { nullable: true, defaultValue: null })
  public readonly type: string;
}

@InputType()
export class DateRangeInput {
  @Field(() => String)
  public readonly fromDate: string;

  @Field(() => String)
  public readonly toDate: string;
}
