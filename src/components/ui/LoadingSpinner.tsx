import React from 'react';

export const LoadingSpinner = ({ fullScreen = false }: { fullScreen?: boolean }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-champagne border-t-transparent" />
      <p className="text-midnight font-serif italic animate-pulse">Preparing your journey...</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-pearl bg-opacity-90 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
};
