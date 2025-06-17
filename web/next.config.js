/** @type {import('next').NextConfig} */
module.exports = {
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        config.resolve.alias.encoding = false;
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack']
        });
        return config;
    },
    images: {
        domains: ['img.youtube.com', 'images.unsplash.com', 'example.com', 'i.imgur.com', 'res.cloudinary.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            },
            {
                protocol: 'https',
                hostname: 'img.youtube.com'
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            },
            {
                protocol: 'https',
                hostname: 'i.imgur.com'
            },
            {
                protocol: 'https',
                hostname: '**'
            }
        ]
    },
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/landing',
                permanent: true
            },
            {
                source: '/app',
                destination: '/app/dashboard',
                permanent: true
            }
        ];
    }
};
