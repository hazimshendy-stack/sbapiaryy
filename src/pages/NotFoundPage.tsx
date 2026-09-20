import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="container notfound">
      <div className="notfound__code">404</div>
      <h2 className="mt-4">هذه الخلية فارغة</h2>
      <p className="muted mt-3">الصفحة التي تبحث عنها غير موجودة.</p>
      <Link to="/" className="btn btn--primary mt-6">العودة إلى الرئيسية</Link>
    </div>
  );
}
