import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import Bio from '../shared/bio';
import Layout from '../shared/layout';
import { rhythm } from '../../utils/typography';
import Button from '../shared/button';
import { TagBar } from './tag-bar';
import { RssButton } from './rss';
import { PageNumber } from './page-number';
import { SubscribeButton } from './blog-post/email-button';
import { Search } from './search';
import { useJsSearch } from '../../hooks/use-js-search';

// CommonBlogComponent
const CommonBlogComponent = ({
  data, pageContext, location, pageTitle,
}) => {
  const siteTitle = data.site.siteMetadata.title;

  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  const { search } = useJsSearch(pageContext.allBlogs);
  const [blogs, setBlogs] = useState(data.allMdx.edges);
  const [searched, setSearched] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');

  // Handles query state and prevents unnecessary rerendering
  useEffect(() => {
    const params = new URLSearchParams(location.search.slice(1));
    const q = params.get('q') ?? '';
    // Check if we have searched
    if (q !== initialQuery) {
      setSearched(false);
    }
    setInitialQuery(q);
    // If no query, reset blogs, also deal with case of empty search bar
    if (!q || q === '') {
      setBlogs(data.allMdx.edges);
      return;
    }
    // If query exists and we haven't searched yet, execute search
    if (q && !searched) {
      const results = search(q);
      setBlogs(results);
      setSearched(true);
    }
  }, [searched, data.allMdx.edges, search, location.search, initialQuery]);

  return (
    <Layout location={location} title={siteTitle}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Bio style={{ marginBottom: '10px' }} />
        <div>
          <SubscribeButton />
          <RssButton />
        </div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
      >
        <Search path={pageTitle} initialQuery={initialQuery} numResults={blogs.length} />
        <Link to="/tag/all-tags" state={{ prevPath: location.pathname }}>
          All Tags
        </Link>
      </div>
      <div style={{ margin: '20px 0 40px' }}>
        {blogs.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 6),
                }}
              >
                <Link
                  style={{ boxShadow: 'none' }}
                  to={`/${pageTitle}${node.fields.slug}`}
                  state={{
                    referringPage: isFirst ? `/${pageTitle}` : `/${pageTitle}/${currentPage}`,
                  }}
                >
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p
                style={{
                  marginBottom: rhythm(1 / 8),
                  marginTop: rhythm(1 / 8),
                }}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
              <small>{node.fields.timeToRead.text}</small>
              {node.frontmatter.tags && <TagBar tags={node.frontmatter.tags} />}
            </div>
          );
        })}
      </div>
      {!initialQuery && (
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            marginBottom: '2rem',
          }}
        >
          {!isFirst && <PageNumber text="«" link={`/${pageTitle}`} />}
          {!isFirst && <PageNumber text="‹" link={`/${pageTitle}/${prevPage}`} />}
          <NumberLinks pageTitle={pageTitle} currentPage={currentPage} numPages={numPages} />
          {!isLast && <PageNumber text="›" link={`/${pageTitle}/${nextPage}`} />}
          {!isLast && <PageNumber text="»" link={`/${pageTitle}/${numPages}`} />}
        </div>
      )}
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </Layout>
  );
};

const NumberLinks = ({ pageTitle, currentPage, numPages }) => {
  const prev = currentPage - 2 <= 1 ? 1 : currentPage - 2;
  const next = currentPage + 2 >= numPages ? numPages : currentPage + 2;
  const ret = [];
  for (let i = prev; i <= next; i += 1) {
    if (i === 1) {
      ret.push(<PageNumber key={i} text={1} link={`/${pageTitle}/`} />);
    } else {
      ret.push(<PageNumber key={i} text={i} link={`/${pageTitle}/${i}`} />);
    }
  }
  return ret;
};

export default CommonBlogComponent;
