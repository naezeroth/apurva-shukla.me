import Typography from 'typography';
import fairyGatesTheme from 'typography-theme-fairy-gates';

const selectedTheme = fairyGatesTheme;

selectedTheme.overrideThemeStyles = () => ({
  h1: {
    color: 'inherit',
  },
  h2: {
    color: 'inherit',
  },
  h3: {
    color: 'inherit',
  },
  h4: {
    color: 'inherit',
  },
  h5: {
    color: 'inherit',
  },
  a: {
    color: 'var(--textLink)',
    backgroundImage: 'none',
    textShadow: 'none',
    // textDecoration: "inherit",
    boxShadow: '0 1px 0 0 currentColor',
  },
  'a:hover': {
    boxShadow: 'none',
  },
  // gatsby-remark-autolink-headers - don't underline when hidden
  'a.anchor': {
    boxShadow: 'none',
  },
  // gatsby-remark-autolink-headers - use theme colours for the link icon
  'a.anchor svg[aria-hidden="true"]': {
    stroke: 'var(--textLink) !important',
  },
  hr: {
    background: 'var(--hr) !important',
  },
  blockquote: {
    color: 'var(--textNormal) !important',
  },
});

const typography = new Typography(selectedTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const { rhythm } = typography;
export const { scale } = typography;
