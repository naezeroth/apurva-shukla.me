module.exports = {
    siteMetadata: {
        title: 'Apurva Shukla',
        author: 'Apurva Shukla',
        description: 'Here you can find my blog, photographs and projects',
        siteUrl: 'https://apurva-shukla.me',
        social: {
            linkedin: 'https://www.linkedin.com/in/apurva-shukla/',
            github: 'https://github.com/naezeroth/',
            mail: 'mailto:apurvashukla123@pm.me',
            twitter: 'https://twitter.com/esaoky',
        },
    },
    plugins: [
        'gatsby-plugin-netlify-cms',
        'gatsby-plugin-styled-components',
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-plugin-sharp',
            options: {
                stripMetadata: false, // EXIF data in original should be preserved
            },
        },
        'gatsby-plugin-offline',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-dark-mode',
        'gatsby-plugin-sharp-exif',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content/blog`,
                name: 'blog',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content/assets`,
                name: 'assets',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content/photos/built`,
                name: 'built',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content/photos/natural`,
                name: 'natural',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content/photos/people`,
                name: 'people',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content/projects/flare`,
                name: 'flare',
            },
        },
        {
            resolve: 'gatsby-plugin-mdx',
            options: {
                extensions: ['.mdx', '.md'],
                gatsbyRemarkPlugins: [
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 590,
                        },
                    },
                    {
                        resolve: 'gatsby-remark-responsive-iframe',
                        options: {
                            wrapperStyle: 'margin-bottom: 1.0725rem',
                        },
                    },
                    {
                        resolve: 'gatsby-remark-vscode',
                        options: {
                            plugins: [
                                {
                                    resolve: 'gatsby-remark-vscode',
                                    options: {
                                        theme: 'Solarized Light', // Or install your favorite theme from GitHub
                                    },
                                },
                            ],
                        },
                    },
                    {
                        resolve: 'gatsby-remark-copy-linked-files',
                    },
                    {
                        resolve: 'gatsby-remark-smartypants',
                    },
                ],
                plugins: ['gatsby-remark-images'],
            },
        },
        {
            resolve: 'gatsby-plugin-feed',
            options: {
                query: `
            {
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                  site_url: siteUrl
                }
              }
            }
          `,
                feeds: [
                    {
                        serialize: ({ query: { site, allMdx } }) => {
                            return allMdx.edges.map(edge => {
                                return Object.assign(
                                    {},
                                    edge.node.frontmatter,
                                    {
                                        description: edge.node.excerpt,
                                        date: edge.node.frontmatter.date,
                                        url:
                                            site.siteMetadata.siteUrl +
                                            edge.node.fields.slug,
                                        guid:
                                            site.siteMetadata.siteUrl +
                                            edge.node.fields.slug,
                                        // eslint-disable-next-line camelcase
                                        custom_elements: [
                                            {
                                                'content:encoded':
                                                    edge.node.html,
                                            },
                                        ],
                                    }
                                );
                            });
                        },
                        query: `
                    {
                      allMdx(
                        sort: { fields: [frontmatter___date], order: DESC }
                      ) {
                        edges {
                          node {
                            excerpt
                            html
                            fields {
                              slug
                            }
                            frontmatter {
                              title
                              date
                            }
                          }
                        }
                      }
                    }
                  `,
                        output: '/rss.xml',
                        // eslint-disable-next-line quotes
                        title: "Apurva Shukla's RSS Feed",
                        match: '^/blog/',
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-matomo',
            options: {
                siteId: '1',
                matomoUrl: 'https://matomo.apurva-shukla.me/',
                siteUrl: 'https://apurva-shukla.me',
            },
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'Gatsby Starter Blog',
                short_name: 'GatsbyJS',
                start_url: '/',
                background_color: '#ffffff',
                theme_color: '#663399',
                display: 'minimal-ui',
                icon: 'content/assets/favicon.ico',
            },
        },
        'gatsby-transformer-yaml',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/comments`,
                name: 'comments',
            },
        },
        {
            resolve: 'gatsby-plugin-typography',
            options: {
                pathToConfigModule: 'src/utils/typography',
            },
        },
    ],
};
