module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/apps',
        permanent: false
      },
    ]
  }
}
