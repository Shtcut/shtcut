import { createApi } from 'unsplash-js';

export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const PATCH = 'PATCH';
export const DELETE = 'DELETE';

export * from './qr-code';

export const imagePlaceholder = 'https://i.imgur.com/UeDNBNQ.jpeg';

export const ccTLDs = new Set([
    'af',
    'ax',
    'al',
    'dz',
    'as',
    'ad',
    'ao',
    'ai',
    'aq',
    'ag',
    'ar',
    'am',
    'aw',
    'ac',
    'au',
    'at',
    'az',
    'bs',
    'bh',
    'bd',
    'bb',
    'eus',
    'by',
    'be',
    'bz',
    'bj',
    'bm',
    'bt',
    'bo',
    'bq',
    'an',
    'nl',
    'ba',
    'bw',
    'bv',
    'br',
    'io',
    'vg',
    'bn',
    'bg',
    'bf',
    'mm',
    'bi',
    'kh',
    'cm',
    'ca',
    'cv',
    'cat',
    'ky',
    'cf',
    'td',
    'cl',
    'cn',
    'cx',
    'cc',
    'co',
    'km',
    'cd',
    'cg',
    'ck',
    'cr',
    'ci',
    'hr',
    'cu',
    'cw',
    'cy',
    'cz',
    'dk',
    'dj',
    'dm',
    'do',
    'tl',
    'tp',
    'ec',
    'eg',
    'sv',
    'gq',
    'er',
    'ee',
    'et',
    'eu',
    'fk',
    'fo',
    'fm',
    'fj',
    'fi',
    'fr',
    'gf',
    'pf',
    'tf',
    'ga',
    'gal',
    'gm',
    'ps',
    'ge',
    'de',
    'gh',
    'gi',
    'gr',
    'gl',
    'gd',
    'gp',
    'gu',
    'gt',
    'gg',
    'gn',
    'gw',
    'gy',
    'ht',
    'hm',
    'hn',
    'hk',
    'hu',
    'is',
    'in',
    'id',
    'ir',
    'iq',
    'ie',
    'im',
    'il',
    'it',
    'jm',
    'jp',
    'je',
    'jo',
    'kz',
    'ke',
    'ki',
    'kw',
    'kg',
    'la',
    'lv',
    'lb',
    'ls',
    'lr',
    'ly',
    'li',
    'lt',
    'lu',
    'mo',
    'mk',
    'mg',
    'mw',
    'my',
    'mv',
    'ml',
    'mt',
    'mh',
    'mq',
    'mr',
    'mu',
    'yt',
    'mx',
    'md',
    'mc',
    'mn',
    'me',
    'ms',
    'ma',
    'mz',
    'mm',
    'na',
    'nr',
    'np',
    'nl',
    'nc',
    'nz',
    'ni',
    'ne',
    'ng',
    'nu',
    'nf',
    'nc',
    'tr',
    'kp',
    'mp',
    'no',
    'om',
    'pk',
    'pw',
    'ps',
    'pa',
    'pg',
    'py',
    'pe',
    'ph',
    'pn',
    'pl',
    'pt',
    'pr',
    'qa',
    'ro',
    'ru',
    'rw',
    're',
    'bq',
    'an',
    'bl',
    'gp',
    'fr',
    'sh',
    'kn',
    'lc',
    'mf',
    'gp',
    'fr',
    'pm',
    'vc',
    'ws',
    'sm',
    'st',
    'sa',
    'sn',
    'rs',
    'sc',
    'sl',
    'sg',
    'bq',
    'an',
    'nl',
    'sx',
    'an',
    'sk',
    'si',
    'sb',
    'so',
    'so',
    'za',
    'gs',
    'kr',
    'ss',
    'es',
    'lk',
    'sd',
    'sr',
    'sj',
    'sz',
    'se',
    'ch',
    'sy',
    'tw',
    'tj',
    'tz',
    'th',
    'tg',
    'tk',
    'to',
    'tt',
    'tn',
    'tr',
    'tm',
    'tc',
    'tv',
    'ug',
    'ua',
    'ae',
    'uk',
    'us',
    'vi',
    'uy',
    'uz',
    'vu',
    'va',
    've',
    'vn',
    'wf',
    'eh',
    'ma',
    'ye',
    'zm',
    'zw'
]);

export const SECOND_LEVEL_DOMAINS = new Set(['com', 'co', 'net', 'org', 'edu', 'gov', 'in']);

export const SPECIAL_APEX_DOMAINS = ['youtu.be', 'youtube.com'];

