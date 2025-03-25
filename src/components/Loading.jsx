// src/components/Loading.jsx
import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        Loading...
    </div>
  );
};

export default Loading;