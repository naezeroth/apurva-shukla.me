import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../../../components/flare/layout';
import SEO from '../../../components/flare/seo';
import Hero from '../../../components/flare/hero';
import Content from '../../../components/flare/content';
import CallToAction from '../../../components/flare/cta';

class Flare extends React.Component {
    render() {
        const { data } = this.props;
        const siteTitle = data.site.siteMetadata.title;

        return (
            <Layout>
                <SEO />
                <Hero />
                <Content />
                {/* <CallToAction /> */}
            </Layout>
        );
    }
}

export const query = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`;

export default Flare;
