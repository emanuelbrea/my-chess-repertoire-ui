module.exports = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/repertoire',
                destination: '/repertoire/white',
                permanent: true,
            },
        ]
    },
};