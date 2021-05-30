const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    const tagTemplate = path.resolve('./src/templates/tag.js');
    const blogPost = path.resolve('./src/templates/blog-post.js');
    return graphql(
        `
            {
                allMdx(
                    sort: { fields: [frontmatter___date], order: DESC }
                    limit: 1000
                ) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                            }
                        }
                    }
                }
                tagsGroup: allMdx(limit: 2000) {
                    group(field: frontmatter___tags) {
                        fieldValue
                    }
                }
            }
        `
    )
        .then(result => {
            if (result.errors) {
                throw result.errors;
            }

            // Create blog posts pages.
            const posts = result.data.allMdx.edges;

            posts.forEach((post, index) => {
                const previous =
                    index === posts.length - 1 ? null : posts[index + 1].node;
                const next = index === 0 ? null : posts[index - 1].node;

                createPage({
                    path: `blog${post.node.fields.slug}`,
                    component: blogPost,
                    context: {
                        slug: post.node.fields.slug,
                        slugWithoutSlash: post.node.fields.slug.slice(1, -1),
                        previous: previous,
                        next: next,
                    },
                });
            });

            return result;
        })
        .then(result => {
            console.log('result data is ', result.data);

            const tags = result.data.tagsGroup.group;
            tags.forEach(tag => {
                createPage({
                    path: `blog/tag/${tag.fieldValue}`,
                    component: tagTemplate,
                    context: {
                        tag: tag.fieldValue,
                    },
                });
            });
        });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === 'Mdx') {
        const value = createFilePath({ node: node, getNode: getNode });
        createNodeField({
            name: 'slug',
            node: node,
            value: value,
        });
    }
};
