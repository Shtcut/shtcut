import {LimiterOption} from "ratelimiter";
import {CreateErrorBodyFn, GetIdFn} from "shtcut/core";
import {FactoryProvider, ModuleMetadata} from "@nestjs/common";


export type RateLimiterParams = Pick<LimiterOption, 'max' | 'duration'> & {
    createErrorBody?: CreateErrorBodyFn
} & ({ getId: GetIdFn } | { id: string } | {});

export type RateLimiterModuleParams = Partial<RateLimiterParams> & Pick<LimiterOption, 'db'>;

export interface RateLimiterModuleParamsAsync extends Pick<ModuleMetadata, 'imports' | 'providers'>,
    Pick<FactoryProvider<RateLimiterModuleParams | Promise<RateLimiterModuleParams>>, 'useFactory' | 'inject'> {
}