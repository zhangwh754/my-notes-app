import "./icon.css";

interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className = "" }: IconProps) {
  return (
    <svg className={`iconfont ${className}`} aria-hidden="true">
      <use xlinkHref={`#${name}`} />
    </svg>
  );
}
