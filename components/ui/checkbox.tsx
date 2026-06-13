import * as React from "react"

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    type="checkbox"
    ref={ref}
    className={`h-4 w-4 rounded border border-gray-600 bg-gray-900/50 cursor-pointer checked:bg-indigo-600 checked:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 ${className || ""}`}
    {...props}
  />
))
Checkbox.displayName = "Checkbox"

export { Checkbox }
