// /src/api/events.js
import api from './axiosInstance';

export const getEvents = () => api.get('/events');
export const getEventById = (id) => api.get(`/events/${id}`);
export const createEvent = (data) => api.post('/events', data);
export const updateEvent = (id, data) => api.put(`/events/${id}`, data);
export const deleteEvent = (id) => api.delete(`/events/${id}`);

export const rsvpEvent = (id, status = 'going', token) =>
  api.post(
    `/events/${id}/rsvp`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );