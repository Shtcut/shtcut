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

export const featureData = [
    {
        id: 1,
        title: 'Link Management',
        text: 'Users can shorten long url links, customize links with branded domains, edit and options to set expiration dates',
        img: '/images/user.png.png'
    },
    {
        id: 2,
        title: 'QR Codes',
        text: 'Automatically generate QR codes for shortened links, customize and also track. ',
        img: '/images/folder.png.png'
    },
    {
        id: 3,
        title: 'Custom Domains',
        text: 'Set up payroll and bonuses for all your employees, and never be late on salaries.',
        img: '/images/bulb.png.png'
    },
    {
        id: 4,
        title: 'Analytics',
        text: 'Get real-time visibility into every expense and payment, with a neat dashboard.',
        img: '/images/paper.png.png'
    }
];

export const integrationData: IntegrationSectionType[] = [
    {
        id: '01.',
        title: 'Social Media Platforms',
        text: ' Integrate with social media platforms for seamless sharing of shortened links.',
        img: ['/images/twitter.png', '/images/instagram.png', '/images/fb.png']
    },
    {
        id: '02.',
        title: 'Email Marketing Tools',
        text: ' Provide integrations with email marketing platforms for link tracking and campaign optimization.',
        img: ['/images/mailchimp.png', '/images/rate.png']
    },
    {
        id: '03.',
        title: 'Analytics Platforms',
        text: 'Support integration with analytics platforms for comprehensive performance tracking and reporting.',
        img: ['/images/circle.png', '/images/graph.png']
    }
];

export const PricingData = [
    {
        id: 1,

        title: 'Free',
        text: 'Ideal for individuals who need quick access to basic features. ',
        amt: '$0',
        plan: 'Month',
        btnText: 'Get Started',
        plans: [
            'Users',
            'Custom domains',
            'Branded links total',
            'Link automation',
            'Redirects',
            'Tracked clicks',
            'Folders',
            'Folders'
        ]
    },
    {
        id: 2,
        title: 'Professional',
        text: 'Accelerate link creation seamlessly with our features ',
        amt: '$20',
        plan: 'per user / Month',
        btnText: 'Start free trial',
        plans: [
            'All features of free plan',
            'Country targeting',
            'Region targeting',
            'Link expiration by Date',
            'Export raw click data to S3,',
            'Unlimited Sharing',
            'Create teams to collaborate on designs',
            'Unlimited Sharing'
        ]
    },
    {
        id: 3,

        title: 'Enterprise',
        text: 'Accelerate link creation seamlessly with our features ',
        amt: 'Custom',
        plan: '',
        btnText: 'Start Free Trial',
        plans: [
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

export const manageData = [
    {
        name: 'No hidden fees.'
    },
    {
        name: '100% security. Guaranteed.'
    },
    {
        name: 'Team Collaboration'
    }
];

export const subNav = [
    {
        id: 1,
        images: '/images/links.png',
        link: '/url-shorten',
        text: 'URL Shorten'
    },
    {
        id: 2,
        images: '/images/social-media.png',
        link: '/pricing',
        text: 'Social Media'
    },
    {
        id: 3,
        images: '/images/social-media.png',
        link: '/pricing',
        text: 'Email Marketing'
    }
];


