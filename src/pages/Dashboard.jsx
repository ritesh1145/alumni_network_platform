// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockEvents = [
      {
        id: '1',
        title: 'Annual Alumni Meet',
        date: '2023-12-15',
        location: 'University Campus',
        description: 'Join us for the annual alumni meet and reconnect with your batchmates.',
        rsvp: true,
      },
      {
        id: '2',
        title: 'Career Workshop',
        date: '2023-11-20',
        location: 'Online',
        description: 'Learn about current industry trends and career opportunities.',
        rsvp: false,
      },
    ];
    setUpcomingEvents(mockEvents);
    setLoading(false);
  }, []);

  const handleRSVP = (eventId) => {
    // Mock RSVP functionality
    setUpcomingEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId ? { ...event, rsvp: !event.rsvp } : event
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome back, {user?.name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="/directory"
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-4 rounded-lg text-center transition duration-200"
              >
                Alumni Directory
              </a>
              <a
                href="/events"
                className="bg-green-100 hover:bg-green-200 text-green-800 p-4 rounded-lg text-center transition duration-200"
              >
                Events
              </a>
              <a
                href="/profile"
                className="bg-purple-100 hover:bg-purple-200 text-purple-800 p-4 rounded-lg text-center transition duration-200"
              >
                My Profile
              </a>
              {user?.role === 'admin' && (
                <a
                  href="/admin"
                  className="bg-red-100 hover:bg-red-200 text-red-800 p-4 rounded-lg text-center transition duration-200"
                >
                  Admin Panel
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Info</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Batch:</span> {user?.batch}</p>
            <p><span className="font-medium">Department:</span> {user?.department}</p>
            <p><span className="font-medium">Email:</span> {user?.email}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRSVP={handleRSVP}
                showRSVP={true}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No upcoming events</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;