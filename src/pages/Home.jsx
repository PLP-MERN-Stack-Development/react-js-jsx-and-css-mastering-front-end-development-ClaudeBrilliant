import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Home() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        if (!res.ok) throw new Error('Fetch failed');
        const data = await res.json();
        setItems(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const filtered = items.filter(i => i.title.includes(q.toLowerCase()) || i.body.includes(q.toLowerCase()));
  const start = (page - 1) * limit;
  const pageItems = filtered.slice(start, start + limit);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card>
        <h2 className="text-xl font-semibold">Posts (from JSONPlaceholder)</h2>
        <div className="flex gap-2 my-3">
          <input value={q} onChange={e => setQ(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Search..." />
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <ul className="space-y-3">
          {!loading && pageItems.map(post => (
            <li key={post.id} className="p-3 border rounded">
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center mt-4">
          <div>Showing {start + 1} - {Math.min(start + limit, filtered.length)} of {filtered.length}</div>
          <div className="space-x-2">
            <Button onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</Button>
            <Button onClick={() => setPage(p => p + 1)}>Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
