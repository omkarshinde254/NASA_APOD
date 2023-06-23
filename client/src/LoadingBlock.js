import React from "react";

export const SpinningLoadingBlock = () => {
  return (
    <div className="flex items-center justify-center w-64 h-64 bg-gray-200 animate-spin">
      <svg className="w-16 h-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v7m0 0v7m0-7h7m-7 0H5" />
      </svg>
    </div>
  );
};

// export SpinningLoadingBlock;
