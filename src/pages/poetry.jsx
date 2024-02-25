import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/shared/layout';
import { Header } from '../components/header/header';
import '../components/shared/ripped-paper.css';

const RippedPaper = ({ children }) => (
  <div className="ripped-paper-main">
    <div className="ripped-paper-content">
      {children}
    </div>
  </div>
);

function HomePage(props) {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={props.location} title={siteTitle}>

      <RippedPaper>
        <p>Lost you to the sea,</p>
        <p>Waves breaking, the thin rope frayed</p>
        <p>I'm glad we could swim</p>
        <h4>25/2/24</h4>
      </RippedPaper>

      <RippedPaper>
        <p>The fixtures of my life,</p>
        <p>were familiar Walls I could lean on,</p>
        <p>pressing and pressed back,</p>
        <p>if I press I will fall,</p>
        <p>before, bounded and secure,</p>
        <p>now, boundless and unfamiliar</p>
        {/* <p>the Walls I choose to build will be mine to lean on</p> */}
        <h4>2/1/24</h4>
      </RippedPaper>

      <RippedPaper>
        <p>We traded memories like kisses,</p>
        <p>So many we lost count,</p>
        <p>given so freely, never thinking,</p>
        <p>we'd lose them forever,</p>
        <p>each half, carrying the other,</p>
        <p>like a blurry constellation,</p>
        <p>missing the moments we could superimpose them,</p>
        <p>and see the stars</p>
        <h4>2/1/24</h4>
      </RippedPaper>

      <RippedPaper>
        <p>You held a world inside you,</p>
        <p>I can never forget your curiosity,</p>
        <p>the moments you couldn't stop talking,</p>
        <p>I wish now, you never stop talking,</p>
        <p>sharing your beautiful self with the world,</p>
        <p>it's blessed to have you,</p>
        <p>a world within a world</p>
        <h4>5/1/24</h4>
      </RippedPaper>

      <RippedPaper>
        <p>I still have the lamp you bought me,</p>
        <p>when we had not yet shared our hearts,</p>
        <p>butterflies in my stomach,</p>
        <p>I went to your house for the first time,</p>
        <p>and saw a glimpse of a life that awaited us,</p>
        <p>the many adventures we would have.</p>
        <h4>7/1/24</h4>
      </RippedPaper>

      <RippedPaper>
        <p>It's strange knowing literally everything about someone,</p>
        <p>to then catching up like a friend you haven't seen in a while.</p>
      </RippedPaper>

      <RippedPaper>
        <p>Now days lose their count,</p>
        <p>numbers once significant,</p>
        <p>pass by like lost sheep</p>
        <h4>18/1/24</h4>
      </RippedPaper>

      <RippedPaper>
        <p>Roses in the fridge,</p>
        <p>forever bloomed and red,</p>
        <p>a past that will stay</p>
        <h4>19/1/24</h4>
      </RippedPaper>

      <RippedPaper>
        <p>Lips that once were mine,</p>
        <p>tracing fingers over skin,</p>
        <p>learning to let go,</p>
        <h4>18/1/24</h4>
      </RippedPaper>

      <RippedPaper>
        <p>Walking through memories,</p>
        <p>seeing us before the pain,</p>
        <p> unmarked and so pure,</p>
        <p> retracing my steps,</p>
        <p> now going places,</p>
        <p>I will ever see</p>
        <h4>30/1/24</h4>
      </RippedPaper>

      <RippedPaper>
        <p>You hated your nose,</p>
        <p>wanting another, but I,</p>
        <p>wished I could steal it</p>
        <h4>14/2/24</h4>
      </RippedPaper>

      <RippedPaper>
        <p>I held you too lose,</p>
        <p>till you drifted out of sight,</p>
        <p>lost, can't come back home</p>
        <h4>15/2/24</h4>
      </RippedPaper>

      <RippedPaper>
        <p>You took away the sun,</p>
        <p>until I realised i had my eyes closed,</p>
        <p>Shining as bright as ever,</p>
        <p>in a perfect blue sky,</p>
        <p> I could always feel the warmth</p>
        <h4>8/2/24</h4>
      </RippedPaper>
    </Layout>
  );
}

export default HomePage;

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

export function Head({ location }) {
  return <Header pathName={location.pathName} />;
}
