import React from 'react';

const NotFound = () => {
  return (
    <div className="w-screen h-screen absolute flex flex-col items-center justify-center gap-y-6 bg-brand-800">
      <img className="w-2/5" src="./404.svg" />
      <h1 className="text-white text-4xl">404 | Not Found</h1>
      <h2 className="text-white text-2xl">
        The page you are trying to access doesn’t exist or has been moved.
      </h2>
    </div>
  );
};

export default NotFound;
