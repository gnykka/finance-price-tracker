import React from 'react';

interface LoadingCoverProps {
  loading: boolean;
}

const LoadingCover: React.FC<LoadingCoverProps> = ({ loading }) => (
  <div
    data-testid="loading-cover"
    className={`fixed w-screen h-screen left-0 top-0 flex justify-center
                items-center bg-white z-50 transition-opacity ease-in-out
                ${loading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
  >
    <div className="w-10 h-10 rounded-[50%] border-8 border-gray-300
                    border-b-8 border-b-accent-600 animate-spin-slow" />
  </div>
);

export default LoadingCover;
