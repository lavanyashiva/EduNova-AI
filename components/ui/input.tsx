import * as React from "react"

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-lg border border-gray-700 bg-gray-900/50 px-3 py-2 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
    ref={ref}
    {...props}
  />
))
Input.displayName = "Input"

export { Input }
