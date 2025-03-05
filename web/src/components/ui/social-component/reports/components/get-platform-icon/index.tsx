import { SocialPlatform } from '@shtcut/types/report';

const getPlatformIcon = (platform: SocialPlatform): { icon: string; bg: string; title: string } => {
    switch (platform) {
        case 'facebook':
            return { icon: '/social/fb-page.png', bg: '#1877F2', title: 'Facebook' };
        case 'instagram':
            return { icon: '/social/instagram.png', bg: '#E4405F', title: 'Instagram' };
        case 'twitter':
            return { icon: '/social/twitter.png', bg: '#1DA1F2', title: 'Twitter' };
        case 'linkedin':
            return { icon: '/social/linkedin.png', bg: '#0A66C2', title: 'LinkedIn' };
        case 'tiktok':
            return { icon: '/social/tiktok.png', bg: '#000000', title: 'TikTok' };
        case 'youtube':
            return { icon: '/social/youtube.png', bg: '#FF0000', title: 'YouTube' };
        case 'pinterest':
            return { icon: '/social/pininterest-outline.png', bg: '#E60023', title: 'Pinterest' };
        default:
            return { icon: '•', bg: '#CCCCCC', title: 'Unknown' };
    }
};

export default getPlatformIcon;
