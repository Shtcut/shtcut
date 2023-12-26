import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthData } from '../types/auth.type';
import { AuthProcessor } from '../processor/auth.processor';
import { SignInInput, SignUpInput, SocialSignInInput } from '../types';
import { QueryInput } from 'apps/sht-gw/src/_core/types';

@Resolver(() => AuthData)
export class AuthResolver {
  constructor(private readonly authProcessor: AuthProcessor) {}

  @Mutation(() => AuthData)
  async signIn(
    @Args('signInInput', { type: () => SignInInput }) signInInput: SignInInput,
    @Args('query', { type: () => QueryInput }) query?: QueryInput,
  ): Promise<AuthData> {
    return this.authProcessor.signIn(signInInput, query);
  }

  @Mutation(() => AuthData)
  async signUp(
    @Args('signUpInput', { type: () => SignUpInput }) signUpInput: SignUpInput,
    @Args('query', { type: () => QueryInput }) query?: QueryInput,
  ): Promise<AuthData> {
    return this.authProcessor.signUp(signUpInput, query);
  }

  @Mutation(() => AuthData)
  async socialSignIn(
    @Args('socialSignInput', { type: () => SocialSignInInput }) socialSignInInput: SocialSignInInput,
    @Args('query', { type: () => QueryInput }) query?: QueryInput,
  ): Promise<AuthData> {
    return this.authProcessor.signInSocial(socialSignInInput, query);
  }
}
