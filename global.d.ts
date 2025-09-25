// Top-level ambient declarations for style and static asset imports.
// This file ensures editors/TypeScript server can resolve side-effect CSS imports
// and CSS module imports used throughout the Next.js app.

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.css' {
  // side-effect imports (e.g. import '../styles/globals.css') may not have exports
  const content: { readonly [className: string]: string } | string;
  export default content;
}

declare module '*.scss' {
  const content: { readonly [className: string]: string } | string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';
declare module '*.avif';

export {};
