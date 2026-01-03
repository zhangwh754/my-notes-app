import type { SVGProps } from "react";
import "./icon.css";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
}

export function Icon({ name, className = "", ...props }: IconProps) {
  return (
    <svg className={`iconfont ${className}`} aria-hidden="true" {...props}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
}
