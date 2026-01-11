"use client";

interface LoaderProps {
  variant?: "full" | "container" | "inline";
  message?: string;
  className?: string;
}

export default function Loader({ variant = "container", message, className = "" }: LoaderProps) {
  const variants = {
    full: "fixed inset-0 bg-white/80 backdrop-blur-md z-[100] flex items-center justify-center",
    container: "absolute inset-0 bg-white/40 backdrop-blur-[2px] z-10 flex items-center justify-center",
    inline: "inline-flex items-center gap-2",
  };

  const spinner = (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-200 border-b-blue-600"></div>
    </div>
  );

  if (variant === "inline") {
    return (
      <div className={variants.inline}>
        {spinner}
        {message && <span className="text-sm font-medium text-gray-600">{message}</span>}
      </div>
    );
  }

  return (
    <div className={variants[variant]}>
      <div className="flex flex-col items-center gap-3">
        {spinner}
        {message && (
          <span className="text-sm font-bold text-gray-700 animate-pulse tracking-wide">
            {message}
          </span>
        )}
      </div>
    </div>
  );
}