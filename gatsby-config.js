const path = require('path');
// Get paths of Gatsby's required rules, which as of writing is located at:
// https://github.com/gatsbyjs/gatsby/tree/fbfe3f63dec23d279a27b54b4057dd611dce74bb/packages/
// gatsby/src/utils/eslint-rules
const gatsbyRequiredRules = path.join(
  process.cwd(),
  'node_modules',
  'gatsby',
  'dist',
  'utils',
  'eslint-rules',
);

module.exports = {
  siteMetadata: {
    title: 'Apurva Shukla',
    author: 'Apurva Shukla',
    description: 'Hi there! You can find my blog, photographs and projects here',
    image: '/profile.png',
    siteUrl: 'https://apurva-shukla.me',
    social: {
      linkedin: 'https://www.linkedin.com/in/apurva-shukla/',
      github: 'https://github.com/naezeroth/',
      mail: 'mailto:hello@apurva-shukla.me',
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
    'gatsby-plugin-dark-mode',
    'gatsby-plugin-sharp-exif',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
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
        path: `${__dirname}/content/bookshelf`,
        name: 'bookshelf',
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
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
              showCaptions: true,
              wrapperStyle: 'border-style: none; text-align: center',
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
            resolve: 'gatsby-remark-prismjs',
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
            require('remark-gfm'),
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
            serialize: ({ query: { site, allMdx } }) => allMdx.edges.map((edge) => {
              const pageTitle = edge.node.frontmatter.tags && edge.node.frontmatter.tags.includes('bookshelf') ? 'bookshelf' : 'blog';
              return {
                ...edge.node.frontmatter,
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: `${site.siteMetadata.siteUrl}/${pageTitle}${edge.node.fields.slug}`,
                guid: `${site.siteMetadata.siteUrl}/${pageTitle}${edge.node.fields.slug}`,
                // eslint-disable-next-line camelcase
                custom_elements: [
                  {
                    'content:encoded': edge.node.html,
                  },
                ],
              };
            }),
            // https://github.com/gatsbyjs/gatsby/discussions/25068 - html not working
            query: `{
                      allMdx(sort: {frontmatter: {date: DESC}}) {
                          edges {
                            node {
                                excerpt
                                fields {
                                  slug
                                }
                                frontmatter {
                                  title
                                  date
                                  tags
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
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        // Gatsby required rules directory
        rulePaths: [gatsbyRequiredRules],
        // Default settings that may be omitted or customized
        stages: ['develop'],
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        exclude: [
          'node_modules',
          'bower_components',
          '.cache',
          'public',
        ],
        // Any additional eslint-webpack-plugin options below
        // ...
      },
    },
    'gatsby-plugin-remove-serviceworker',
  ],
};
