<<<<<<< HEAD
// src/components/Loading.jsx
import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        Loading...
=======

const Loading = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-3">
        <div className="h-3 w-28 rounded-full bg-white/[0.06]" />
        <div className="h-9 w-72 max-w-full rounded-xl bg-white/[0.06]" />
        <div className="h-4 w-[28rem] max-w-full rounded-lg bg-white/[0.04]" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="card h-[132px] animate-pulse p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="h-2.5 w-24 rounded-full bg-white/[0.06]" />
                <div className="h-7 w-20 rounded-lg bg-white/[0.08]" />
              </div>
              <div className="h-10 w-10 rounded-xl bg-white/[0.06]" />
            </div>
            <div className="mt-5 h-2.5 w-32 rounded-full bg-white/[0.04]" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="card h-[340px] animate-pulse p-6">
            <div className="h-4 w-40 rounded-lg bg-white/[0.07]" />
            <div className="mt-3 h-3 w-56 rounded-full bg-white/[0.04]" />
            <div className="mt-8 h-[220px] rounded-xl bg-gradient-to-b from-white/[0.05] to-transparent" />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 py-2 text-xs font-medium text-zinc-500">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/10 border-t-brand" />
        Loading analytics…
      </div>
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
    </div>
  );
};

<<<<<<< HEAD
export default Loading;
=======
export default Loading;
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
