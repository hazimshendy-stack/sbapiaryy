import { site, activeSeason, seasons } from '@/data';
import { getOrgStats } from '@/lib/derive';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Stat, StatRow } from '@/components/ui/Stat';
import { formatDate } from '@/lib/format';

export function AboutPage() {
  const stats = getOrgStats();

  return (
    <div className="container">
      <PageHeader eyebrow="عن المنحل" title={site.name} description={site.description} />

      <section className="section--tight">
        <StatRow>
          <Stat value={stats.members} label="الأعضاء" />
          <Stat value={stats.teams} label="الفرق" />
          <Stat value={stats.totalPoints} label="مجموع النقاط" />
        </StatRow>
      </section>

      <section className="section">
        <SectionHeader eyebrow="الموسم الحالي" title={activeSeason.label} description={activeSeason.theme} />
        <div className="grid grid--wide">
          <div className="card">
            <div className="kv">
              <span className="kv__k">الموسم</span>
              <span className="kv__v">{activeSeason.label}</span>
            </div>
            <div className="kv mt-4">
              <span className="kv__k">البداية</span>
              <span className="kv__v">{formatDate(activeSeason.start)}</span>
            </div>
            <div className="kv mt-4">
              <span className="kv__k">النهاية</span>
              <span className="kv__v">{formatDate(activeSeason.end)}</span>
            </div>
          </div>
          <div className="card">
            <div className="card__title">المواسم السابقة</div>
            <div className="stack mt-4">
              {seasons.map((s) => (
                <div key={s.id} className="row" style={{ justifyContent: 'space-between' }}>
                  <span>{s.label}</span>
                  <span className="muted small">{s.theme}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeader eyebrow="تواصل" title="البريد الإلكتروني" />
        <div className="card">
          <a className="kv__v" href={'mailto:' + site.email}>{site.email}</a>
        </div>
      </section>
    </div>
  );
}
