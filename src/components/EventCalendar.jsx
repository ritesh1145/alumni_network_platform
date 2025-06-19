// src/components/EventCalendar.jsx
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const EventCalendar = ({ events }) => {
  const calendarEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: new Date(event.date),
    end: new Date(event.date),
    allDay: true,
    location: event.location,
    description: event.description,
  }));

  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        views={['month', 'week', 'day', 'agenda']}
        defaultView="month"
        onSelectEvent={(event) => alert(`${event.title}\n${event.description}`)}
      />
    </div>
  );
};

export default EventCalendar;