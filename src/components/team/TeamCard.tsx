import { Link } from 'react-router-dom';
import type { TeamRank } from '@/lib/derive';

export function TeamCard({ row }: { row: TeamRank }) {
  const monogram = row.team.name.slice(0, 2).toUpperCase();

  return (
    <Link to={'/teams/' + row.team.id} className="card">
      <div className="team-card__head">
        <span className="team-card__mono" aria-hidden="true">{monogram}</span>
        <div>
          <div className="card__title">{row.team.name}</div>
          <div className="card__meta">المركز #{row.rank}</div>
        </div>
      </div>

      <p className="card__body">{row.team.description}</p>

      <div className="team-card__stats">
        <div>
          <div className="team-card__stat-value">{row.memberCount}</div>
          <div className="team-card__stat-label">أعضاء</div>
        </div>
        <div>
          <div className="team-card__stat-value">{row.totalPoints}</div>
          <div className="team-card__stat-label">نقاط</div>
        </div>
        <div>
          <div className="team-card__stat-value">{row.avgPoints}</div>
          <div className="team-card__stat-label">متوسط</div>
        </div>
      </div>
    </Link>
  );
}
