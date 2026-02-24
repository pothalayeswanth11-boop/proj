// src/pages/RequestDetail.jsx
import { useParams, Link } from 'react-router-dom';

function RequestDetail({ requests, onStatusUpdate }) {
  const { id } = useParams();
  const request = requests.find((r) => r.id === id);

  if (!request) {
    return (
      <div>
        <p>Request not found.</p>
        <Link to="/">Back to overview</Link>
      </div>
    );
  }

  const handleChangeStatus = (e) => {
    const newStatus = e.target.value;
    onStatusUpdate(request.id, newStatus);
  };

  return (
    <div className="request-detail">
      <Link to="/" className="back-link">
        ← Back to overview
      </Link>

      <header>
        <h2>{request.title}</h2>
        <p>{request.description}</p>
      </header>

      <section className="detail-meta">
        <p>
          <strong>Category:</strong> {request.category}
        </p>
        <p>
          <strong>Priority:</strong> {request.priority}
        </p>
        <p>
          <strong>Status:</strong>{' '}
          <select value={request.status} onChange={handleChangeStatus}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </p>
        <p>
          <strong>Created:</strong>{' '}
          {new Date(request.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Last updated:</strong>{' '}
          {new Date(request.updatedAt).toLocaleString()}
        </p>
      </section>
    </div>
  );
}

export default RequestDetail;