export const ALPHA_NUMERIC = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export const LOGO_FAV_ICON =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAIVBMVEVMaXEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC+JJ50AAAACnRSTlMAYe6EDUIkn9m+6SpLswAAAAlwSFlzAAAD6AAAA+gBtXtSawAAA4NJREFUeJztWu2SwyAIDKJo8v4PfJPU72hi0LQzN+7Pa3NLAGGRLsvExMTExMTExMTExMS/BcEqtm3bhNFK/oJ9iyCQvsqOJma3Jsgfsh8w33CCqrEfgNfZxQX72xYofcf+pgWqwr4iACafqfHkssoOLusgJIYYnIkSquzJqUP/gfkB+w4lRqeBfMCeWCBGFCSZFtoQYV1mPyxwX8J+ehRP2eM86HYBlOjFfceTZkgWSF1kb7J8xEGQK5N9h3NBTy3QKbvBJ6UN+2OAfPa9U9sHNZtfxewMR5reJDA+8NAVQC4/OP6V+iLY6wATH3kCBGiUve4NOjNAUEH8VlpA+T8wDdBZMc+k96bpZQ8Y64DPq6pCP8JXDZDJKY5OZISb7OxLQmWfPk6grEhQcVmbrNMEzwCwHJScyEcWWKtXngFoKY4UKAuSGwugT5Lo2H+eTgNJqTAyKKkSCVauNqej68QG0KkTR4diHasHaB/34GzASQeETll2MQlGBMgOm5DlwMcnlTcsqz7ynYwYoy7kp6AIb0Gh4YfBADljPuR14EYvUV3Gt4liyqSXbtMzXvhifYRp068i5f8ktusFLQ1T1kaYpgDojN6Suj9fqaE1qdfnAUqz+NfPoO1ybG1wQRyzp/yYs3t3ioYwmmCkPPmxSUlC/ESqc/C22Ka6M8uke8GS9dmTyqIGT8bVIs6AZhmv/RPq4sO6L52RKjbgwQhD/pliOb2651AfEvuV0D2ejTDool9+qNpw9rKt4yzcP9eMAUpc+9iXuiRE9p7sZAA8H9+Uy7/aF0IQjsiSpFBoMTeAAbxNsrIa9nnnDz9zBF/t4xcHvS5HEwOZBoibCBwUFUWOiQ+Z4+vWEsCgbWLYcyv6rgC2Jv/JrF0cTpNJgLiXIFtjADPB4k97U78aYcCykB8F4lrj7GJfwmxPUlgqAPR38jt8aNj3YFtLElZxrcufGKA771D599HGvgGDPl6L8K+jNa+MZGubjptQYPhQ2h3xgAAsXo80H6P8oqrrIvak61lb2j7+xc/wkrelZd7hBvhaeh3Iyq5wxIoct7tqfrGpHLIQE+5t1IhtXVc9VbcHzn1zHPuOcK6wd1fIA4mz9KYq+xu/T1EJw76B/yb7pfBN2Zf3AD9lr65nuds6Fsj8kv1AYUXO2hUO29Kb77IfkK7jifCDlImJiYmJiYmJiYmJif+HP1zjXmgmoSYOAAAAAElFTkSuQmCC';
export const PREVIEW_SOCIAL = ['Twitter', 'Facebook'];

export const SOCIAL_MEDIA = {
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    GITHUB: 'github'
};

export const Workspaces = [
    {
        name: 'For myself',
        type: 'personal',
        icon: '/mdi_account.svg',
        description: 'Create custom domains, links and QR codes, Stay organized.'
    },
    {
        name: 'With my team',
        icon: '/ri_team-fill.svg',
        type: 'team',
        description: 'Streamline processes, generate shareable links or QR codes.Collaborate.'
    }
];

/** URL */
export const ACL = {
    signUpUrl: 'acl/auth/sign-up',
    signInUrl: 'acl/auth/sign-in',
    socialUrl: 'acl/auth/social',
    verifyEmailUrl: 'acl/auth/verify-email',
    sendVerificationUrl: 'acl/auth/send-verification',
    forgotPasswordUrl: 'acl/auth/password-reset',
    updatePasswordUrl: 'acl/auth/reset-password',
    changePasswordUrl: 'acl/auth/change-password',
    loggedInUserUrl: 'acl/users/me',
    workspace: 'acl/workspaces'
};

export const SHTNER = {
    links: 'shtner/links',
    domains: 'shtner/domains'
};

export const AUTH_TOKEN_KEY = process.env.NEXT_PUBLIC_STORAGE_KEY as string;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;

