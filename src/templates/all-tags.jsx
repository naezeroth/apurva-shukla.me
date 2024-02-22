import React from 'react';
import { Link, graphql } from 'gatsby';
import Bio from '../components/shared/bio';
import Layout from '../components/shared/layout';
import { Back } from '../components/shared/social-icons';
import { RssButton } from '../components/blog/rss';
import { SubscribeButton } from '../components/blog/blog-post/email-button';
import { Header } from '../components/header/header';
import { TagBar } from '../components/blog/tag-bar';

function AllTags(props) {
  const { tags } = props.pageContext;
  const { location } = props;
  const siteTitle = props.data.site.siteMetadata.title;
  const allTags = tags.map(({ fieldValue }) => fieldValue);

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
      <div>
        <h1>All Tags</h1>
        <Link to={props?.location?.state?.prevPath ?? '/blog'}>
          <div
            style={{
              textDecoration: 'none !important',
              boxShadow: 'none !important',
              paddingTop: '20px',
            }}
          >
            <Back />
          </div>
        </Link>
        <br />
        <TagBar tags={allTags} fontSize="24px" location={location} />
      </div>
    </Layout>
  );
}

export default AllTags;

export const pageQuery = graphql`
    {
        site {
            siteMetadata {
                title
            }
        }
    }
`;

export function Head({ location }) {
  return <Header pathName={location.pathName} />;
}
