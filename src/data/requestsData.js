// src/data/requestsData.js
export const requestsData = [
  {
    id: '1',
    title: 'Network connectivity issue in Lab 204',
    description: 'Users cannot access shared drives. Started after recent Windows update.',
    category: 'it-support',
    priority: 'high',
    status: 'pending',
    createdAt: '2026-02-20T09:30:00Z',
    updatedAt: '2026-02-20T09:30:00Z'
  },
  {
    id: '2',
    title: 'Broken projector in Conference Room A',
    description: 'HDMI input not working. Need replacement or repair.',
    category: 'maintenance',
    priority: 'medium',
    status: 'in-progress',
    createdAt: '2026-02-21T14:15:00Z',
    updatedAt: '2026-02-22T10:00:00Z'
  },
  {
    id: '3',
    title: 'New desk chair request - Employee #456',
    description: 'Ergonomic chair needed due to back pain.',
    category: 'facility',
    priority: 'low',
    status: 'resolved',
    createdAt: '2026-02-19T16:45:00Z',
    updatedAt: '2026-02-22T09:00:00Z'
  }
];

export const updateRequestStatus = (requests, id, newStatus) => {
  return requests.map((req) =>
    req.id === id
      ? { ...req, status: newStatus, updatedAt: new Date().toISOString() }
      : req
  );
};

export const generateId = () => Date.now().toString();
