import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch all users
    fetch('/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setUsers(data));

    // Fetch all events
    fetch('/api/events', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setEvents(data));
  }, [token]);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">👤 Users ({users.length})</h3>
        <div className="border rounded p-4 space-y-2 max-h-96 overflow-y-auto">
          {users.map(user => (
            <div key={user.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <strong>{user.name}</strong> ({user.email})<br />
                🎓 {user.degree}, {user.graduationYear}
              </div>
              <span className="text-sm px-2 py-1 bg-gray-200 rounded">{user.role}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">📅 Events ({events.length})</h3>
        <div className="border rounded p-4 space-y-2 max-h-96 overflow-y-auto">
          {events.map(event => (
            <div key={event.id} className="border-b pb-2">
              <strong>{event.title}</strong> – {new Date(event.date).toLocaleDateString()}<br />
              📍 {event.location}<br />
              <span className="text-sm text-gray-600">{event.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;