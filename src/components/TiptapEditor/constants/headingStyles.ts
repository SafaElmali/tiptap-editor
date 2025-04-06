import { Level } from '@tiptap/extension-heading';

// Common styles for all headings
export const commonHeadingStyles = {
  fontWeight: '600',
  color: '#1a202c',
  marginBottom: '0.75rem',
  fontFamily: 'inherit',
};

// Specific styles for each heading level
export const headingLevelStyles: Record<Level, {
  fontSize: string;
  lineHeight: string;
  additionalStyles?: Record<string, string>;
}> = {
  1: {
    fontSize: '2.5rem',
    lineHeight: '1.2',
    additionalStyles: {
      fontWeight: '700',
    }
  },
  2: {
    fontSize: '2rem',
    lineHeight: '1.3',
    additionalStyles: {
      borderBottom: '1px solid #e2e8f0',
      paddingBottom: '0.25rem',
    }
  },
  3: {
    fontSize: '1.75rem',
    lineHeight: '1.3',
  },
  4: {
    fontSize: '1.5rem',
    lineHeight: '1.4',
  },
  5: {
    fontSize: '1.15rem',
    lineHeight: '1.4',
    additionalStyles: {
      fontStyle: 'italic',
    }
  },
  6: {
    fontSize: '1rem',
    lineHeight: '1.5',
    additionalStyles: {
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    }
  }
};

// Generate CSS style string from style object
export const generateStyleString = (styles: Record<string, string>): string => {
  return Object.entries(styles)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ');
};

// Get complete style object for a heading level
export const getHeadingStyles = (level: Level): Record<string, string> => {
  const levelStyles = headingLevelStyles[level];
  const styles = {
    ...commonHeadingStyles,
    fontSize: levelStyles.fontSize,
    lineHeight: levelStyles.lineHeight,
    ...(levelStyles.additionalStyles || {})
  };
  
  return styles;
};

// Get complete style string for a heading level
export const getHeadingStyleString = (level: Level): string => {
  return generateStyleString(getHeadingStyles(level));
};
