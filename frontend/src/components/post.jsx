import React from "react";
import user from "../assets/muffin.jpg";
function post() {
  return (
    <div className=" p-2 max-w-3xl border-2 mt-6 mb-6 ">
      <div className="flex gap-2  ">
        <div className="w-14 h-14 shrink-0 rounded-full overflow-hidden">
          <img src={user} alt="not available" />
        </div>
        <div className="m-1">
          <p className="font-bold text-red-500">Muffin</p>
          <p className="opacity-45 text-xs">@muffin Today 08:45</p>
        </div>
      </div>
      <p className="mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
        laboriosam provident sapiente deserunt, hic unde. Consequuntur maxime
        magni dolorem totam? Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Praesentium nam facilis impedit voluptatem officia quae sapiente,
        distinctio perferendis delectus rem voluptate quas nulla ipsum harum
        adipisci placeat maxime, deserunt repellat id. Ratione delectus
        voluptates alias eveniet repellendus molestias! Dicta, odio.
      </p>
      <hr className="m-2" />
      <div className="flex gap-3">
        <button className="p-2 border-2 rounded-xl">
          <i className="fa-solid fa-heart"></i> 600
        </button>
        <button className="p-2 border-2 rounded-xl">
          <i className="fa-regular fa-comment"></i> 3
        </button>
        <button className="p-2 border-2 rounded-xl pl-4 pr-4 ml-auto">
          <i className="fa-regular fa-bookmark"></i>
        </button>
        <button className="p-2 border-2 rounded-xl pl-4 pr-4">
          <i className="fa-solid fa-share-nodes"></i>
        </button>
      </div>
    </div>
  );
}

export default post;
