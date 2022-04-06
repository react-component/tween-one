import React from 'react';

export const windowIsUndefined = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const useIsomorphicLayoutEffect = windowIsUndefined
  ? React.useEffect
  : React.useLayoutEffect;
