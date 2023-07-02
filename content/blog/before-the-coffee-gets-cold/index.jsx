import React from 'react';
import { useCollapse } from 'react-collapsed';

export const Collapsible = ({ children }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div>
      <button type="button" {...getToggleProps()}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
      <section {...getCollapseProps()}>{children}</section>
    </div>
  );
};
