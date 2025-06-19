// src/pages/Events.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import EventCalendar from '../components/EventCalendar';

const Events = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [showPastEvents, setShowPastEvents] = useState(false);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockEvents = [
      {
        id: '1',
        title: 'Annual Alumni Meet',
        date: '2023-12-15',
        location: 'University Campus',
        description: 'Join us for the annual alumni meet and reconnect with your batchmates.',
        rsvp: false,
        organizer: 'Alumni Association',
      },
      {
        id: '2',
        title: 'Career Workshop',
        date: '2023-11-20',
        location: 'Online',
        description: 'Learn about current industry trends and career opportunities.',
        rsvp: true,
        organizer: 'Career Services',
      },
      {
        id: '3',
        title: 'Department Reunion - Computer Science',
        date: '2023-10-05',
        location: 'CS Department Building',
        description: 'Reunion for Computer Science alumni from all batches.',
        rsvp: false,
        organizer: 'CS Department',
      },
      {
        id: '4',
        title: 'Startup Pitch Competition',
        date: '2024-01-15',
        location: 'Business School Auditorium',
        description: 'Alumni startups pitch their ideas to investors.',
        rsvp: false,
        organizer: 'Entrepreneurship Cell',
      },
    ];
    setEvents(mockEvents);
    setLoading(false);
  }, []);

  const handleRSVP = (eventId) => {
    // Mock RSVP functionality
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId ? { ...event, rsvp: !event.rsvp } : event
      )
    );
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return showPastEvents || eventDate >= today;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        {user?.role === 'admin' && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Create Event
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg ${viewMode === 'calendar' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Calendar View
            </button>
          </div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showPastEvents}
              onChange={() => setShowPastEvents(!showPastEvents)}
              className="rounded text-blue-600"
            />
            <span>Show past events</span>
          </label>
        </div>

        {viewMode === 'list' ? (
          <div className="space-y-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRSVP={handleRSVP}
                  showRSVP={true}
                  showOrganizer={true}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-6">No events found</p>
            )}
          </div>
        ) : (
          <EventCalendar events={filteredEvents} />
        )}
      </div>
    </div>
  );
};

export default Events;