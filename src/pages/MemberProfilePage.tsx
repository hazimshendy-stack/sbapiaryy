import { Link, useParams } from 'react-router-dom';
import {
  getMemberById,
  getMemberRank,
  getMemberTeamRank,
  getTeamById,
} from '@/lib/derive';
import { Stat, StatRow } from '@/components/ui/Stat';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { NotFoundPage } from './NotFoundPage';

export function MemberProfilePage() {
  const { memberId } = useParams<{ memberId: string }>();
  const member = memberId ? getMemberById(memberId) : undefined;
  if (!member) return <NotFoundPage />;

  const rank = getMemberRank(member.id);

  return (
    <div className="container section--tight">
      <div className="profile">
        <div className="profile__main">
          <h1 className="profile__name">{member.name}</h1>
          <div className="profile__role">{member.role}</div>
          {member.bio ? <p className="profile__bio">{member.bio}</p> : null}
          <div className="row mt-5">
            {member.teamIds.map((id) => {
              const team = getTeamById(id);
              if (!team) return null;
              return (
                <Link key={id} to={'/teams/' + team.id}>
                  <span className="badge">{team.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="profile__side">
          <div className="kv">
            <span className="kv__k">الترتيب العام</span>
            <span className="kv__v">#{rank}</span>
          </div>
          <div className="kv">
            <span className="kv__k">النقاط</span>
            <span className="kv__v">{member.points}</span>
          </div>
          <div className="kv">
            <span className="kv__k">الانضمام</span>
            <span className="kv__v">الموسم {member.joinedSeason}</span>
          </div>
          {member.email ? (
            <div className="kv">
              <span className="kv__k">التواصل</span>
              <a className="kv__v" href={'mailto:' + member.email}>{member.email}</a>
            </div>
          ) : null}
        </div>
      </div>

      <section className="section">
        <StatRow>
          <Stat value={member.points} label="النقاط" />
          <Stat value={rank} label="الترتيب العام" />
          <Stat value={member.teamIds.length} label="عدد الفرق" />
        </StatRow>
      </section>

      {member.teamIds.map((teamId) => {
        const team = getTeamById(teamId);
        if (!team) return null;
        const teamRank = getMemberTeamRank(member.id, teamId);
        return (
          <section key={teamId} className="section">
            <SectionHeader
              eyebrow={'ترتيب داخل ' + team.name}
              title={'المركز #' + teamRank}
              action={<Link to={'/teams/' + team.id} className="btn btn--ghost">صفحة الفريق</Link>}
            />
          </section>
        );
      })}
    </div>
  );
}
