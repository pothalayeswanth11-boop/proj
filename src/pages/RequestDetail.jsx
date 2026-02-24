import { useParams, useNavigate } from 'react-router-dom';
import StatusIndicator from '../components/StatusIndicator.jsx';

function RequestDetail({ requests, onStatusUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const request = requests.find(r => r.id === id);

  if (!request) {
    return (
      <div>
        <h2>Request Not Found</h2>
        <button onClick={() => navigate('/')}>Back to Overview</button>
      </div>
    );
  }

  const handleStatusChange = async (newStatus) => {
    await onStatusUpdate(request.id, newStatus);
  };

  return (
    <div className="detail-page">
      <header>
        <h2>{request.title}</h2>
        <StatusIndicator status={request.status} />
      </header>
      
      <div className="request-details">
        <p><strong>Description:</strong> {request.description}</p>
        <p><strong>Category:</strong> {request.category.replace('-', ' ').toUpperCase()}</p>
        <p><strong>Priority:</strong> {request.priority.toUpperCase()}</p>
        <p><strong>Created:</strong> {new Date(request.createdAt).toLocaleString()}</p>
        <p><strong>Updated:</strong> {new Date(request.updatedAt).toLocaleString()}</p>
      </div>

      <div className="status-actions">
        <button 
          onClick={() => handleStatusChange('pending')}
          className="status-btn"
          disabled={request.status === 'pending'}
        >
          Mark Pending
        </button>
        <button 
          onClick={() => handleStatusChange('in-progress')}
          className="status-btn"
          disabled={request.status === 'in-progress'}
        >
          In Progress
        </button>
        <button 
          onClick={() => handleStatusChange('resolved')}
          className="status-btn"
          disabled={request.status === 'resolved'}
        >
          Resolve
        </button>
      </div>

      <button onClick={() => navigate('/')}>Back to Overview</button>
    </div>
  );
}

export default RequestDetail;
