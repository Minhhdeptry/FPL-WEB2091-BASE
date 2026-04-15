import { Toaster } from "react-hot-toast";
import { Link, Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="#" className="text-xl font-semibold">
            <strong>WEB2091 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="#" className="hover:text-gray-200">
              Trang chủ
            </Link>
            <Link to="/bookings" className="hover:text-gray-200">
              Danh sách
            </Link>
            <Link to="/bookings/add" className="hover:text-gray-200">
              Thêm mới
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/login" className="hover:text-gray-200">
              Đăng nhập
            </Link>
            <Link to="/register" className="hover:text-gray-200">
              Đăng ký
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <Routes>
        <Route path="bookings" element={<ListPage/>}/>
        <Route path="bookings/add" element={<AddPage/>}/>
        <Route path="bookings/edit/:id" element={<EditPage/>}></Route>

        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
