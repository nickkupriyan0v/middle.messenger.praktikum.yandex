export interface IBlockProps {
  events?: Record<string, (event: Event) => void>;
  [key: string]: unknown;
}

export interface IBlockMeta {
  tagName: string;
  props: IBlockProps;
}

export type TBlockChildren<T = unknown> = Record<string, T | T[]>

export enum BlockEvents {
    Init =  "init",
    flowCdm = "flow:component-did-mount",
    flowCdu = "flow:component-did-update",
    flowRender = "flow:render"
};
