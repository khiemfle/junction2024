import React from 'react';
import { clsx } from 'clsx';

export const Alert = ({ children, className, ...props }) => {
  return (
    <div
      role="alert"
      className={clsx(
        "relative w-full rounded-lg border p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const AlertDescription = ({ children, className, ...props }) => {
  return (
    <div
      className={clsx("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    >
      {children}
    </div>
  );
};
