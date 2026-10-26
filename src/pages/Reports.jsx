import { useMemo, useState } from 'react';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileText,
  Layers,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import ChartCard from '../components/ChartCard';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';

const mockRecentReports = [
  {
    reportName: 'Q4 Performance Analysis',
    category: 'Performance',
    date: '2023-12-31',
    status: 'Complete',
    action: 'Download',
  },
  {
    reportName: 'User Engagement Report',
    category: 'User Insights',
    date: '2023-12-28',
    status: 'Pending',
    action: 'View',
  },
  {
    reportName: 'Content Trend Analysis',
    category: 'Trend Analysis',
    date: '2023-12-25',
    status: 'Complete',
    action: 'Download',
  },
];

const reportCategories = [
  {
    title: 'Performance',
    description: 'Monthly performance, engagement metrics, and catalog statistics.',
    icon: BarChart3,
    tone: 'border-brand-500/25 bg-brand-500/15 text-brand-300',
    items: ['Monthly performance analysis', 'Viewer engagement metrics', 'Content performance stats'],
  },
  {
    title: 'Trend Analysis',
    description: 'Viewing patterns, popularity shifts, and seasonal behaviour.',
    icon: TrendingUp,
    tone: 'border-violet-500/25 bg-violet-500/15 text-violet-300',
    items: ['Viewing pattern analysis', 'Content popularity trends', 'Seasonal performance'],
  },
  {
    title: 'User Insights',
    description: 'Demographics, behaviour, and preference patterns across audiences.',
    icon: Users,
    tone: 'border-emerald-500/25 bg-emerald-500/15 text-emerald-300',
    items: ['Demographic reports', 'User behaviour analysis', 'Preference patterns'],
  },
];

const reportTypeOptions = ['Performance Analysis', 'User Engagement', 'Content Trends'];
const timePeriodOptions = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Last Year'];

const Reports = () => {
  const [reportType, setReportType] = useState('Performance Analysis');
  const [timePeriod, setTimePeriod] = useState('Last 30 Days');
  const [generated, setGenerated] = useState('');
  const [isLoading] = useState(false);

  const stats = useMemo(() => {
    const complete = mockRecentReports.filter((report) => report.status === 'Complete').length;
    const pending = mockRecentReports.filter((report) => report.status === 'Pending').length;

    return {
      total: mockRecentReports.length,
      complete,
      pending,
      categories: reportCategories.length,
    };
  }, []);

  const handleGenerateReport = () => {
    setGenerated(`“${reportType}” for ${timePeriod.toLowerCase()} is queued for generation.`);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Workspace"
        title="Analytics reports"
        description="Generate, review, and export the reports that keep stakeholders aligned on streaming performance."
      >
        <span className="chip">
          <Sparkles size={12} className="text-brand-soft" />
          Templates ready
        </span>
        <span className="chip">
          <Clock size={12} className="text-zinc-500" />
          Last export: today
        </span>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          index={0}
          label="Available reports"
          value={stats.total}
          sublabel="Ready in workspace"
          icon={FileText}
          tone="red"
        />
        <StatCard
          index={1}
          label="Completed"
          value={stats.complete}
          sublabel="Ready to download"
          icon={CheckCircle2}
          tone="emerald"
        />
        <StatCard
          index={2}
          label="Pending"
          value={stats.pending}
          sublabel="Awaiting review"
          icon={Clock}
          tone="amber"
        />
        <StatCard
          index={3}
          label="Categories"
          value={stats.categories}
          sublabel="Report families"
          icon={Layers}
          tone="violet"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {reportCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div
              key={category.title}
              className="card card-hover animate-fade-up p-5 sm:p-6"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-base font-semibold text-white">
                    {category.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                    {category.description}
                  </p>
                </div>
                <span className={`icon-tile shrink-0 ${category.tone}`}>
                  <Icon size={17} />
                </span>
              </div>
              <ul className="mt-5 space-y-2.5">
                {category.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-zinc-300">
                    <span className="h-1 w-1 rounded-full bg-zinc-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="card animate-fade-up p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-base font-semibold text-white">Recent reports</h3>
            <p className="mt-1 text-xs text-zinc-500">Latest generated analytics exports</p>
          </div>
          <span className="chip">
            <FileText size={12} className="text-zinc-500" />
            {stats.total} total
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Report name</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockRecentReports.map((report) => (
                <tr key={report.reportName}>
                  <td>
                    <span className="flex items-center gap-2.5">
                      <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400">
                        <FileText size={14} />
                      </span>
                      <span className="font-medium text-white">{report.reportName}</span>
                    </span>
                  </td>
                  <td>
                    <span className="text-xs text-zinc-400">{report.category}</span>
                  </td>
                  <td>
                    <span className="text-xs text-zinc-500">{report.date}</span>
                  </td>
                  <td>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                        report.status === 'Complete'
                          ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                          : 'border-amber-500/20 bg-amber-500/10 text-amber-300'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          report.status === 'Complete' ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                      />
                      {report.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-semibold text-zinc-200 transition hover:border-brand-500/40 hover:bg-brand-500/10 hover:text-white"
                    >
                      {report.action === 'Download' ? <Download size={12} /> : <Eye size={12} />}
                      {report.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ChartCard
        index={1}
        title="Generate a new report"
        subtitle="Choose a report family and time window to build a fresh export"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Report type
            </span>
            <select
              value={reportType}
              onChange={(event) => setReportType(event.target.value)}
              className="field w-full cursor-pointer"
            >
              {reportTypeOptions.map((option) => (
                <option key={option} value={option} className="bg-ink-800">
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Time period
            </span>
            <select
              value={timePeriod}
              onChange={(event) => setTimePeriod(event.target.value)}
              className="field w-full cursor-pointer"
            >
              {timePeriodOptions.map((option) => (
                <option key={option} value={option} className="bg-ink-800">
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-500">
            Reports include charts, commentary, and CSV-ready data tables.
          </p>
          <button
            type="button"
            onClick={handleGenerateReport}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow-soft transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
          >
            <Sparkles size={15} />
            Generate report
          </button>
        </div>

        {generated && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-3.5 py-2.5 text-xs text-emerald-300 animate-fade-in">
            <CheckCircle2 size={14} />
            {generated}
          </div>
        )}
      </ChartCard>
    </div>
  );
};

export default Reports;
