// Ambient module declarations for static assets and style imports used in the project

declare module '*.module.css';
declare module '*.module.scss';
declare module '*.module.sass';

declare module '*.css';
declare module '*.scss';
declare module '*.sass';

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

// If you import CSS as a string (side-effect import) this is enough. For CSS modules with typing,
// consider replacing the above with appropriate interface declarations or installing "typed-css-modules".

export {};
