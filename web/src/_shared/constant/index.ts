export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const PATCH = 'PATCH';
export const DELETE = 'DELETE';

export const SOCIAL_MEDIA = {
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    GITHUB: 'github',
}


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


export const chartData = [
    {
      name: 'Jan',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Feb',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Mar',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Apr',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'May',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Jun',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Jul',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Aug',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Sep',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Oct',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Nov',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Dec',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
  ]
  