// components/Loader.tsx
import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-full fixed gap-x-2 flex justify-center items-center z-50 bg-[#F9F6EE] opacity-95 dark:bg-[#23272F]">
      <div className="w-5 bg-[#23272f17] animate-pulse h-5 rounded-full animate-bounce"></div>
      <div className="w-5 animate-pulse h-5 bg-[#23272fa2] rounded-full animate-bounce"></div>
      <div className="w-5 h-5 animate-pulse bg-[#23272F] rounded-full animate-bounce"></div>
    </div>
  );
};

export default Loader;

/* From Uiverse.io by mahendrameghwal */
