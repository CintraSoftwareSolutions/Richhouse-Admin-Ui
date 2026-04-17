import React from "react";

/**
 * Generic admin page wrapper.
 * Usage:
 *   <Module title="Users" subtitle="This is the Users module." actions={<button>New</button>}>
 *     ...your content...
 *   </Module>
 */
export default function Module({
  title = "Module",
  subtitle = "This is the module page.",
  actions = null,
  children = null,
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
          {subtitle && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{subtitle}</p>
          )}
        </div>
        {actions}
      </div>

      {/* Body */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-6">
        {children ? (
          children
        ) : (
          <p className="text-neutral-600 dark:text-neutral-300">
            Just a stub page for <span className="font-medium">{title}</span>.
          </p>
        )}
      </div>
    </div>
  );
}
