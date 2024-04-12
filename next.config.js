module.exports = {
  async redirects() {
    return [
      {
        source: "/:chainName",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
