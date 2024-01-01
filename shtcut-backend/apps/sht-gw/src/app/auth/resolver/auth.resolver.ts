import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthData } from '../types/auth.type';
import { AuthProcessor } from '../processor/auth.processor';
import { SignInInput, SignUpInput, SocialSignInInput } from '../types';
import { QueryInput } from 'apps/sht-gw/src/_core';

@Resolver(() => AuthData)
export class AuthResolver {
  constructor(private readonly authProcessor: AuthProcessor) {}

  @Mutation(() => AuthData)
  async signIn(@Args('signInInput', { type: () => SignInInput }) signInInput: SignInInput): Promise<AuthData> {
    return this.authProcessor.signIn(signInInput);
  }

  @Mutation(() => AuthData)
  async signUp(@Args('signUpInput', { type: () => SignUpInput }) signUpInput: SignUpInput): Promise<AuthData> {
    return this.authProcessor.signUp(signUpInput);
  }

  @Mutation(() => AuthData)
  async socialSignIn(
    @Args('socialSignInput', { type: () => SocialSignInInput }) socialSignInInput: SocialSignInInput,
  ): Promise<AuthData> {
    return this.authProcessor.signInSocial(socialSignInInput);
  }

  @Query(() => AuthData)
  async findAuthData(
    @Args('socialSignInput', { type: () => SocialSignInInput }) socialSignInInput: SocialSignInInput,
    @Args('query', { type: () => QueryInput, nullable: true }) query?: QueryInput,
  ): Promise<AuthData> {
    return this.authProcessor.signInSocial(socialSignInInput, query);
  }
}
