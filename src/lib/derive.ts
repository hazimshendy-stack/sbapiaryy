/* طبقة الحسابات الآلية — كل الأرقام تُحسب من البيانات */

import type { Member, Team, TeamId } from '@/types';
import { members } from '@/data/members';
import { teams } from '@/data/teams';

export function getTeamById(id: TeamId): Team | undefined {
  return teams.find((t) => t.id === id);
}

export function getMemberById(id: string): Member | undefined {
  return members.find((m) => m.id === id);
}

export function getMembersByTeam(teamId: TeamId): Member[] {
  return members.filter((m) => m.teamIds.includes(teamId));
}

export function getTeamPoints(teamId: TeamId): number {
  return getMembersByTeam(teamId).reduce((sum, m) => sum + m.points, 0);
}

/* ---------- الليج العام ---------- */

export interface LeaderboardEntry {
  member: Member;
  rank: number;
  points: number;
  teams: Team[];
}

export function getLeaderboard(): LeaderboardEntry[] {
  const sorted = [...members].sort((a, b) => b.points - a.points);
  return sorted.map((member, index) => ({
    member,
    rank: index + 1,
    points: member.points,
    teams: member.teamIds
      .map((id) => getTeamById(id))
      .filter((t): t is Team => Boolean(t)),
  }));
}

/* ---------- ليج الفريق ---------- */

export function getTeamLeaderboard(teamId: TeamId): LeaderboardEntry[] {
  const teamMembers = getMembersByTeam(teamId);
  const sorted = [...teamMembers].sort((a, b) => b.points - a.points);
  return sorted.map((member, index) => ({
    member,
    rank: index + 1,
    points: member.points,
    teams: member.teamIds
      .map((id) => getTeamById(id))
      .filter((t): t is Team => Boolean(t)),
  }));
}

/* ---------- ترتيب الفرق ---------- */

export interface TeamRank {
  team: Team;
  memberCount: number;
  totalPoints: number;
  avgPoints: number;
  rank: number;
}

export function getTeamRanking(): TeamRank[] {
  const rows = teams.map((team) => {
    const teamMembers = getMembersByTeam(team.id);
    const totalPoints = teamMembers.reduce((sum, m) => sum + m.points, 0);
    const avgPoints =
      teamMembers.length === 0 ? 0 : Math.round(totalPoints / teamMembers.length);
    return { team, memberCount: teamMembers.length, totalPoints, avgPoints, rank: 0 };
  });

  rows.sort((a, b) => b.totalPoints - a.totalPoints);
  rows.forEach((r, i) => { r.rank = i + 1; });
  return rows;
}

/* ---------- إحصائيات عامة ---------- */

export interface OrgStats {
  members: number;
  teams: number;
  totalPoints: number;
  avgPoints: number;
}

export function getOrgStats(): OrgStats {
  const totalPoints = members.reduce((sum, m) => sum + m.points, 0);
  const avgPoints = members.length === 0 ? 0 : Math.round(totalPoints / members.length);
  return {
    members: members.length,
    teams: teams.length,
    totalPoints,
    avgPoints,
  };
}

/* ---------- عضو ---------- */

export function getMemberRank(memberId: string): number {
  const board = getLeaderboard();
  const entry = board.find((e) => e.member.id === memberId);
  return entry ? entry.rank : 0;
}

export function getMemberTeamRank(memberId: string, teamId: TeamId): number {
  const board = getTeamLeaderboard(teamId);
  const entry = board.find((e) => e.member.id === memberId);
  return entry ? entry.rank : 0;
}
