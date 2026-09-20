import { site } from '@/data';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="brand">{site.name}</div>
        <div className="footer__note">
          {site.organization} — {site.season} · جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}
