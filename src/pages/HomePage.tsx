import { Link } from 'react-router-dom';
import { site, activeSeason } from '@/data';
import { getOrgStats, getTeamRanking, getTopMembers } from '@/lib/derive';
import { Stat, StatRow } from '@/components/ui/Stat';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TeamCard } from '@/components/team/TeamCard';
import { Avatar } from '@/components/ui/Avatar';

export function HomePage() {
  const stats = getOrgStats();
  const teamRanking = getTeamRanking();
  const topMembers = getTopMembers(5);

  return (
    <>
      {/* ============================================================
          الهيرو — بسيط وشبابي
          ============================================================ */}
      <section className="hero">
        <div className="container">
          <div className="section-head__eyebrow">{activeSeason.label}</div>

          <h1 className="hero__title">
            منحل <em>{site.organization}</em> Sub Branches
          </h1>

          <p className="hero__desc">
            بيتنا الرقمي. كل الأعضاء، كل الفرق، كل النقاط — في مكان واحد.
          </p>

          <div className="hero__actions">
            <Link to="/members" className="btn btn--primary">تصفح الأعضاء</Link>
            <Link to="/league" className="btn btn--ghost">الترتيب العام</Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          الإحصائيات العامة
          ============================================================ */}
      <section className="container section--tight">
        <StatRow>
          <Stat value={stats.members} label="الأعضاء" />
          <Stat value={stats.teams} label="الفرق" />
          <Stat value={stats.totalPoints} label="مجموع النقاط" />
          <Stat value={stats.avgPoints} label="متوسط النقاط" />
        </StatRow>
      </section>

      {/* ============================================================
          ترتيب الفرق
          ============================================================ */}
      <section className="container section">
        <SectionHeader
          eyebrow="ترتيب الفرق"
          title="الفرق حسب النقاط"
          description="مجموع نقاط الأعضاء في كل فريق."
          action={<Link to="/teams" className="btn btn--ghost">كل الفرق</Link>}
        />
        <div className="grid">
          {teamRanking.map((row) => (
            <TeamCard key={row.team.id} row={row} />
          ))}
        </div>
      </section>

      {/* ============================================================
          أعلى الأعضاء
          ============================================================ */}
      <section className="container section">
        <SectionHeader
          eyebrow="الترتيب العام"
          title="أعلى الأعضاء"
          action={<Link to="/league" className="btn btn--ghost">الترتيب الكامل</Link>}
        />
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>#</th>
                <th>العضو</th>
                <th>الدور</th>
                <th>الفرق</th>
                <th>النقاط</th>
              </tr>
            </thead>
            <tbody>
              {topMembers.map((e) => (
                <tr key={e.member.id}>
                  <td className={'rank rank--' + (e.rank <= 3 ? e.rank : '')}>
                    {e.rank}
                  </td>
                  <td>
                    <Link to={'/members/' + e.member.id} className="row">
                      <Avatar name={e.member.name} size={32} />
                      <span>{e.member.name}</span>
                    </Link>
                  </td>
                  <td className="muted small">{e.member.role}</td>
                  <td>
                    <div className="row" style={{ gap: 6 }}>
                      {e.teams.map((t) => (
                        <span key={t.id} className="badge">{t.name}</span>
                      ))}
                    </div>
                  </td>
                  <td className="points">{e.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
