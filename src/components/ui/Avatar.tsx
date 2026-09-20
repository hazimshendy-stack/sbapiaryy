import { cx, initials } from '@/lib/format';

interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
}

export function Avatar({ name, size = 52, className }: AvatarProps) {
  const style = {
    width: size,
    height: size,
    fontSize: Math.max(11, Math.round(size * 0.34)),
  };
  return (
    <span className={cx('avatar', className)} style={style} aria-hidden="true">
      {initials(name)}
    </span>
  );
}
