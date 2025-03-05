import Image from 'next/image';
import getPlatformIcon from '../get-platform-icon';
import { platforms } from '@shtcut/_shared/data';

const SocialPlatformIcons = () => {
    return (
        <div className="grid grid-cols-5 mt-8   gap-2">
            {platforms.map((platform) => {
                const { icon } = getPlatformIcon(platform);
                return (
                    <div
                        key={platform}
                        className={`w-10 h-10 rounded-md border flex items-center justify-center cursor-pointer`}
                    >
                        <Image
                            width={28}
                            height={28}
                            priority
                            unoptimized
                            className="rounded-none"
                            src={icon}
                            alt={''}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default SocialPlatformIcons;
