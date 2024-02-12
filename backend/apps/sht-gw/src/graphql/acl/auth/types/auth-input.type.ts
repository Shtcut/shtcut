import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignInInput {
  @Field(() => String)
  public readonly email: string;

  @Field(() => String)
  public readonly password: string;
}

@InputType()
export class SignUpInput {
  @Field(() => String)
  public readonly firstName: string;

  @Field(() => String)
  public readonly lastName: string;

  @Field(() => String)
  public readonly email: string;

  @Field(() => String)
  public readonly password: string;

  @Field(() => String)
  public readonly verifyRedirectUrl: string;
}

@InputType()
export class SocialSignInInput {
  @Field(() => String)
  public readonly socialType: string;

  @Field(() => String)
  public readonly accessToken: string;
}

@InputType()
export class SendVerificationCodeInput {
  @Field(() => String)
  public readonly email: string;

  @Field(() => String)
  public readonly redirectUrl: string;
}
