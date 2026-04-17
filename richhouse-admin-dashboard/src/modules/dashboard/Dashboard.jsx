import React from "react";
import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  ChevronDown,
  CircleAlert,
  Clock3,
  Download,
  Plus,
  WalletCards,
} from "lucide-react";

const stats = [
  {
    label: "Total Users",
    value: "2432",
    change: "+12% vs yesterday",
    positive: true,
  },
  {
    label: "Active Subscriptions",
    value: "234",
    change: "+5%",
    positive: true,
  },
  {
    label: "Today Bookings",
    value: "34",
    change: "-1%",
    positive: false,
  },
  {
    label: "Revenue Today",
    value: "$620",
    change: "-3%",
    positive: false,
  },
];

const trendPoints = [46, 58, 63, 74, 66, 67, 71, 82, 76];
const bookingBars = [
  { week: "week 1", bookings: 72, revenue: 92 },
  { week: "week 2", bookings: 48, revenue: 55 },
  { week: "week 3", bookings: 61, revenue: 44 },
  { week: "week 4", bookings: 54, revenue: 43 },
];

const classes = [
  {
    name: "Early Bird Flow",
    time: "8:00 am",
    trainer: "Nadia Asim",
    slots: "5/10",
    status: "Active",
  },
  {
    name: "Core & Cardio",
    time: "9:30 am",
    trainer: "Areeba Noor",
    slots: "7/10",
    status: "Active",
  },
  {
    name: "Power Stretch",
    time: "11:00 am",
    trainer: "Maha Khan",
    slots: "4/12",
    status: "Filling",
  },
];

const reformers = [
  { number: "01", status: "Available" },
  { number: "02", status: "Booked" },
  { number: "03", status: "Available" },
  { number: "04", status: "Available" },
  { number: "05", status: "Available" },
  { number: "06", status: "Booked" },
  { number: "07", status: "Available" },
  { number: "08", status: "Booked" },
  { number: "09", status: "Available" },
  { number: "10", status: "Available" },
];

const alerts = [
  "Server Maintenance Tonight 11PM-2AM. All services offline. Please notify clients and save work before 10:45 PM.",
  "3 failed login attempts from IP flagged. Repeated failures from 45.53.32.156. Account auto-locked. Review immediately.",
  "5 employees have missing check-outs. Ayesha, Zaid, and 3 others have not clocked out today.",
  "Monthly payout reconciliation pending. Finance sync has not completed for the last cycle.",
];

const activities = [
  {
    initials: "SC",
    tone: "bg-sky-100 text-sky-700",
    text: "The user opened the mobile application three times today, with the most recent session recorded at 8:42 AM.",
    time: "2 hours ago",
  },
  {
    initials: "SC",
    tone: "bg-amber-100 text-amber-700",
    text: "The user successfully booked a Pilates reformer class for Friday at 10:00 AM and selected Reformer #4 during the booking confirmation process.",
    time: "2 hours ago",
  },
  {
    initials: "SC",
    tone: "bg-rose-100 text-rose-700",
    text: "A monthly subscription payment was processed successfully using the saved card on file, and the user's membership has been renewed until next month.",
    time: "4 hours ago",
  },
];

function SectionCard({ title, action = "Monthly", children, className = "" }) {
  return (
    <section
      className={`min-w-0 rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.05)] sm:p-5 ${className}`}
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500"
        >
          {action}
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>
      {children}
    </section>
  );
}

