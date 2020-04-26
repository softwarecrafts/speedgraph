module.exports = {
    siteMetadata:
    {
        title: `Speed.Graph`,
        description: `Plot internet speed test.`,
        author: `@gatsbyjs`,
    },
    plugins: [
        `gatsby-plugin-postcss`,
      `gatsby-plugin-react-helmet`,
      {
        resolve: `gatsby-transformer-json`,
        options: {
          typeName: `json`, // a fixed string
        },
      },
      {
          resolve: `gatsby-source-filesystem`,
          options:
          {
              name: `data`,
              path: `${__dirname}/data`,
          },
      }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
