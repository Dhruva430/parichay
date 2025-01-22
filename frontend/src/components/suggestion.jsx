import React from "react";
import user from "../assets/muffin.jpg";
function Suggestion() {
  return (
    <div className=" max-w-[300px] grow flex flex-col gap-1 sticky top-[75px] overflow-y-auto  border-l-2 h-[calc(100vh-75px)] pt-6 pl-4">
      <div className="border-2 rounded-lg flex items-center bg-black p-4 gap-2 ">
        <div className="w-10 h-10 rounded-full items-center overflow-hidden">
          <img src={user} />
        </div>
        <div className="flex justify-between grow">
          <div className="flex flex-col">
            <p className="font-bold text-white">Muffin</p>
            <p className="opacity-50 text-white text-xs">
              Followed by @mythical
            </p>
          </div>
          <a href="Not available" className="text-blue-700 self-center">
            Follow
          </a>
        </div>
      </div>
    </div>
  );
}

export default Suggestion;
