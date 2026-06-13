import * as React from "react"

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30',
    secondary: 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30',
    destructive: 'bg-red-600/20 text-red-400 border border-red-500/30',
    outline: 'border border-gray-600 text-gray-400',
  };

  return (
    <div
      ref={ref}
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${variants[variant]} ${className || ""}`}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }
