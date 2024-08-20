import { GeneralType, IntegrationSectionType, Plan, PostInterface } from '@shtcut/types/types';
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
export const PlanCardsData = [
    {
        id: 1,

        title: 'Free',
        text: 'Everything you need to track work ',
        amt: '$0',
        plan: 'Month',
        btnText: 'Get Started',
        plans: ['Unlimited issues', 'Unlimited projects', '50 users + guests', 'Importers', 'APIs']
    },
    {
        id: 2,
        title: 'Pro',
        text: 'Best for tracking and measuring progress ',
        amt: '$20',
        plan: 'per user / Month',
        btnText: 'Get Started',
        plans: [
            'Active Cycles',
            'Advanced analytics',
            'Integrations + automation',
            'Integrations + automation',
            'Plane AI',
            'Tailored onboarding'
        ]
    },
    {
        id: 3,

        title: 'Custom',
        text: 'Ideal for unique, cross-functional set-ups',
        amt: 'Custom',
        plan: '',
        btnText: 'Get custom pricing',
        plans: [
            'RBAC and audit logs',
            'Custom SAML + OIDC',
            'Auto-backups',
            'Auto-backups',
            'Managed cloud',
            'Managed cloud',
            'Whiteglove implementation + support',
            'Whiteglove implementation + support'
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

export const months = [
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' },
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' }
];

export const colors = [
    { id: '1', value: '#000000' },
    { id: '2', value: '#DE3221' },
    { id: '3', value: '#EF8001' },
    { id: '4', value: '#188639' },
    { id: '5', value: '#229CE0' },
    { id: '6', value: '#2B5BD7' },
    { id: '7', value: '#6B52D1' },
    { id: '8', value: '#D94280' },
    { id: '9', value: '#764B24' },
    { id: '10', value: '#7C7D7D' },
    { id: '11', value: '#0000FB' },
    { id: '12', value: '#EEAAFF' }
];

export const logos = [
    {
        id: '1',
        name: 'whatsapp',
        logoUrl: '/logos/logos_whatsapp-icon.png'
    },
    {
        id: '2',
        name: 'shtcut',
        logoUrl: '/logos/shtcut.png'
    },
    {
        id: '3',
        name: 'instagram',
        logoUrl: '/logos/skill-icons_instagram.png'
    },
    {
        id: '4',
        name: 'facebook',
        logoUrl: '/logos/facebook.png'
    },
    {
        id: '5',
        name: 'youtube',
        logoUrl: '/logos/logos_youtube-icon.png'
    },
    {
        id: '6',
        name: 'bitly',
        logoUrl: '/logos/bitl.png'
    },
    {
        id: '7',
        name: 'twitter',
        logoUrl: '/logos/prime_twitter.png'
    },
    {
        id: '8',
        name: 'cloud',
        logoUrl: '/logos/simple-icons_icloud.png'
    },
    {
        id: '8',
        name: 'scan',
        logoUrl: '/logos/Scan.png'
    }
];
export const postData_2 = [
    {
        title: 'Migrating to Shtcut',
        images: '/blog/customer-service.png',
        color: '#3538CD',
        text: 'Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get...',
        timeline: 'Lana Steiner • 18 Jan 2024',
        objectData: [
            { text: 'Engineering', color: '#026AA2' },
            { text: 'Customer Stories', color: '#C11574' }
        ]
    },
    {
        title: 'Building your API Stack',
        images: '/blog/building.png',
        color: '#C11574',
        text: 'Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get...',
        timeline: 'Phoenix Baker • 19 Jan 2024',
        objectData: [
            { text: 'Education', color: '#027A48' },
            { text: 'Customer Stories', color: '#C11574' }
        ]
    }
];

export const postData_3: PostInterface[] = [
    {
        id: '1',
        title: 'Bill Walsh leadership lessons',
        images: '/blog/leadership.png',
        color: '#3538CD',
        text: 'Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?',
        timeline: 'Alec Whitten • 17 Jan 2022',
        objectData: [
            { text: 'Leadership', color: '#6941C6' },
            { text: 'Company News', color: '#363F72' }
        ]
    },
    {
        id: '2',
        title: 'PM mental models',
        images: '/blog/mental.png',
        color: '#C11574',
        text: 'Mental models are simple expressions of complex processes or relationships.',
        timeline: 'Demi WIlkinson • 16 Jan 2022',
        objectData: [
            { text: 'Engineering', color: '#026AA2' },
            { text: 'Education', color: '#3538CD' },
            { text: 'Changelog', color: '#C4320A' }
        ]
    },
    {
        id: '3',
        title: 'What is Wireframing?',
        images: '/blog/Wireframing.png',
        color: '#C11574',
        text: 'Introduction to Wireframing and its Principles. Learn from the best in the industry.',
        timeline: 'Candice Wu • 15 Jan 2022',
        objectData: [
            { text: 'Leadership', color: '#6941C6' },
            { text: 'Engineering', color: '#026AA2' }
        ]
    },
    {
        id: '4',
        title: 'How collaboration makes us better designers',
        images: '/blog/collabo.png',
        color: '#C11574',
        text: 'Collaboration can make our teams stronger, and our individual designs better.',
        timeline: 'Natali Craig • 14 Jan 2022',
        objectData: [
            { text: 'Design', color: '#6941C6' },
            { text: 'Research', color: '#026AA2' }
        ]
    },
    {
        id: '5',
        title: 'Our top 10 Javascript frameworks to use',
        images: '/blog/javascript.png',
        color: '#C11574',
        text: 'JavaScript frameworks make development easy with extensive features and functionalities.',
        timeline: 'Drew Cano • 13 Jan 2022',
        objectData: [
            { text: 'Changelogs', color: '#6941C6' },
            { text: 'Tools', color: '#C11574' },
            { text: 'SaaS', color: '#C01048' }
        ]
    },
    {
        id: '6',
        title: 'Podcast: Creating a better CX Community',
        images: '/blog/creating.png',
        color: '#C11574',
        text: 'Starting a community doesn’t need to be complicated, but how do you get started?',
        timeline: 'Orlando Diggs • 12 Jan 2022',
        objectData: [
            { text: 'Podcasts', color: '#6941C6' },
            { text: 'Customer Success', color: '#363F72' }
        ]
    }
];
export const dummyData: number[] = [1, 2, 3, 4, 5];
export const authSlides = [
    {
        id: 1,
        image: '/images/qrcode-d.png',
        title: '  Generate short URLs with just a click',
        text: 'Say goodbye to chaos and hello to productivity',
        subTitle: 'URL Shortener',
        subText: 'Paste in any long url, make it sharable, trackable and customizable with just a few clicks.'
    },
    {
        id: 2,
        image: '/images/qrcode-d.png',
        title: 'Craft personalized surveys effortlessly',
        text: 'Say goodbye to chaos and hello to productivity',
        subTitle: 'Survey Creation',
        subText: 'Paste in any long url, make it sharable, trackable and customizable with just a few clicks.'
    },
    {
        id: 3,
        image: '/images/qrcode-d.png',
        title: 'Engage customers through targeted email campaigns.',
        text: 'Say goodbye to chaos and hello to productivity',
        subTitle: 'Email Marketing',
        subText: 'Paste in any long url, make it sharable, trackable and customizable with just a few clicks.'
    },
    {
        id: 4,
        image: '/images/qrcode-d.png',
        title: 'Stay connected with your audience!',
        text: 'Say goodbye to chaos and hello to productivity',
        subTitle: 'Social Media Management',
        subText: 'Paste in any long url, make it sharable, trackable and customizable with just a few clicks.'
    }
];

export const trustImage = ['cornell.png', 'elastic.png', 'kissflow.png', 'thought.png', 'trans.png', 'mag.png'];

export const capacities = ['0-10', '11-30', '31-50', '51-100', 'Above 100'];
export const modules = [
    {
        key: 'URL Shortener',
        value: 'shtcut-shortener'
    },
    {
        key: 'Social Media Manager',
        value: 'shtcut-social-manager'
    },
    {
        key: 'Survey Creation',
        value: 'shtcut-survey'
    },
    {
        key: 'Email Marketing',
        value: 'shtcut-marketing'
    },
    {
        key: 'Web Builder',
        value: 'shtcut-web-builder'
    }
];
