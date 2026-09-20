import { Link, useParams } from 'react-router-dom';
import type { TeamId } from '@/types';
import {
  getMembersByTeam,
  getTeamById,
  getTeamLeaderboard,
  getTeamPoints,
} from '@/lib/derive';
import { MemberCard } from '@/components/member/MemberCard';
import { Stat, StatRow } from '@/components/ui/Stat';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Avatar } from '@/components/ui/Avatar';
import { NotFoundPage } from './NotFoundPage';

export function TeamDetailPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const team = teamId ? getTeamById(teamId as TeamId) : undefined;
  if (!team) return <NotFoundPage />;

  const teamMembers = getMembersByTeam(team.id);
  const teamPoints = getTeamPoints(team.id);
  const board = getTeamLeaderboard(team.id);
  const avg = teamMembers.length === 0 ? 0 : Math.round(teamPoints / teamMembers.length);

  return (
    <div className="container section--tight">
      <div className="profile">
        <div className="profile__main">
          <h1 className="profile__name">{team.name}</h1>
        </div>
      </div>

      <section className="section">
        <StatRow>
          <Stat value={teamMembers.length} label="الأعضاء" />
          <Stat value={teamPoints} label="مجموع النقاط" />
          <Stat value={avg} label="متوسط النقاط" />
        </StatRow>
      </section>

      <section className="section">
        <SectionHeader eyebrow="الأعضاء" title="أعضاء الفريق" />
        {teamMembers.length === 0 ? (
          <EmptyState message="لا يوجد أعضاء في هذا الفريق بعد." />
        ) : (
          <div className="grid grid--wide">
            {teamMembers.map((m) => <MemberCard key={m.id} member={m} />)}
          </div>
        )}
      </section>

      <section className="section">
        <SectionHeader eyebrow="ترتيب الفريق" title={'ليج ' + team.name} />
        {board.length === 0 ? (
          <EmptyState message="لا توجد نقاط مسجلة." />
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>#</th>
                  <th>العضو</th>
                  <th>الدور</th>
                  <th>النقاط</th>
                </tr>
              </thead>
              <tbody>
                {board.map((e) => (
                  <tr key={e.member.id}>
                    <td className={'rank rank--' + (e.rank <= 3 ? e.rank : '')}>{e.rank}</td>
                    <td>
                      <Link to={'/members/' + e.member.id} className="row">
                        <Avatar name={e.member.name} size={30} />
                        <span>{e.member.name}</span>
                      </Link>
                    </td>
                    <td className="muted small">{e.member.role}</td>
                    <td className="points">{e.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
