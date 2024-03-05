/** @type {import('next').NextConfig} */

module.exports = {
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/coming-soon',
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
