import React, { useEffect, useState } from 'react';
import { Link, graphql } from 'gatsby';
import Bio from '../components/shared/bio';
import Layout from '../components/shared/layout';
import { rhythm, scale } from '../utils/typography';
import { Back } from '../components/shared/social-icons';
import Comments from '../components/blog/blog-post/comments';
import { SubscribeForm } from '../components/blog/blog-post/subscribe-form';
import { Header } from '../components/header/header';
import { TagBar } from '../components/blog/tag-bar';

function BlogPostTemplate({
  data: { mdx, site, comments },
  children,
  location,
  pageContext,
}) {
  const siteTitle = site.siteMetadata.title;
  const { previous, next } = pageContext;
  const allComments = comments.edges;

  // Some magical code to try ascertain where the user came from
  const [pageTitleFromURL, setPageTitleFromURL] = useState(null);

  useEffect(() => {
    setPageTitleFromURL((window && window.location.href.includes('blog')) ? '/blog' : '/bookshelf');
  }, []);

  const referringPage = location.state && location.state.referringPage
    ? location.state.referringPage : pageTitleFromURL;

  return (
    <Layout location={location} title={siteTitle}>
      {/* Below deals with case if referred by another page other than BlogList */}
      <Link to={referringPage || '/blog'}>
        <div
          style={{
            textDecoration: 'none !important',
            boxShadow: 'none !important',
          }}
        >
          <Back />
        </div>
      </Link>
      <Title title={mdx.frontmatter.title} />
      <Date date={mdx.frontmatter.date} />
      <TimeToRead timeToRead={mdx.fields.timeToRead.text} />
      {children}
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <SubscribeForm />
      <hr />
      {mdx.frontmatter.tags && (
        <TagBar tags={mdx.frontmatter.tags} fontSize="100%" location={location} />
      )}
      <hr
        style={{
          marginTop: rhythm(1),
        }}
      />
      <Bio />
      <br />
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={`${pageTitleFromURL || '/blog'}${previous.fields.slug}`} rel="prev">
              ←
              {' '}
              {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={`${pageTitleFromURL || '/blog'}${next.fields.slug}`} rel="next">
              {next.frontmatter.title}
              {' '}
              →
            </Link>
          )}
        </li>
      </ul>
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <Comments slug={pageContext.slug} comments={allComments} />
    </Layout>
  );
}
export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $slugWithoutSlash: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        featuredimage {
          childImageSharp {
            original {
              src
            }
          }
        }
        tags
      }
      fields {
        timeToRead {
          minutes
          text
          time
          words
        }
      }
    }
    comments: allCommentsYaml(
      filter: { slug: { eq: $slugWithoutSlash } }
      sort: { date: ASC }
    ) {
      edges {
        node {
          _id
          slug
          name
          date
          message
          replying_to_uid
        }
      }
    }
  }
`;

export function Head({ location, data }) {
  return (
    <Header
      title={`${data.mdx.frontmatter.title} | ${data.site.siteMetadata.title}`}
      pathname={location.pathname}
      description={data.mdx.frontmatter.description || data.mdx.excerpt}
      image={
        data.mdx.frontmatter.featuredimage
          ? data.mdx.frontmatter.featuredimage.childImageSharp.original.src
          : undefined
      }
    />
  );
}

const Title = ({ title }) => (
  <h1
    style={{
      marginTop: rhythm(1 / 2),
      marginBottom: rhythm(1 / 8),
    }}
  >
    {title}
  </h1>
);

const Date = ({ date }) => (
  <span
    style={{
      ...scale(-1 / 5),
      display: 'block',
    }}
  >
    {date}
  </span>
);

const TimeToRead = ({ timeToRead }) => (
  <span
    style={{
      ...scale(-1 / 5),
      display: 'block',
      marginBottom: rhythm(1),
    }}
  >
    <i>{timeToRead}</i>
  </span>
);
