'use client';

import { jwtDecode } from 'jwt-decode';
import Cookie from 'js-cookie';
import { AUTH_TOKEN_KEY, SECOND_LEVEL_DOMAINS, SPECIAL_APEX_DOMAINS, ccTLDs } from '../constant';
import * as Yup from 'yup';
import { ObjectShape } from 'yup';
import ms from 'ms';

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

/** * Handle token inside cookie, so it is available for both client and server rendering */
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

/**
 * The function `getApexDomain` extracts the top-level domain from a given URL, handling special cases
 * and returning the domain in its apex form.
 * @param {string} url - The `getApexDomain` function takes a URL as input and returns the top-level
 * domain (apex domain) of that URL. The function first extracts the hostname from the URL and then
 * checks if it matches any special apex domains. If it does, it returns the special domain. If not
 * @returns The function `getApexDomain` returns the top-level domain (apex domain) of a given URL. If
 * the URL belongs to a special apex domain listed in the `SPECIAL_APEX_DOMAINS` object, it returns the
 * corresponding value from that object. Otherwise, it extracts the domain parts and returns either the
 * last three parts (if the second-to-last part is a recognized second
 */
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

export const timeAgo = (timestamp) => {
    if (!timestamp) return 'Just now';
    const diff = Date.now() - new Date(timestamp).getTime();
    if (diff < 6000) {
        return 'Just now';
    } else if (diff > 82800000) {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: new Date(timestamp).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
        });
    }
    return ms(diff);
};

/**
 * The `isValidURL` function in TypeScript checks if a given string is a valid URL by attempting to
 * create a new URL object and returns true if successful, false otherwise.
 * @param {string} url - The `isValidURL` function takes a URL string as a parameter and checks if it
 * is a valid URL by attempting to create a new URL object with the provided URL string. If the URL is
 * valid, it returns `true`; otherwise, it returns `false`.
 * @returns The `isValidURL` function returns `true` if the input `url` is a valid URL, and `false` if
 * it is not a valid URL.
 */
export const isValidURL = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};
