import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import CustomTerminal from '../components/custom-terminal';

class IndexPage extends React.Component {
    render() {
        const { data } = this.props; // I'm assuming the query is populating the this.props, the {data} is extracting data variable inside this.props
        const siteTitle = data.site.siteMetadata.title;
        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO
                    title="Home"
                    keywords={[ 'blog', 'gatsby', 'javascript', 'react' ]}
                />
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
    }
`;

export default IndexPage;
