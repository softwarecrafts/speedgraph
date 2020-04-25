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
      },
      {
          resolve: `gatsby-plugin-manifest`,
          options:
          {
              name: `gatsby-starter-default`,
              short_name: `starter`,
              start_url: `/`,
              background_color: `#663399`,
              theme_color: `#663399`,
              display: `minimal-ui`,
          },
      },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