export const GRADIENTS = [
    'linear-gradient(to bottom right,#accbee,#e7f0fd)',
    '#e7f0fd',
    '#ee9ca7',
    '#accbee',
    '#091E3A',
    '#2F80ED',
    '#2D9EE0',
    '#9400D3',
    '#4B0082',
    '#c84e89',
    '#F15F79',
    'linear-gradient(to bottom right,#d5d4d0,#d5d4d0,#eeeeec)',
    'linear-gradient(to bottom right,#000000,#434343)',
    'linear-gradient(to bottom right,#09203f,#537895)',
    'linear-gradient(to bottom right,#AC32E4,#7918F2,#4801FF)',
    'linear-gradient(to bottom right,#f953c6,#b91d73)',
    'linear-gradient(to bottom right,#ee0979,#ff6a00)',
    'linear-gradient(to bottom right,#F00000,#DC281E)',
    'linear-gradient(to bottom right,#00c6ff,#0072ff)',
    'linear-gradient(to bottom right,#4facfe,#00f2fe)',
    'linear-gradient(to bottom right,#0ba360,#3cba92)',
    'linear-gradient(to bottom right,#FDFC47,#24FE41)',
    'linear-gradient(to bottom right,#8a2be2,#0000cd,#228b22,#ccff00)',
    'linear-gradient(to bottom right,#40E0D0,#FF8C00,#FF0080)',
    'linear-gradient(to bottom right,#fcc5e4,#fda34b,#ff7882,#c8699e,#7046aa,#0c1db8,#020f75)',
    'linear-gradient(to bottom right,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)'
];

export const IMAGES = [
    'url(https://unsplash.com/photos/blue-and-pink-light-illustration-LeG68PrXA6Y)',
    'url(https://images.unsplash.com/photo-1691226099773-b13a89a1d167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90',
    'url(https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
    'url(https://images.unsplash.com/photo-1691225850735-6e4e51834cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)'
];

export const CLIENTS = [
    {
        logo: './unsplash.svg',
        alt: 'unsplash'
    },
    {
        logo: './intercom.svg',
        alt: 'intercom'
    },
    {
        logo: './notion.svg',
        alt: 'notion'
    },
    {
        logo: './grammerly.svg',
        alt: 'grammerly'
    },
    {
        logo: './vercel.svg',
        alt: 'vercel'
    },
    {
        logo: './next.svg',
        alt: 'next'
    }
];

export const USERS = [
    {
        name: 'Alice',
        message:
            'Shtcut has been a game-changer for our team. With its reliable end-to-end testing, we catch bugs early, leading to faster development cycles and improved collaboration.'
    },
    {
        name: 'Bob',
        message:
            "I used to spend hours debugging frontend issues, but Shtcut simplified everything. Now, I'm more productive, and my colleagues can trust our code thanks to Shtcut."
    },
    {
        name: 'Charlie',
        message:
            "Shtcut has transformed the way we work. Our QA and development teams are on the same page, and our productivity has skyrocketed. It's a must-have tool."
    },
    {
        name: 'David',
        message:
            'I was skeptical at first, but Shtcut exceeded my expectations. Our project timelines have improved, and collaboration between teams is seamless.'
    },
    {
        name: 'Ella',
        message:
            "Shtcut made writing and running tests a breeze. Our team's productivity has never been higher, and we're delivering more reliable software."
    },
    {
        name: 'Frank',
        message:
            "Thanks to Shtcut, we've eliminated testing bottlenecks. Our developers and testers collaborate effortlessly, resulting in quicker releases."
    },
    {
        name: 'Grace',
        message:
            'Shtcut has improved our development process significantly. We now have more time for innovation, and our products are of higher quality.'
    },
    {
        name: 'Hank',
        message:
            "Shtcut's user-friendly interface made it easy for our non-technical team members to contribute to testing. Our workflow is much more efficient now."
    },
    {
        name: 'Ivy',
        message:
            "Our team's collaboration improved immensely with Shtcut. We catch issues early, leading to less friction and quicker feature deployments."
    },
    {
        name: 'Jack',
        message:
            "Shtcut's robust testing capabilities have elevated our development standards. We work more harmoniously, and our releases are more reliable."
    },
    {
        name: 'Katherine',
        message:
            "Shtcut is a lifesaver for our cross-functional teams. We're more productive, and there's a shared sense of responsibility for product quality."
    },
    {
        name: 'Liam',
        message:
            "Shtcut has helped us maintain high standards of quality. Our team's collaboration has improved, resulting in faster development cycles."
    },
    {
        name: 'Mia',
        message:
            "Shtcut is a powerful tool that improved our productivity and collaboration. It's now an integral part of our development process."
    },
    {
        name: 'Nathan',
        message:
            "Shtcut's user-friendly interface and detailed reporting have made testing a breeze. Our team's productivity is at an all-time high."
    },
    {
        name: 'Olivia',
        message:
            "We saw immediate benefits in terms of productivity and collaboration after adopting Shtcut. It's an essential tool for our development workflow."
    },
    {
        name: 'Paul',
        message:
            "Shtcut has streamlined our testing process and brought our teams closer. We're more efficient and deliver better results."
    },
    {
        name: 'Quinn',
        message:
            'Shtcut has been a game-changer for us. Our productivity and collaboration have improved significantly, leading to better software.'
    },
    {
        name: 'Rachel',
        message:
            'Thanks to Shtcut, our testing process is now a seamless part of our development cycle. Our teams collaborate effortlessly.'
    },
    {
        name: 'Sam',
        message:
            'Shtcut is a fantastic tool that has revolutionized our workflow. Our productivity and collaboration have reached new heights.'
    }
];

