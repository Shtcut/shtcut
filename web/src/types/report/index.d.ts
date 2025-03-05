interface SocialMessage {
    id: string;
    type: 'comment' | 'message' | 'mention';
    targetName: string;
    targetType?: 'post' | 'chat';
    user: {
        name: string;
        avatar: string;
        platform: SocialPlatform;
    };
    content: string;
    timestamp: string;
    isCompleted?: boolean;
    actions: Array<{
        type: 'like' | 'comment' | 'share' | 'send' | 'reply' | 'react' | 'repost' | 'retweet';
        label: string;
    }>;
    viewAction: {
        label: string;
        target: string;
    };
    stats?: {
        likes?: number;
    };
}

export type SocialPlatform = 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'tiktok' | 'youtube' | 'pinterest';

interface SocialAccount {
    id: string;
    name: string;
    platform: SocialPlatform;
    avatar: string;
}
