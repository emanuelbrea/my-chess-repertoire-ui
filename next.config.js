module.exports = {
    reactStrictMode: false,
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