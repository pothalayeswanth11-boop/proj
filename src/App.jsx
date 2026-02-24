// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './components/Layout.jsx';
import RequestsOverview from './pages/RequestsOverview.jsx';
import RequestDetail from './pages/RequestDetail.jsx';
import { requestsData, updateRequestStatus } from './data/requestsData.js';

function App() {
  const [requests, setRequests] = useState(requestsData);

  // Simulate async data refresh every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      setRequests((prev) =>
        prev.map((req) => ({
          ...req,
          updatedAt: new Date().toISOString()
        }))
      );
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    // Simulate async API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRequests((prev) => updateRequestStatus(prev, id, newStatus));
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<RequestsOverview requests={requests} />} />
        <Route
          path="/request/:id"
          element={
            <RequestDetail
              requests={requests}
              onStatusUpdate={handleStatusUpdate}
            />
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
