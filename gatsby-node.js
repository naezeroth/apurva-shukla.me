const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const readingTime = require('reading-time');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const tagTemplate = path.resolve('./src/templates/tag.jsx');
  const blogPost = path.resolve('./src/templates/blog-post.jsx');

  const result = await graphql(
    `{
    allMdx(sort: {frontmatter: {date: DESC}}, limit: 1000) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
        }
        internal {          
          contentFilePath        
        }
      }
    }
    tagsGroup: allMdx(limit: 2000) {
      group(field: {frontmatter: {tags: SELECT}}) {
        fieldValue
      }
    }
    }`,
  );

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors);
  }

  // Create blog posts pages.
  const posts = result.data.allMdx.nodes;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1];
    const next = index === 0 ? null : posts[index - 1];

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

  const tags = result.data.tagsGroup.group;
  tags.forEach((tag) => {
    createPage({
      path: `blog/tag/${tag.fieldValue}`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
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