export const topNav = [
    {
        title: 'Shortener',
        href: 'url/dashboard',
        module: 'shtcut-shortener',
        isActive: true
    },
    {
        title: 'Social Manager',
        href: 'social/dashboard',
        module: 'shtcut-social',
        isActive: false
    },
    {
        title: 'Shortener',
        href: 'survey/dashboard',
        module: 'shtcut-survey',
        isActive: false
    },
    {
        title: 'Shortener',
        href: 'marking/dashboard',
        module: 'shtcut-marketing',
        isActive: false
    }
];

export const GOOGLE_FAVICON_URL = 'https://www.google.com/s2/favicons?sz=64&domain_url=';

export const dummyLinkHistory = [
    {
        id: '65a1552cbff8c8ffd2f97d9e',
        title: 'Stackoverflow',
        url: 'https://stackoverflow.com/questions/37377106/enable-aot-in-xamarin-for-android-visual-studio/44046179#44046179',
        target: 'https://stackoverflow.com/questions/37377106/enable-aot-in-xamarin-for-android-visual-studio/44046179#44046179',
        archived: false,
        order: 0,
        isSocial: false,
        clicks: 1,
        tags: [
            { title: 'stackoverflow', color: 'green' },
            { title: 'tech', color: 'red' }
        ],
        createdAt: '2024-01-12T15:05:16.344Z',
        updatedAt: '2024-03-18T15:20:28.201Z'
    },
    {
        id: '65b843724ee5e206d16633ae',
        title: 'LinkedIn',
        url: 'https://www.linkedin.com/in/ayinde-funmilayo-736b47b7/',
        target: 'https://www.linkedin.com/in/ayinde-funmilayo-736b47b7/',
        archived: false,
        order: 1,
        isSocial: true,
        clicks: 1,
        createdAt: '2024-01-30T00:31:46.261Z',
        updatedAt: '2024-03-18T15:21:13.186Z',
        userId: '65a154492751e7953c78f70e'
    },
    {
        id: '65e5f3d73625ef20959b04d2',
        title: 'Simple',
        url: 'https://youtube.com/shorts/plX8dItAIYE?feature=share',
        target: 'https://youtube.com/shorts/plX8dItAIYE?feature=share',
        archived: false,
        order: 2,
        isSocial: false,
        clicks: 1,
        createdAt: '2024-03-04T16:16:23.949Z',
        updatedAt: '2024-03-18T15:20:50.457Z',
        userId: '65a154492751e7953c78f70e'
    },
    {
        id: '65f85bafb9aaf9fae538cdd3',
        title: 'DS',
        url: 'https://visaintel.com/services',
        target: 'https://visaintel.com/services',
        archived: false,
        order: 3,
        isSocial: false,
        clicks: 0,
        createdAt: '2024-03-18T15:20:15.765Z',
        updatedAt: '2024-03-18T15:20:15.765Z',
        userId: '65a154492751e7953c78f70e'
    }
];

// utils/formatName.ts
export const FormatName = (fullName: string): string => {
    const names = fullName.split(' ');
    if (names.length < 2) return '';

    const firstNameInitial = names[0].charAt(0).toUpperCase();
    const lastNameInitial = names[1].charAt(0).toUpperCase();

    return `${firstNameInitial}${lastNameInitial}`;
};

export const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_KEY_UNSPLASH as string
});


