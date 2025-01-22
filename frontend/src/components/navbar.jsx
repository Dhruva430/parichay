export function Navbar() {
  const isLogedin = true;
  return (
    <header className=" bg-white shadow-xl p-5 z-50 sticky top-0">
      <div className="max-w-[100rem] mx-auto w-full flex justify-between items-center">
        <p className=" font-si font-bold ">Parichay</p>
        <input
          className="focus:ring-gray-500  focus:ring-[2px] outline-none ring-black px-2 py-1 border-2 rounded-2xl w-80"
          placeholder="Search"
          type="text"
        />
        <ul className="flex gap-10 px-6 py-1">
          <li>
            <i className="fa-solid fa-house-chimney"></i>
          </li>
          <li>
            <i className="fa-regular fa-bell"></i>
          </li>
          <li>
            <i className="fa-solid fa-user"></i>
          </li>
        </ul>
      </div>
    </header>
  );
}
