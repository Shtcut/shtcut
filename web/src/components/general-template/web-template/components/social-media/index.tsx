import { Globe } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const iconMap: Record<string, React.ReactNode> = {
    facebook: <FaFacebook size={16} className="text-primary-0" />,
    instagram: <FaInstagram size={16} className="text-primary-0" />,
    twitter: <FaTwitter size={16} className="text-primary-0" />,
    youtube: <FaYoutube size={16} className="text-primary-0" />,
    website: <Globe size={16} className="text-primary-0" />
};

interface SocialMediaProps {
    socialMedia?: Record<string, string>;
}

const SocialTabContent = ({ socialMedia }: SocialMediaProps) => {
    if (!socialMedia || Object.keys(socialMedia).length === 0) {
        return <section className="p-4 text-sm text-gray-500">No social media links available.</section>;
    }

    return (
        <section className="">
            <div className="flex flex-col ">
                {Object.entries(socialMedia).map(([platform, url]) => (
                    <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium hover:underline border-b py-4"
                    >
                        {iconMap[platform] || <Globe size={16} />} {platform}
                    </a>
                ))}
            </div>
        </section>
    );
};

export default SocialTabContent;
