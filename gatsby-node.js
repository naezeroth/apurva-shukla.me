const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const readingTime = require('reading-time');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const blogPosts = await graphql(
    `
      {
        allMdx(sort: { frontmatter: { date: DESC } }, filter: { frontmatter: { tags: { nin: ["bookshelf"] } } }) {
          nodes {
            id
            body
            fields {
              slug
              timeToRead {
                text
              }
            }
            frontmatter {
              title
              tags
              description
            }
            internal {
              contentFilePath
            }
          }
        }
        tagsGroup: allMdx {
          group(field: { frontmatter: { tags: SELECT } }) {
            fieldValue
          }
        }
      }
    `,
  );

  const bookshelfPosts = await graphql(
    `
      {
        allMdx(sort: { frontmatter: { date: DESC } }, filter: { frontmatter: { tags: { in: ["bookshelf"] } } }) {
          nodes {
            id
            body
            fields {
              slug
              timeToRead {
                text
              }
            }
            frontmatter {
              title
              tags
              description
            }
            internal {
              contentFilePath
            }
          }
        }
        tagsGroup: allMdx {
          group(field: { frontmatter: { tags: SELECT } }) {
            fieldValue
          }
        }
      }
    `,
  );

  if (blogPosts.errors) {
    reporter.panicOnBuild('Error loading MDX blogPosts result', blogPosts.errors);
  } else if (bookshelfPosts.errors) {
    reporter.panicOnBuild('Error loading MDX bookshelfPosts result', bookshelfPosts.errors);
  }

  /**
   * BLOG POST RENDERING
   */

  const blogPostNodes = blogPosts.data.allMdx.nodes;

  const blogList = path.resolve('./src/templates/blog-list.jsx');
  const postsPerPage = 10;
  const numPages = Math.ceil(blogPostNodes.length / postsPerPage);

  for (let i = 0; i < numPages; i += 1) {
    createPage({
      path: i === 0 ? '/blog' : `/blog/${i + 1}`,
      component: `${blogList}`,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        allBlogs: blogPostNodes,
      },
    });
  }

  // Create blog posts pages.
  const blogPost = path.resolve('./src/templates/blog-post.jsx');

  blogPostNodes.forEach((post, index) => {
    const previous = index === blogPostNodes.length - 1 ? null : blogPostNodes[index + 1];
    const next = index === 0 ? null : blogPostNodes[index - 1];

    createPage({
      path: `blog${post.fields.slug}`,
      component: `${blogPost}?__contentFilePath=${post.internal.contentFilePath}`,
      context: {
        id: post.id,
        slug: post.fields.slug,
        slugWithoutSlash: post.fields.slug.slice(1, -1),
        previous,
        next,
      },
    });
  });

  /**
   * BOOKSHELF & BOOKS RENDERING
   */

  const bookshelfPostNodes = bookshelfPosts.data.allMdx.nodes;

  const bookshelf = path.resolve('./src/templates/bookshelf.jsx');
  const numBookshelfPages = Math.ceil(bookshelfPostNodes.length / postsPerPage);

  for (let i = 0; i < numBookshelfPages; i += 1) {
    createPage({
      path: i === 0 ? '/bookshelf' : `/bookshelf/${i + 1}`,
      component: `${bookshelf}`,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages: numBookshelfPages,
        currentPage: i + 1,
        allBlogs: bookshelfPostNodes,
      },
    });
  }

  // Create blog posts pages.

  bookshelfPostNodes.forEach((post, index) => {
    const previous = index === bookshelfPostNodes.length - 1 ? null : bookshelfPostNodes[index + 1];
    const next = index === 0 ? null : bookshelfPostNodes[index - 1];

    createPage({
      path: `bookshelf${post.fields.slug}`,
      component: `${blogPost}?__contentFilePath=${post.internal.contentFilePath}`,
      context: {
        id: post.id,
        slug: post.fields.slug,
        slugWithoutSlash: post.fields.slug.slice(1, -1),
        previous,
        next,
      },
    });
  });

  /**
   * TAGS rendering below
   */

  const tags = await graphql(
    `
      {
        tagsGroup: allMdx {
          group(field: { frontmatter: { tags: SELECT } }) {
            fieldValue
          }
        }
      }
    `,
  );

  // Create tag page
  const tagTemplate = path.resolve('./src/templates/tag.jsx');
  const tagList = tags.data.tagsGroup.group;

  tagList.forEach((tag) => {
    createPage({
      path: `tag/${tag.fieldValue}`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });

  // Create all-tags page with list of all tags.
  // Potential for pagination if the tags grow but for now can be one page.
  const allTagsTemplate = path.resolve('./src/templates/all-tags.jsx');
  createPage({
    path: 'tag/all-tags',
    component: allTagsTemplate,
    context: {
      tags: tagList,
    },
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value,
    });
    createNodeField({
      node,
      name: 'timeToRead',
      value: readingTime(node.body),
    });
  }
};
