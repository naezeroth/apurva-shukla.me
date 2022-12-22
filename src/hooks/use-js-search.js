import * as JsSearch from 'js-search';

export function useJsSearch(
  blogs,
) {
  // Search configuration
  const dataToSearch = new JsSearch.Search('title');
  dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy();
  dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer();
  dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex('title');

  // Fields to search
  dataToSearch.addIndex(['node', 'frontmatter', 'tags']);
  dataToSearch.addIndex(['node', 'frontmatter', 'title']);
  dataToSearch.addIndex(['node', 'frontmatter', 'description']);
  dataToSearch.addIndex(['node', 'body']);

  // Map types and filter out empty nodes
  // console.log('Inside js-Search', blogs);

  const mapNodes = mapBlogsToIndexNodes(blogs);
  dataToSearch.addDocuments(mapNodes);
  const search = (query) => dataToSearch.search(query);

  return { search };
}

export const mapBlogsToIndexNodes = (blogs) => blogs.map((blog) => {
  const actualObject = blog.frontmatter !== undefined ? blog : blog.node;
  return {
    title: actualObject.frontmatter.title,
    node: {
      frontmatter: {
        date: actualObject.frontmatter.date,
        description: actualObject.frontmatter.description,
        title: actualObject.frontmatter.title,
        tags: actualObject.frontmatter.tags,
      },
      fields: {
        slug: actualObject.fields.slug,
        timeToRead: actualObject.fields.timeToRead,
      },
      body: actualObject.body,
    },
  };
});
