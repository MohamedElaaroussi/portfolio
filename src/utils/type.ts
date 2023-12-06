import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
};

export type Type = {
  id: number;
  name: string;
  avatar: string;

};