import { Activity, Command, PieChart } from 'lucide-react';

export const IMPACT: GeneralType[] = [
    {
        id: 1,
        icons: Activity,
        title: 'Publishing',
        text: 'Effortlessly streamline your link strategy with our intuitive links Manager. Simplify publishing and enhance collaboration seamlessly.'
    },
    {
        id: 2,
        icons: PieChart,
        title: 'Analytics',
        text: 'Get valuable insights and performance metrics for optimizing strategies.'
    },
    {
        id: 3,
        icons: Command,
        title: 'Engagement',
        text: 'Boost interaction and track performance effortlessly. Elevate engagement with streamlined link strategies.'
    }
];

export const AMOUNTS: GeneralType[] = [
    {
        id: 1,
        title: '500K',
        text: 'Global paying customers'
    },
    {
        id: 2,
        title: '200M',
        text: 'Links & QR Codes created monthly'
    },
    {
        id: 3,
        title: '20B',
        text: 'Connections (clicks & scans) monthly'
    },
    {
        id: 4,
        title: '800+',
        text: 'App integrations'
    }
];

export const BENEFITS: GeneralType[] = [
    {
        id: 1,
        title: 'Link Manager'
    },
    {
        id: 2,
        title: 'QR Codes'
    },
    {
        id: 3,
        title: 'URL Shorten-er'
    },
    {
        id: 4,
        title: 'Link History'
    },
    {
        id: 5,
        title: 'Link Bio'
    }
];

export const PLANS: Plan[] = [
    {
        id: 1,
        status: 'Free',
        amt: 0,
        text: 'Start your next side project',
        data: [
            'Users',
            'Custom domains',
            'Branded links total',
            'Link automation',
            'Redirects',
            'Tracked clicks',
            'Folders '
        ]
    },
    {
        id: 2,
        status: 'Pro',
        amt: 20,
        section: 'per user / month',
        text: 'Accelerate link creation seamlessly with our features',
        data: [
            'All features of free plan',
            'Country targeting',
            'Region targeting',
            'Link expiration by Date',
            'Export raw click data to S3, Middleware)',
            'Link expiration by Click Limit',
            'Password protection',
            'QR code '
        ]
    },
    {
        id: 3,
        status: 'Enterprise',
        amt: 'Custom',
        section: 'per user / month',
        text: 'Accelerate link creation seamlessly with our features',
        data: [
            'All features of Pro plan',
            'Multiple teams',
            
            'SLA of 99.9% uptime',
            'Mobile targeting',
            'Tags for links',
            'SAML Single-Sign-On (SSO)',
            'QR code',
            'Tools & Extensions'
        ]
    }
];
