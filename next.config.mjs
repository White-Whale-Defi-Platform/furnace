export async function redirects() {
  return [
    {
      source: '/:chainName',
      destination: '/',
      permanent: false,
    },
  ]
}


export const eslint = {
  ignoreDuringBuilds: true,
}