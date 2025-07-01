// src/App.jsx
import Sidebar from './components/Sidebar';


function App() {
  return (
    <div className="flex">
      <Sidebar />
      {/* Konten utama di samping sidebar */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Selamat Datang</h1>
      </div>
    </div>
  );
}
export default App;
