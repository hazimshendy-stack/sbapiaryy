import { useState } from 'react';
import { Link } from 'react-router-dom';
import { teams } from '@/data/teams';
import type { TeamId } from '@/types';
import { getLeaderboard, getOrgStats, getTeamLeaderboard } from '@/lib/derive';
import { Avatar } from '@/components/ui/Avatar';
import { PageHeader } from '@/components/ui/PageHeader';
import { Stat, StatRow } from '@/components/ui/Stat';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cx } from '@/lib/format';

export function LeaguePage() {
  const [filter, setFilter] = useState<TeamId | 'all'>('all');
  const stats = getOrgStats();

  const board = filter === 'all' ? getLeaderboard() : getTeamLeaderboard(filter);

  const subtitle =
    filter === 'all'
      ? 'الترتيب العام لجميع الأعضاء حسب النقاط.'
      : 'ترتيب أعضاء فريق ' + (teams.find((t) => t.id === filter)?.name ?? '') + ' حسب النقاط.';

  return (
    <div className="container">
      <PageHeader eyebrow="الترتيب" title="الليج" description={subtitle} />

      <section className="section--tight">
        <StatRow>
          <Stat value={stats.members} label="الأعضاء" />
          <Stat value={stats.totalPoints} label="مجموع النقاط" />
          <Stat value={stats.avgPoints} label="المتوسط" />
        </StatRow>
      </section>

      <div className="toolbar mt-6">
        <div className="chips">
          <button
            type="button"
            className={cx('chip', filter === 'all' && 'is-active')}
            onClick={() => setFilter('all')}
          >عام</button>
          {teams.map((t) => (
            <button
              key={t.id}
              type="button"
              className={cx('chip', filter === t.id && 'is-active')}
              onClick={() => setFilter(t.id)}
            >{t.name}</button>
          ))}
        </div>
      </div>

      <section className="section">
        <SectionHeader
          eyebrow={filter === 'all' ? 'كل الأعضاء' : 'داخل الفريق'}
          title={filter === 'all' ? 'الترتيب العام' : 'ترتيب الفريق'}
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
              {board.map((e) => (
                <tr key={e.member.id}>
                  <td className={'rank rank--' + (e.rank <= 3 ? e.rank : '')}>{e.rank}</td>
                  <td>
                    <Link to={'/members/' + e.member.id} className="row">
                      <Avatar name={e.member.name} size={32} />
                      <span>{e.member.name}</span>
                    </Link>
                  </td>
                  <td className="muted small">{e.member.role}</td>
                  <td>
                    <div className="row" style={{ gap: 6 }}>
                      {e.teams.map((t) => <span key={t.id} className="badge">{t.name}</span>)}
                    </div>
                  </td>
                  <td className="points">{e.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
