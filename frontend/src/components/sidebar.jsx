import React from "react";

const SidebarItems = [
  ["Home", "fa-solid fa-house-user", "/"],
  ["Create", "fa-solid fa-circle-plus", "/create"],
  ["Notifications", "fa-regular fa-heart", "/notifications"],
  ["Explore", "fa-regular fa-compass", "/explore"],
  // ["Test Item", "fa-regular fa-compass", "/explore"],
];

function Sidebar() {
  return (
    <div className="h-[calc(100vh-75px)] w-[300px] border-r-2 sticky overflow-y-auto top-[75px] ">
      <ul className="flex flex-col">
        {SidebarItems.map(([label, icon, href]) => (
          <li key={href} className="">
            <a href={href} className="flex p-4 border gap-4 items-center">
              <i className={icon} />
              <p>{label}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