function TrendChart() {
  const width = 100;
  const height = 100;
  const max = 100;
  const stepX = width / (trendPoints.length - 1);
  const points = trendPoints
    .map((value, index) => {
      const x = index * stepX;
      const y = height - (value / max) * height;
      return `${x},${y}`;
    })
    .join(" ");
  const area = `0,${height} ${points} ${width},${height}`;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  return (
    <div className="space-y-3">
      <div className="h-44 rounded-[22px] bg-slate-50/80 p-3 sm:h-52">
        <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          {[20, 40, 60, 80].map((line) => (
            <line
              key={line}
              x1="0"
              x2="100"
              y1={100 - line}
              y2={100 - line}
              stroke="#dbe7eb"
              strokeWidth="0.6"
              strokeDasharray="2 3"
            />
          ))}
          <polyline
            fill="rgba(86, 155, 171, 0.12)"
            stroke="none"
            points={area}
          />
          <polyline
            fill="none"
            stroke="#8fb6c1"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-400 sm:text-xs">
        {months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  );
}

function BarChart() {
  return (
    <div className="grid h-52 grid-cols-4 items-end gap-3 rounded-[22px] bg-slate-50/80 px-3 pb-4 pt-4 sm:h-64 sm:gap-6 sm:px-5 sm:pb-6 sm:pt-5">
      {bookingBars.map((item) => (
        <div key={item.week} className="flex h-full flex-col items-center justify-end gap-3">
          <div className="flex h-full items-end gap-1.5 sm:gap-2">
            <div className="relative flex items-end">
              <div
                className="w-2.5 rounded-full bg-[#f68080] shadow-[0_8px_20px_rgba(246,128,128,0.24)] sm:w-4"
                style={{ height: `${item.revenue}%` }}
              />
              {item.week === "week 1" ? (
                <div className="absolute -top-16 left-1/2 hidden w-28 -translate-x-1/2 rounded-2xl bg-slate-700 px-3 py-2 text-[10px] text-white shadow-xl sm:block">
                  <div className="font-semibold">Week 1</div>
                  <div>Revenue: $32</div>
                  <div>Bookings: 14</div>
                </div>
              ) : null}
            </div>
            <div
              className="w-2.5 rounded-full bg-[#649ee3] shadow-[0_8px_20px_rgba(100,158,227,0.24)] sm:w-4"
              style={{ height: `${item.bookings}%` }}
            />
          </div>
          <span className="text-[10px] capitalize text-slate-400 sm:text-[11px]">{item.week}</span>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ children, tone = "success" }) {
  const styles =
    tone === "warning"
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-600";

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${styles}`}>
      {children}
    </span>
  );
}

export default function DashboardList() {
  return (
    <div className="space-y-6 text-slate-700">
      <section className="flex flex-col gap-5 rounded-[30px] border border-slate-200 bg-white px-4 py-5 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:px-5 md:px-6 md:py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl">
              Welcome Back, Admin
            </p>
            <p className="mt-1 text-sm text-slate-400">Insights &amp; Overviews</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-500"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#77aeb8] px-4 py-2 text-sm font-medium text-[#397986]"
            >
              <Plus className="h-4 w-4" />
              Create Class
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#397986] px-4 py-2 text-sm font-medium text-white shadow-[0_12px_25px_rgba(57,121,134,0.24)]"
            >
              <Plus className="h-4 w-4" />
              Add Program
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="min-w-0 rounded-[24px] border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_25px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-slate-400">{item.label}</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-800">
                    {item.value}
                  </p>
                </div>
                <div className="rounded-xl bg-[#397986] p-2 text-white">
                  <WalletCards className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium">
                {item.positive ? (
                  <ArrowUp className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <ArrowDown className="h-3.5 w-3.5 text-rose-400" />
                )}
                <span className={item.positive ? "text-emerald-500" : "text-rose-400"}>
                  {item.change}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="grid gap-5 2xl:grid-cols-2">
        <SectionCard title="User Activity Trend">
          <TrendChart />
        </SectionCard>

        <SectionCard title="Revenue & Bookings">
          <BarChart />
        </SectionCard>
      </div>

      <div className="grid gap-5 2xl:grid-cols-[1.18fr_1fr]">
        <SectionCard title="Today's Classes">
          <div className="space-y-3 md:hidden">
            {classes.map((item) => (
              <article
                key={`${item.name}-${item.time}-mobile`}
                className="rounded-[20px] border border-slate-200 bg-slate-50/80 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-700">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.time}</p>
                  </div>
                  <StatusBadge tone={item.status === "Filling" ? "warning" : "success"}>
                    {item.status}
                  </StatusBadge>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">Trainer</p>
                    <p className="mt-1 text-slate-600">{item.trainer}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">Slots</p>
                    <p className="mt-1 text-slate-600">{item.slots}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-slate-400">
                  <th className="pb-3 font-medium">Class</th>
                  <th className="pb-3 font-medium">Time</th>
                  <th className="pb-3 font-medium">Trainer</th>
                  <th className="pb-3 font-medium">Slots</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((item) => (
                  <tr key={`${item.name}-${item.time}`} className="border-t border-slate-100 text-sm">
                    <td className="py-3 pr-4 font-medium text-slate-600">{item.name}</td>
                    <td className="py-3 pr-4 text-slate-500">{item.time}</td>
                    <td className="py-3 pr-4 text-slate-500">{item.trainer}</td>
                    <td className="py-3 pr-4 text-slate-500">{item.slots}</td>
                    <td className="py-3">
                      <StatusBadge tone={item.status === "Filling" ? "warning" : "success"}>
                        {item.status}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Reformer Status">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {reformers.map((item) => (
              <article
                key={item.number}
                className="rounded-[20px] border border-slate-200 bg-slate-50/80 px-4 py-3 text-center"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Reformer</p>
                <p className="mt-1 text-2xl font-semibold text-slate-700">{item.number}</p>
                <div className="mt-2">
                  <StatusBadge tone={item.status === "Booked" ? "warning" : "success"}>
                    {item.status}
                  </StatusBadge>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-5 2xl:grid-cols-2">
        <SectionCard title="System Alerts" action="Today">
          <div className="space-y-4">
            {alerts.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-[20px] border border-rose-100 bg-rose-50/50 px-4 py-3"
              >
                <div className="mt-0.5 rounded-full bg-white p-2 text-rose-400 shadow-sm">
                  <CircleAlert className="h-4 w-4" />
                </div>
                <p className="text-sm leading-6 break-words text-slate-500">{item}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Activity" action="Today">
          <div className="space-y-4">
            {activities.map((item) => (
              <div
                key={item.text}
                className="flex flex-col gap-3 rounded-[20px] border border-slate-200 bg-slate-50/80 px-4 py-4 sm:flex-row sm:items-start"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${item.tone}`}
                >
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm leading-6 break-words text-slate-600">{item.text}</p>
                  <div className="mt-2 inline-flex items-center gap-2 text-xs text-slate-400">
                    <Clock3 className="h-3.5 w-3.5" />
                    {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <section className="grid gap-4 rounded-[28px] border border-[#d6e5e9] bg-[linear-gradient(135deg,#eff7f7_0%,#ffffff_70%)] p-5 shadow-[0_16px_36px_rgba(57,121,134,0.08)] md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-lg font-semibold text-slate-800">Team Schedule Snapshot</p>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            Stay ahead of class load and staff planning. Today has 16 sessions
            scheduled, 3 instructors on rotation, and 2 maintenance windows to
            review before evening operations begin.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#397986] px-4 py-2.5 text-sm font-medium text-white"
        >
          <CalendarDays className="h-4 w-4" />
          Open Planner
        </button>
      </section>
    </div>
  );
}
