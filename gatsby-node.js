const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const readingTime = require('reading-time');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(
    `{
      allMdx(sort: {frontmatter: {date: DESC}}) {
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
        group(field: {frontmatter: {tags: SELECT}}) {
          fieldValue
        }
      }
    }`,
  );

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors);
  }

  const posts = result.data.allMdx.nodes;

  const blogList = path.resolve('./src/templates/blog-list.jsx');
  const postsPerPage = 10;
  const numPages = Math.ceil(posts.length / postsPerPage);

  for (let i = 0; i < numPages; i += 1) {
    createPage({
      path: i === 0 ? '/blog' : `/blog/${i + 1}`,
      component: `${blogList}`,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        allBlogs: posts,
      },
    });
  }

  // Create blog posts pages.
  const blogPost = path.resolve('./src/templates/blog-post.jsx');

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

  // Create tag page
  const tagTemplate = path.resolve('./src/templates/tag.jsx');
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

  // Create all-tags page with list of all tags.
  // Potential for pagination if the tags grow but for now can be one page.
  const allTagsTemplate = path.resolve('./src/templates/all-tags.jsx');
  createPage({
    path: 'blog/all-tags',
    component: allTagsTemplate,
    context: {
      tags: result.data.tagsGroup.group,
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
