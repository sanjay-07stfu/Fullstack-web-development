const StatsOverview = ({ totalHabits, completionPercentage, points, level, bestStreak }) => {
  const cards = [
    { label: 'Total Habits', value: totalHabits },
    { label: 'Today Completion', value: `${completionPercentage}%` },
    { label: 'Points', value: points },
    { label: 'Level', value: level },
    { label: 'Best Streak', value: `${bestStreak} days` },
  ]

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{card.label}</p>
          <p className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-50">{card.value}</p>
        </div>
      ))}
    </section>
  )
}

export default StatsOverview
