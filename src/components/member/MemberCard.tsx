import { Link } from 'react-router-dom';
import type { Member } from '@/types';
import { getTeamById } from '@/lib/derive';

export function MemberCard({ member }: { member: Member }) {
  return (
    <Link to={'/members/' + member.id} className="card">
      <div className="member-card__name">{member.name}</div>
      <div className="member-card__role">{member.role}</div>
      <div className="member-card__teams">
        {member.teamIds.map((id) => {
          const team = getTeamById(id);
          if (!team) return null;
          return <span key={id} className="badge">{team.name}</span>;
        })}
      </div>
    </Link>
  );
}
