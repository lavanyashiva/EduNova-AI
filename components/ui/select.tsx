import * as React from "react"

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={`flex h-10 w-full rounded-lg border border-gray-700 bg-gray-900/50 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
    {...props}
  >
    {children}
  </select>
))
Select.displayName = "Select"

export { Select }
