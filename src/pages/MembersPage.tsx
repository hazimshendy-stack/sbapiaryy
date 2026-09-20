import { useMemo, useState } from 'react';
import { members } from '@/data/members';
import { teams } from '@/data/teams';
import type { TeamId } from '@/types';
import { MemberCard } from '@/components/member/MemberCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { cx } from '@/lib/format';

export function MembersPage() {
  const [query, setQuery] = useState('');
  const [teamFilter, setTeamFilter] = useState<TeamId | 'all'>('all');

  const filtered = useMemo(() => {
    const q = query.trim();
    return members.filter((m) => {
      const matchesTeam = teamFilter === 'all' || m.teamIds.includes(teamFilter);
      const matchesQuery = q.length === 0 || m.name.includes(q) || m.role.includes(q);
      return matchesTeam && matchesQuery;
    });
  }, [query, teamFilter]);

  return (
    <div className="container">
      <PageHeader
        eyebrow="الأعضاء"
        title="جميع الأعضاء"
        description="كل عضو في فروع Resala STEM، الموسم السابع."
      />

      <div className="toolbar">
        <input
          className="input"
          type="search"
          placeholder="ابحث بالاسم أو الدور…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="chips">
          <button
            type="button"
            className={cx('chip', teamFilter === 'all' && 'is-active')}
            onClick={() => setTeamFilter('all')}
          >الكل</button>
          {teams.map((t) => (
            <button
              key={t.id}
              type="button"
              className={cx('chip', teamFilter === t.id && 'is-active')}
              onClick={() => setTeamFilter(t.id)}
            >{t.name}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="لا يوجد أعضاء مطابقون للبحث." />
      ) : (
        <div className="grid grid--wide">
          {filtered.map((m) => <MemberCard key={m.id} member={m} />)}
        </div>
      )}
    </div>
  );
}
