import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { ThemeProvider } from './context/ThemeContext';
import Tasks from './components/TaskManager';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <main className="bg-gray-50 dark:bg-gray-800 min-h-screen p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
