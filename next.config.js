module.exports = {
  async redirects() {
    return [
      {
        source: "/:chainName",
        destination: "/",
        permanent: true,
      },

      {
        source: "/:chainName(^\\(osmosis|chihuahua\\))/:burnedAsset",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
