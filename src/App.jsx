import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './components/Layout.jsx';
import RequestsOverview from './pages/RequestsOverview.jsx';
import RequestDetail from './pages/RequestDetail.jsx';
import { requestsData, updateRequestStatus } from './data/requestsData.js';

function App() {
  const [requests, setRequests] = useState(requestsData);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setRequests(prev => prev.map(req => ({
        ...req,
        updatedAt: new Date().toISOString()
      })));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRequests(prev => updateRequestStatus(prev, id, newStatus));
  };

  const handleCreateRequest = async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newRequest = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setRequests(prev => [newRequest, ...prev]);
  };

  return (
    <Layout>
      <Routes>
        <Route 
          path="/" 
          element={<RequestsOverview requests={requests} onCreate={handleCreateRequest} />} 
        />
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
