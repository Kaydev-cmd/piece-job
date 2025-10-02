// globals.d.ts

// CSS / SCSS / SASS modules
declare module "*.css";
declare module "*.scss";
declare module "*.sass";

// Images
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.webp";
declare module "*.avif";
declare module "*.svg" {
  import * as React from "react";
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default content;
}

// Fonts
declare module "*.woff";
declare module "*.woff2";
declare module "*.eot";
declare module "*.ttf";
declare module "*.otf";

// Other file types (optional)
declare module "*.json";
