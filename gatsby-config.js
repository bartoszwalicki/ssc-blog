module.exports = {
  siteMetadata: {
    title: `SSC Blog`,
  },
  plugins: [
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/pages`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 790,
              quality: 80,
              backgroundColor: 'transparent',
              withWebp: true,
              linkImagesToOriginal: false
            },
          },
        ],
      },
    },
  ],
}
