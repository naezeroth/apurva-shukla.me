module.exports = {
    siteMetadata: {
        title: 'Apurva Shukla',
        author: 'Apurva Shukla',
        description: 'Here you can find my blog, photographs and projects',
        image: `/profile.png`,
        siteUrl: 'https://apurva-shukla.me',
        social: {
            linkedin: 'https://www.linkedin.com/in/apurva-shukla/',
            github: 'https://github.com/naezeroth/',
            mail: 'mailto:hello@apurva-shukla.me',
            twitter: 'https://twitter.com/esaoky',
        },
    },
    plugins: [
        'gatsby-plugin-styled-components',
        'gatsby-plugin-twitter',
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-plugin-sharp',
            options: {
                stripMetadata: false, // EXIF data in original should be preserved
            },
        },
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-dark-mode',
        'gatsby-plugin-sharp-exif',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/pages`,
            },
        },
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
            resolve: 'gatsby-plugin-mdx',
            options: {
                extensions: ['.mdx', '.md'],
                gatsbyRemarkPlugins: [
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 590,
                            showCaptions: true,
                            wrapperStyle:
                                'border-style: none; text-align: center',
                        },
                    },
                    {
                        resolve: 'gatsby-remark-responsive-iframe',
                        options: {
                            wrapperStyle: 'margin-bottom: 1.0725rem',
                        },
                    },
                    {
                        resolve: 'gatsby-remark-copy-linked-files',
                    },
                    {
                        resolve: 'gatsby-remark-smartypants',
                    },
                    {
                        resolve: 'gatsby-remark-embedder',
                        options: {
                            customTransformers: [
                                // Your custom transformers
                            ],
                            services: {
                                // The service-specific options by the name of the service
                            },
                        },
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: 'language-',
                            inlineCodeMarker: null,
                            languageExtensions: [],
                            // Customize the prompt used in shell output
                            // Values below are default
                            prompt: {
                                user: 'root',
                                host: 'localhost',
                                global: false,
                            },
                        },
                    },
                ],
                mdxOptions: {
                    remarkPlugins: [
                        // Add GitHub Flavored Markdown (GFM) support
                        require(`remark-gfm`),
                    ],
                },
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
                            return allMdx.edges.map((edge) => {
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
                        query: `{
                                    allMdx(sort: {frontmatter: {date: DESC}}) {
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
                                }`,
                        output: '/rss.xml',
                        // eslint-disable-next-line quotes
                        title: "Apurva Shukla's RSS Feed",
                        match: '^/blog/',
                    },
                ],
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
        'gatsby-plugin-image',
    ],
};
