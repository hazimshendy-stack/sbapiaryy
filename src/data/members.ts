import type { Member } from '@/types';

export const members: Member[] = [
  { id: 'm-01', name: 'ياسين عبد الرحمن',  role: 'قائد الموسم السابع',   teamIds: ['helpers', 'rstc'], joinedSeason: 5, points: 320, bio: 'يقود منظومة الموسم السابع في جميع الفروع.', email: 'yassin@resala-stem.org' },
  { id: 'm-02', name: 'ملك هشام',           role: 'قائدة Coders',         teamIds: ['coders'],          joinedSeason: 5, points: 295, bio: 'مهندسة برمجيات متكاملة. تبني الأدوات الداخلية والمنصة العامة.' },
  { id: 'm-03', name: 'عمر خالد',           role: 'قائد Heroes',          teamIds: ['heroes'],          joinedSeason: 6, points: 270, bio: 'ينظم الحملات الميدانية والتوعية المجتمعية.' },
  { id: 'm-04', name: 'نور السيد',          role: 'قائدة Enviros',        teamIds: ['enviros'],         joinedSeason: 6, points: 260, bio: 'خريجة علوم بيئية. تدير برامج إعادة التدوير وزراعة الأشجار.' },
  { id: 'm-05', name: 'هنا مصطفى',          role: 'قائدة Messages',       teamIds: ['messages'],        joinedSeason: 6, points: 245, bio: 'استراتيجية محتوى. توثق الموسم وتشكل صوت المنظمة.' },
  { id: 'm-06', name: 'علي جمال',           role: 'قائد Masar',           teamIds: ['masar'],           joinedSeason: 7, points: 230, bio: 'مسارات إرشاد وتوجيه مهني لطلاب الثانوية.' },
  { id: 'm-07', name: 'سلمى عادل',          role: 'منسقة RSTC',           teamIds: ['rstc'],            joinedSeason: 5, points: 240, bio: 'تصمم المناهج التدريبية وتعتمد المدربين.' },
  { id: 'm-08', name: 'زياد طارق',          role: 'مساعد أول',             teamIds: ['helpers'],         joinedSeason: 7, points: 210, bio: 'التأهيل واللوجستيات وكل ما لا يريد أحد فعله.' },
  { id: 'm-09', name: 'فريدة نبيل',         role: 'مطورة واجهات',          teamIds: ['coders'],          joinedSeason: 7, points: 205, bio: 'تبني الواجهات ومكتبة المكونات.' },
  { id: 'm-10', name: 'يوسف أشرف',          role: 'بطل ميداني',            teamIds: ['heroes', 'enviros'], joinedSeason: 7, points: 195, bio: 'يقود حملات التطوع في المنصورة.' },
  { id: 'm-11', name: 'جنى محمود',          role: 'مسؤولة الاستدامة',      teamIds: ['enviros'],         joinedSeason: 7, points: 185, bio: 'تقيس وتُبلغ عن الأثر البيئي لكل برنامج.' },
  { id: 'm-12', name: 'كريم سمير',          role: 'مرشد Masar',           teamIds: ['masar', 'rstc'],   joinedSeason: 7, points: 175, bio: 'يرشد الطلاب في المسارات الدراسية والمهارات التقنية.' },
  { id: 'm-13', name: 'ليلى إبراهيم',       role: 'إعلام وتوثيق',          teamIds: ['messages'],        joinedSeason: 7, points: 165, bio: 'صورة وفيديو وأرشيف. لا شيء حدث إن لم يُوثَّق.' },
  { id: 'm-14', name: 'أحمد فؤاد',          role: 'مساعد عمليات',          teamIds: ['helpers', 'rstc'], joinedSeason: 7, points: 155, bio: 'ينسق بين الفروع ويحافظ على الجدول الزمني.' },
];
