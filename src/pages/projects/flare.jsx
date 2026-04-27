import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/shared/layout';
import { Header } from '../../components/header/header';

const styles = {
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '2rem 1rem 1rem',
    background: 'linear-gradient(180deg, #FFB347 0%, #FF9B4E 50%, #FF8654 100%)',
    color: '#fff',
    borderRadius: '20px',
    marginBottom: '2rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
  },
  appIcon: {
    width: '120px',
    height: '120px',
    borderRadius: '28px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
    marginBottom: '1rem',
    objectFit: 'cover',
  },
  appTitle: {
    margin: '0.25rem 0 0',
    fontSize: 'clamp(2rem, 6vw, 3rem)',
    color: '#fff',
  },
  tagline: {
    margin: '0.5rem 0 1.5rem',
    fontSize: 'clamp(1rem, 3.5vw, 1.25rem)',
    maxWidth: '36rem',
    color: 'rgba(255,255,255,0.95)',
  },
  ctaRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.85rem 1.5rem',
    background: '#000',
    color: '#fff',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: 600,
    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
  },
  section: {
    marginBottom: '2.5rem',
  },
  sectionTitle: {
    fontSize: 'clamp(1.4rem, 4.5vw, 1.85rem)',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1rem',
  },
  featureCard: {
    background: 'var(--subscribeBackground)',
    borderRadius: '16px',
    padding: '1.25rem',
    boxShadow: 'var(--formShadow)',
    transition: 'transform 0.2s ease',
  },
  featureEmoji: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
    display: 'block',
  },
  featureTitle: {
    margin: '0 0 0.4rem',
    fontSize: '1.1rem',
  },
  featureBody: {
    margin: 0,
    fontSize: '0.95rem',
    lineHeight: 1.5,
  },
  screenshotRow: {
    display: 'flex',
    gap: '1rem',
    overflowX: 'auto',
    padding: '0.5rem 0.25rem 1rem',
    scrollSnapType: 'x mandatory',
    WebkitOverflowScrolling: 'touch',
  },
  screenshot: {
    flex: '0 0 auto',
    width: 'min(70vw, 260px)',
    height: 'auto',
    borderRadius: '24px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
    scrollSnapAlign: 'center',
    background: '#000',
  },
  testimonial: {
    background: 'var(--subscribeBackground)',
    borderLeft: '4px solid #FFB347',
    padding: '1rem 1.25rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontStyle: 'italic',
    boxShadow: 'var(--formShadow)',
  },
  closingCta: {
    textAlign: 'center',
    padding: '2rem 1rem',
    background: 'linear-gradient(180deg, rgba(255,179,71,0.15), rgba(255,134,84,0.15))',
    borderRadius: '20px',
  },
};

const APP_STORE_URL = 'https://apps.apple.com/au/app/flare-vocabulary-builder/id1585958827';

const features = [
  {
    emoji: '📚',
    title: '100,000+ Words',
    body: 'A fully offline dictionary packed with over 100,000 words and phrases — search anything, anywhere.',
  },
  {
    emoji: '🎮',
    title: 'Learn by Playing',
    body: 'The best way to learn is to play! Practise the words in your lists and watch your progress grow.',
  },
  {
    emoji: '🧠',
    title: 'Spaced Repetition',
    body: "Words resurface just before you'd forget them, using a proven technique to maximise retention.",
  },
  {
    emoji: '🗂️',
    title: 'Custom Lists',
    body: 'Add words to lists you create. Organise vocabulary your way — by book, topic, or mood.',
  },
  {
    emoji: '📝',
    title: 'Notes & Export',
    body: 'Annotate any word or list with personal notes, and export your data whenever you want.',
  },
  {
    emoji: '🌙',
    title: 'Dark Mode',
    body: "Night owl? Flare's dark mode is gentle on your eyes for late-night learning sessions.",
  },
];

