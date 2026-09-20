import { getOrgStats, getTeamRanking } from '@/lib/derive';
import { TeamCard } from '@/components/team/TeamCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Stat, StatRow } from '@/components/ui/Stat';

export function TeamsPage() {
  const ranking = getTeamRanking();
  const stats = getOrgStats();

  return (
    <div className="container">
      <PageHeader
        eyebrow="الهيكل"
        title="الفرق"
        description="سبع مجموعات متخصصة. كل فريق له مجال واحد ونتيجة واحدة قابلة للقياس."
      />

      <section className="section--tight">
        <StatRow>
          <Stat value={stats.teams} label="الفرق" />
          <Stat value={stats.members} label="الأعضاء" />
          <Stat value={stats.totalPoints} label="مجموع النقاط" />
        </StatRow>
      </section>

      <section className="section">
        <div className="grid grid--wide">
          {ranking.map((row) => <TeamCard key={row.team.id} row={row} />)}
        </div>
      </section>
    </div>
  );
}
