import { useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar.jsx";
import { Navbar } from "./components/navbar.jsx";
import Suggestion from "./components/suggestion.jsx";
import Post from "./components/post.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <div className=" grow flex justify-center max-w-[100rem] mx-auto gap-20 ">
        <Sidebar />
        <div className="">
          <Post />
          <Post />
          <Post />
        </div>
        <Suggestion />
      </div>
    </>
  );
}

export default App;
