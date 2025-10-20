import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Button from './Button';

export default function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900">
      <div className="text-xl font-bold">MyApp</div>
      <div className="space-x-2">
        <Button variant="secondary" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? 'Light' : 'Dark'}
        </Button>
      </div>
    </nav>
  );
}
