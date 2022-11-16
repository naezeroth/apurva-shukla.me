import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import CustomTerminal from '../components/custom-terminal';

class IndexPage extends React.Component {
    render() {
        const { data } = this.props;
        const siteTitle = data.site.siteMetadata.title;
        return (
            <Layout location={this.props.location} title={siteTitle}>
                <CustomTerminal />
            </Layout>
        );
    }
}

export const query = graphql`
    query {
        site {
            siteMetadata {
                title
                description
                author
            }
        }
        avatar: file(absolutePath: { regex: "/profile.png/" }) {
            childImageSharp {
                original {
                    src
                }
            }
        }
    }
`;

export const Head = ({ location, params, data, pageContext }) => (
    <SEO pathname={location.pathname} />
);

export default IndexPage;
