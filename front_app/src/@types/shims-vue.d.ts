// Note: This file is used, so that typescript and component import knows what to do.
// https://fettblog.eu/typescript-modules-for-webpack/
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
