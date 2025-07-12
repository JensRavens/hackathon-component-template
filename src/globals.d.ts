import * as ReactNamespace from 'react';

declare global {
  const React: typeof ReactNamespace;
  namespace JSX {
    interface IntrinsicElements extends ReactNamespace.JSX.IntrinsicElements { }
  }
}
