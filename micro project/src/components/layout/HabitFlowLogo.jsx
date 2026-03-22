const HabitFlowLogo = ({ compact = false }) => {
  return (
    <div className={`flex items-center ${compact ? 'gap-2' : 'gap-3'}`}>
      <svg
        width={compact ? '34' : '44'}
        height={compact ? '34' : '44'}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="HabitFlow logo"
      >
        <rect x="4" y="4" width="40" height="40" rx="12" className="fill-indigo-600 dark:fill-indigo-500" />
        <path d="M16 24.5L22 30L33 18" className="stroke-sky-100" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="12.5" y="13" width="23" height="22" rx="5.5" className="stroke-sky-200" strokeWidth="1.2" />
      </svg>

      {!compact ? (
        <div>
          <p className="text-lg font-bold leading-none text-slate-900 dark:text-slate-100">HabitFlow</p>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Track. Improve. Repeat.</p>
        </div>
      ) : (
        <p className="text-base font-semibold leading-none text-slate-900 dark:text-slate-100">HabitFlow</p>
      )}
    </div>
  )
}

export default HabitFlowLogo
