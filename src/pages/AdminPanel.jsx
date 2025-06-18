// src/pages/AdminPanel.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminUserCard from '../components/AdminUserCard';
import AdminEventCard from '../components/AdminEventCard';

const AdminPanel = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    organizer: '',
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockUsers = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        batch: '2015',
        department: 'Computer Science',
        role: 'admin',
        createdAt: '2022-01-15',
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        batch: '2016',
        department: 'Electrical Engineering',
        role: 'user',
        createdAt: '2022-02-20',
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        batch: '2017',
        department: 'Mechanical Engineering',
        role: 'user',
        createdAt: '2022-03-10',
      },
    ];

    const mockEvents = [
      {
        id: '1',
        title: 'Annual Alumni Meet',
        date: '2023-12-15',
        location: 'University Campus',
        description: 'Join us for the annual alumni meet and reconnect with your batchmates.',
        organizer: 'Alumni Association',
        createdAt: '2023-09-01',
      },
      {
        id: '2',
        title: 'Career Workshop',
        date: '2023-11-20',
        location: 'Online',
        description: 'Learn about current industry trends and career opportunities.',
        organizer: 'Career Services',
        createdAt: '2023-08-15',
      },
    ];

    setUsers(mockUsers);
    setEvents(mockEvents);
    setLoading(false);
  }, []);

  const handleRoleChange = (userId, newRole) => {
    // Mock role change - replace with actual API call
    setUsers(prevUsers =>
      prevUsers.map(u => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  const handleDeleteUser = (userId) => {
    // Mock delete - replace with actual API call
    setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
  };

  const handleDeleteEvent = (eventId) => {
    // Mock delete - replace with actual API call
    setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
  };

  const handleEventInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    // Mock create event - replace with actual API call
    const createdEvent = {
      ...newEvent,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setEvents(prev => [...prev, createdEvent]);
    setNewEvent({
      title: '',
      date: '',
      location: '',
      description: '',
      organizer: '',
    });
    setShowEventForm(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <p className="mb-6 text-gray-600">Welcome, {user?.name}. You have administrator privileges.</p>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 font-medium ${activeTab === 'users' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Manage Users
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 font-medium ${activeTab === 'events' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Manage Events
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'users' ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">All Users ({users.length})</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <AdminUserCard
                        key={user.id}
                        user={user}
                        onRoleChange={handleRoleChange}
                        onDelete={handleDeleteUser}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">All Events ({events.length})</h2>
                <button
                  onClick={() => setShowEventForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Create Event
                </button>
              </div>

              {showEventForm && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-medium mb-4">Create New Event</h3>
                  <form onSubmit={handleEventSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="title" className="block text-gray-700 mb-2">
                          Event Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={newEvent.title}
                          onChange={handleEventInputChange}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="date" className="block text-gray-700 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={newEvent.date}
                          onChange={handleEventInputChange}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="location" className="block text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={newEvent.location}
                          onChange={handleEventInputChange}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="organizer" className="block text-gray-700 mb-2">
                          Organizer
                        </label>
                        <input
                          type="text"
                          id="organizer"
                          name="organizer"
                          value={newEvent.organizer}
                          onChange={handleEventInputChange}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="description" className="block text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={newEvent.description}
                        onChange={handleEventInputChange}
                        rows="4"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      ></textarea>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setShowEventForm(false)}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Create Event
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-6">
                {events.length > 0 ? (
                  events.map((event) => (
                    <AdminEventCard
                      key={event.id}
                      event={event}
                      onDelete={handleDeleteEvent}
                    />
                  ))
                ) : (
                  <p className="text-gray-500">No events found</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;