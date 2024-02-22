/** @type {import('next').NextConfig} */

module.exports = {
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
