import React from "react";
import { NodeViewProps, NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { Level } from "@tiptap/extension-heading";

interface HeadingStyles {
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  color: string;
  marginBottom: string;
  fontFamily: string;
  additionalStyles?: Record<string, string>;
}

// Common styles for all headings
const commonHeadingStyles: Omit<HeadingStyles, "fontSize" | "lineHeight" | "color"> = {
  fontWeight: "600",
  marginBottom: "0.75rem",
  fontFamily: "inherit",
};

// Specific styles for each heading level
const headingLevelStyles: Record<
  Level,
  Pick<HeadingStyles, "fontSize" | "lineHeight"> & {
    additionalStyles?: Record<string, string>;
  }
> = {
  1: {
    fontSize: "2.5rem",
    lineHeight: "1.2",
    additionalStyles: {
      fontWeight: "700",
    },
  },
  2: {
    fontSize: "2rem",
    lineHeight: "1.3",
  },
  3: {
    fontSize: "1.75rem",
    lineHeight: "1.3",
  },
  4: {
    fontSize: "1.5rem",
    lineHeight: "1.4",
  },
  5: {
    fontSize: "1.15rem",
    lineHeight: "1.4",
    additionalStyles: {
      fontStyle: "italic",
    },
  },
  6: {
    fontSize: "1rem",
    lineHeight: "1.5",
    additionalStyles: {
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
  },
};

// Get complete style object for a heading level
const getHeadingStyles = (level: Level): React.CSSProperties => {
  const levelStyles = headingLevelStyles[level];
  return {
    ...commonHeadingStyles,
    fontSize: levelStyles.fontSize,
    lineHeight: levelStyles.lineHeight,
    ...(levelStyles.additionalStyles || {}),
  };
};

const HeadingView: React.FC<NodeViewProps> = ({ node, selected }) => {
  const { level, color, backgroundColor } = node.attrs;
  const Tag = `h${level}` as React.ElementType;
  const styles = {
    ...getHeadingStyles(level),
    color: color,
    backgroundColor: backgroundColor
  };

  return (
    <NodeViewWrapper>
      <Tag
        style={styles}
        className={`heading-level-${level} ${selected ? "selected" : ""}`}
        data-level={level}
        data-color={color}
        data-background-color={backgroundColor}
      >
        <NodeViewContent />
      </Tag>
    </NodeViewWrapper>
  );
};

export default HeadingView;
