module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/month/1',
        permanent: true,
      },
    ]
  },
}