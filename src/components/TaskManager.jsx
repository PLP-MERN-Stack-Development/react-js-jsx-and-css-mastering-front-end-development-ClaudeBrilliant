import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Tasks() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all'); // all | active | completed

  const add = () => {
    if (!text.trim()) return;
    setTasks([{ id: Date.now().toString(), text: text.trim(), done: false }, ...tasks]);
    setText('');
  };

  const toggle = id => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const remove = id => setTasks(tasks.filter(t => t.id !== id));

  const filtered = tasks.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.done : t.done
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <h2 className="text-xl font-semibold mb-2">Task Manager</h2>
        <div className="flex gap-2 mb-3">
          <input value={text} onChange={e => setText(e.target.value)} className="flex-1 p-2 border rounded" placeholder="New task..." />
          <Button onClick={add}>Add</Button>
        </div>

        <div className="flex gap-2 mb-3">
          <Button variant={filter === 'all' ? 'primary' : 'secondary'} onClick={() => setFilter('all')}>All</Button>
          <Button variant={filter === 'active' ? 'primary' : 'secondary'} onClick={() => setFilter('active')}>Active</Button>
          <Button variant={filter === 'completed' ? 'primary' : 'secondary'} onClick={() => setFilter('completed')}>Completed</Button>
        </div>

        <ul className="space-y-2">
          {filtered.map(task => (
            <li key={task.id} className="flex items-center justify-between">
              <div>
                <input type="checkbox" checked={task.done} onChange={() => toggle(task.id)} className="mr-2" />
                <span className={task.done ? 'line-through text-gray-400' : ''}>{task.text}</span>
              </div>
              <div>
                <Button variant="danger" onClick={() => remove(task.id)}>Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
