// src/pages/RequestsOverview.jsx
import { useState, useMemo } from 'react';
import RequestCard from '../components/RequestCard.jsx';
import RequestForm from '../components/RequestForm.jsx';
import { generateId } from '../data/requestsData.js';

function RequestsOverview({ requests }) {
  const [showForm, setShowForm] = useState(false);
  const [filteredStatus, setFilteredStatus] = useState('all');

  const filteredRequests = useMemo(() => {
    if (filteredStatus === 'all') return requests;
    return requests.filter((req) => req.status === filteredStatus);
  }, [requests, filteredStatus]);

  const handleCreateRequest = (formData) => {
    // For now just simulate async submit and close form.
    // If you want to persist in state, lift this up into App and pass a callback.
    setTimeout(() => {
      console.log('New request created:', {
        id: generateId(),
        ...formData
      });
      setShowForm(false);
    }, 1500);
  };

  return (
    <div className="overview-page">
      <header className="page-header">
        <h2>Service Requests ({filteredRequests.length})</h2>
        <div className="controls">
          <button
            onClick={() => setShowForm((prev) => !prev)}
            aria-expanded={showForm}
            className="new-request-btn"
          >
            {showForm ? 'Cancel' : 'New Request'}
          </button>

          <div
            className="status-filter"
            role="radiogroup"
            aria-label="Filter by status"
          >
            <label>
              <input
                type="radio"
                name="status"
                value="all"
                checked={filteredStatus === 'all'}
                onChange={(e) => setFilteredStatus(e.target.value)}
              />
              All
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="pending"
                checked={filteredStatus === 'pending'}
                onChange={(e) => setFilteredStatus(e.target.value)}
              />
              Pending
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="in-progress"
                checked={filteredStatus === 'in-progress'}
                onChange={(e) => setFilteredStatus(e.target.value)}
              />
              In Progress
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="resolved"
                checked={filteredStatus === 'resolved'}
                onChange={(e) => setFilteredStatus(e.target.value)}
              />
              Resolved
            </label>
          </div>
        </div>
      </header>

      {showForm && (
        <section aria-labelledby="new-request-heading">
          <h3 id="new-request-heading">Create New Request</h3>
          <RequestForm onSubmit={handleCreateRequest} />
        </section>
      )}

      <section
        className="requests-list"
        role="list"
        aria-label="Service requests list"
      >
        {filteredRequests.length ? (
          filteredRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))
        ) : (
          <p>No requests match the selected filter.</p>
        )}
      </section>
    </div>
  );
}

export default RequestsOverview;
