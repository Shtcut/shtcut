'use client';

import { jwtDecode } from 'jwt-decode';
import Cookie from 'js-cookie';
import { AUTH_TOKEN_KEY, SECOND_LEVEL_DOMAINS, SPECIAL_APEX_DOMAINS, ccTLDs } from '../constant';
import * as Yup from 'yup';
import { ObjectShape } from 'yup';
// import slugify from 'slugify';
import * as _ from 'lodash';

type AuthTokenReturnsProps = {
    isLoggedIn: boolean;
    expiresAt: Date | null;
};

type AppCookieProp = {
    cookie?: string | null;
    userRole?: Array<'owner' | 'member' | 'admin' | 'unknown-user'>;
    allowDelete?: boolean;
};

export const AuthToken = (token: string | undefined): AuthTokenReturnsProps => {
    const defaultState = {
        isLoggedIn: false,
        expiresAt: null
    };

    if (token) {
        try {
            const decoded: any = jwtDecode(token);
            const sessionTimeExp = decoded.exp;
            return {
                isLoggedIn: sessionTimeExp > new Date().getTime() / 1000,
                expiresAt: new Date(sessionTimeExp * 1000)
            };
        } catch (e) {
            return defaultState;
        }
    }
    return defaultState;
};

/*** Handle token inside cookie, so it is available for both client and server rendering */
export const AppCookie = ({ cookie = null, userRole = ['unknown-user'], allowDelete = false }: AppCookieProp) => {
    if (cookie && !allowDelete) {
        Cookie.set(AUTH_TOKEN_KEY, cookie);
        Cookie.set(`${AUTH_TOKEN_KEY}_user`, JSON.stringify(userRole));
    } else {
        Cookie.remove(AUTH_TOKEN_KEY);
        Cookie.remove(`${AUTH_TOKEN_KEY}_user`);
    }
    return;
};

export const validateYulObj = (obj: ObjectShape) => {
    return Yup.object().shape(obj);
};

export const getApexDomain = (url: string) => {
    let domain: string;
    try {
        domain = new URL(url).hostname;
    } catch (e) {
        return '';
    }

    if (SPECIAL_APEX_DOMAINS[domain]) return SPECIAL_APEX_DOMAINS[domain];

    const parts = domain.split('.');
    if (parts.length > 2) {
        if (SECOND_LEVEL_DOMAINS.has(parts[parts.length - 2]) && ccTLDs.has(parts[parts.length - 1])) {
            return parts.slice(-3).join('.');
        }
        return parts.slice(-2).join('.');
    }
    return domain;
};

export const validDomainRegex = new RegExp(/^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/);
