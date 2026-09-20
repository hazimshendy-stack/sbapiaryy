import { NavLink } from 'react-router-dom';
import { site } from '@/data';
import { cx } from '@/lib/format';

const LINKS = [
  { to: '/', label: 'الرئيسية', end: true },
  { to: '/members', label: 'الأعضاء' },
  { to: '/teams', label: 'الفرق' },
  { to: '/league', label: 'الترتيب العام' },
  { to: '/about', label: 'عن المنحل' },
];

export function Navbar() {
  return (
    <header className="navbar">
      <nav className="container navbar__inner" aria-label="القائمة الرئيسية">
        <NavLink to="/" className="brand">{site.name}</NavLink>
        <div className="nav-links">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => cx('nav-link', isActive && 'is-active')}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