function FlareLanding(props) {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;

  const appIcon = data.appIcon?.publicURL;
  const screenshots = (data.screenshots?.nodes || [])
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((node, idx) => ({
      src: node.publicURL,
      alt: `Flare app screenshot ${idx + 1}`,
    }));

  return (
    <Layout location={props.location} title={siteTitle}>
      <article>
        {/* Hero */}
        <section style={styles.hero}>
          <img
            src={appIcon}
            alt="Flare app icon"
            style={styles.appIcon}
            loading="eager"
          />
          <h1 style={styles.appTitle}>Flare</h1>
          <p style={styles.tagline}>
            A vocabulary builder &amp; offline dictionary that helps you learn new words
            without even realising it.
          </p>
          <div style={styles.ctaRow}>
            <a
              style={styles.primaryButton}
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
            >
              <span aria-hidden="true">🍎</span>
              Download on the App Store
            </a>
          </div>
          <small style={{ opacity: 0.85 }}>Free • iOS • Offline ready</small>
        </section>

        {/* Pitch */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Stuck on that word you just read?</h2>
          <p
            style={{
              textAlign: 'center',
              maxWidth: '40rem',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Learning new words is hard, and it requires consistent effort.
            With Flare, you won&apos;t even realise you&apos;re doing it. Search a word, save it
            to a list, and let the game do the rest.
          </p>
        </section>

        {/* Features grid */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Why Flare?</h2>
          <div style={styles.featureGrid}>
            {features.map((feature) => (
              <div key={feature.title} style={styles.featureCard}>
                <span style={styles.featureEmoji} aria-hidden="true">{feature.emoji}</span>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureBody}>{feature.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Screenshots — straight from the App Store */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>A peek inside</h2>
          <div style={styles.screenshotRow}>
            {screenshots.map((shot) => (
              <img
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                style={styles.screenshot}
                loading="lazy"
              />
            ))}
          </div>
          <p
            style={{
              textAlign: 'center',
              fontSize: '0.85rem',
              color: 'var(--tagNormal)',
              marginTop: '0.5rem',
            }}
          >
            Swipe to browse →
          </p>
        </section>

        {/* Testimonial */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Loved by lifelong learners</h2>
          <div style={styles.testimonial}>
            “Finally a vocab app that doesn&apos;t feel like a chore. I add words while I read,
            and Flare quietly turns them into a habit.”
            <div style={{ marginTop: '0.5rem', fontStyle: 'normal', fontWeight: 600 }}>— A happy reader</div>
          </div>
          <div style={styles.testimonial}>
            “The offline dictionary alone is worth it.
            The spaced-repetition game is the cherry on top.”
            <div style={{ marginTop: '0.5rem', fontStyle: 'normal', fontWeight: 600 }}>
              — Bookworm in transit
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section style={styles.closingCta}>
          <h2 style={{ marginTop: 0 }}>Ready to grow your vocabulary?</h2>
          <p style={{ maxWidth: '32rem', margin: '0 auto 1.25rem' }}>
            Download Flare for free today and start collecting words you love.
          </p>
          <div style={styles.ctaRow}>
            <a
              style={styles.primaryButton}
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
            >
              <span aria-hidden="true">🍎</span>
              Download on the App Store
            </a>
          </div>
        </section>
      </article>
    </Layout>
  );
}

export default FlareLanding;

export const query = graphql`
    query {
        site {
            siteMetadata {
                title
                description
                author
            }
        }
        appIcon: file(
            sourceInstanceName: { eq: "assets" }
            relativePath: { eq: "flare/app-icon.png" }
        ) {
            publicURL
        }
        screenshots: allFile(
            filter: {
                sourceInstanceName: { eq: "assets" }
                relativeDirectory: { eq: "flare" }
                name: { regex: "/^screenshot-/" }
            }
            sort: { name: ASC }
        ) {
            nodes {
                name
                publicURL
            }
        }
    }
`;

export function Head({ location }) {
  return <Header pathName={location.pathName} />;
}
