import * as React from "react"

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'secondary' | 'ghost' | 'outline' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
  }
>(({ className, variant = 'default', size = 'md', ...props }, ref) => {
  const variants = {
    default: 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white hover:from-indigo-700 hover:to-cyan-700 shadow-lg hover:shadow-indigo-500/50',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600',
    ghost: 'text-gray-300 hover:bg-gray-900/50 hover:text-white',
    outline: 'border border-gray-600 text-gray-300 hover:bg-gray-900/50',
    destructive: 'bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className || ""}`}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
