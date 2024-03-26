import React from 'react';

interface LoadingCoverProps {
  loading: boolean;
}

const LoadingCover: React.FC<LoadingCoverProps> = ({ loading }) => (
  <div className={`fixed w-screen h-screen left-0 top-0 flex justify-center
                  items-center bg-white z-50 ${loading ? 'visible' : 'hidden'}`}>
    <div className="w-10 h-10 rounded-[50%] border-8 border-gray-300
                    border-b-8 border-b-accent-600 animate-spin-slow" />
  </div>
);

export default LoadingCover;
