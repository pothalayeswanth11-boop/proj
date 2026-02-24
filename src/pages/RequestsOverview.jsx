import { useState, useMemo } from 'react';
import RequestCard from '../components/RequestCard.jsx';
import RequestForm from '../components/RequestForm.jsx';

function RequestsOverview({ requests, onCreate }) {
  const [showForm, setShowForm] = useState(false);
  const [filteredStatus, setFilteredStatus] = useState('all');

  const filteredRequests = useMemo(() => {
    if (filteredStatus === 'all') return requests;
    return requests.filter(req => req.status === filteredStatus);
  }, [requests, filteredStatus]);

  return (
    <div className="overview-page">
      <header className="page-header">
        <h2>Service Requests ({filteredRequests.length})</h2>
        <div className="controls">
          <button 
            onClick={() => setShowForm(!showForm)}
            aria-expanded={showForm}
            className="new-request-btn"
          >
            {showForm ? 'Cancel' : 'New Request'}
          </button>
        </div>
      </header>

      {showForm && (
        <section aria-labelledby="new-request-heading">
          <h3 id="new-request-heading">Create New Request</h3>
          <RequestForm onSubmit={onCreate} />
        </section>
      )}

      <section className="requests-list" role="list" aria-label="Service requests list">
        {filteredRequests.length ? (
          filteredRequests.map(request => (
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
