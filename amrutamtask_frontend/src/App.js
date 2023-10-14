import { BrowserRouter } from "react-router-dom";
import Main from "./container/Main";
import Navbar from "./components/Navbar";
import Bottombar from "./components/Bottombar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col w-full">
        <div className="fixed top-0 w-full">
          <Navbar />
        </div>
        <div className="h-screen bg-gradient-to-t from-white to-[#F3DBCE]">
          <Main />
        </div>
        <div className="md:hidden fixed bottom-0 w-full">
          <Bottombar />
        </div>
      </div>
    </BrowserRouter>
  )
}