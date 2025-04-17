import { useState } from 'react';
import { 
  PlusIcon, 
  TrashIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  ArrowPathIcon 
} from '@heroicons/react/24/outline';

const DataSourceCard = ({ source, onDelete, onRefresh }) => {
  const statusColors = {
    connected: 'text-green-600 bg-green-100',
    error: 'text-red-600 bg-red-100',
    pending: 'text-amber-600 bg-amber-100',
  };

  const statusIcons = {
    connected: <CheckCircleIcon className="w-4 h-4" />,
    error: <ExclamationTriangleIcon className="w-4 h-4" />,
    pending: <ArrowPathIcon className="w-4 h-4 animate-spin" />,
  };

  return (
    <div className="card relative">
      <div className="absolute right-3 sm:right-5 top-3 sm:top-5 flex gap-1 sm:gap-2">
        <button 
          onClick={() => onRefresh(source.id)}
          className="p-1 sm:p-1.5 rounded-full hover:bg-gray-100"
          title="Refresh connection"
        >
          <ArrowPathIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
        </button>
        <button 
          onClick={() => onDelete(source.id)}
          className="p-1 sm:p-1.5 rounded-full hover:bg-gray-100 hover:text-red-500" 
          title="Remove data source"
        >
          <TrashIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
      
      <div className="flex items-center mb-3 sm:mb-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary-100 flex items-center justify-center mr-2 sm:mr-3">
          <img 
            src={source.icon || 'https://via.placeholder.com/40'} 
            alt={source.name} 
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
        </div>
        <div>
          <h3 className="text-sm sm:text-base w-24 text-black font-medium">{source.name}</h3>
          <div className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-xs ${statusColors[source.status]}`}>
            <span className="mr-1">{statusIcons[source.status]}</span>
            <span>{source.status.charAt(0).toUpperCase() + source.status.slice(1)}</span>
          </div>
        </div>
      </div>
      
      <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
        {source.description}
      </div>
      
      <div className="text-xs text-gray-500">
        <div className="flex justify-between">
          <span>Last sync</span>
          <span>{source.lastSync || 'Never'}</span>
        </div>
        <div className="flex justify-between mt-1">
          <span>Data size</span>
          <span>{source.dataSize}</span>
        </div>
      </div>
    </div>
  );
};

const DataSourcesPanel = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [dataSources, setDataSources] = useState([
    {
      id: 1,
      name: 'Manufacturing ERP',
      description: 'Enterprise resource planning system with inventory and order data',
      status: 'connected',
      lastSync: '15 minutes ago',
      dataSize: '1.2 GB',
      icon: 'https://cdn-icons-png.flaticon.com/512/5084/5084125.png',
    },
    {
      id: 2,
      name: 'Warehouse Management',
      description: 'Warehouse operations, shipping, and receiving data',
      status: 'connected',
      lastSync: '1 hour ago',
      dataSize: '800 MB',
      icon: 'https://cdn-icons-png.flaticon.com/512/2249/2249342.png',
    },
    {
      id: 3,
      name: 'IoT Sensor Network',
      description: 'Real-time equipment monitoring and sensor data',
      status: 'error',
      lastSync: 'Connection failed',
      dataSize: '650 MB',
      icon: 'https://cdn-icons-png.flaticon.com/512/2885/2885417.png',
    },
    {
      id: 4,
      name: 'Quality Control Database',
      description: 'Product quality metrics and test results',
      status: 'connected',
      lastSync: '30 minutes ago',
      dataSize: '450 MB',
      icon: 'https://cdn-icons-png.flaticon.com/512/1611/1611179.png',
    }
  ]);

  const handleDelete = (id) => {
    setDataSources(dataSources.filter(source => source.id !== id));
  };

  const handleRefresh = (id) => {
    setDataSources(dataSources.map(source => 
      source.id === id 
        ? { ...source, status: 'pending' }
        : source
    ));
    
    // Simulate refresh
    setTimeout(() => {
      setDataSources(dataSources.map(source => 
        source.id === id 
          ? { 
              ...source, 
              status: 'connected', 
              lastSync: 'Just now' 
            }
          : source
      ));
    }, 2000);
  };

  return (
    <div className="p-3 sm:p-6">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Data Sources</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary flex items-center text-sm sm:text-base py-1.5 sm:py-2"
        >
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
          Add New
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {dataSources.map(source => (
          <DataSourceCard 
            key={source.id} 
            source={source} 
            onDelete={handleDelete}
            onRefresh={handleRefresh}
          />
        ))}
      </div>
      
      {/* Add Data Source button for empty state */}
      {dataSources.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 sm:py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <PlusIcon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
          </div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">No data sources connected</h3>
          <p className="text-sm text-gray-500 mb-4 text-center max-w-md px-4">
            Connect data sources to enable the retrieval system to analyze your industrial data
          </p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary text-sm sm:text-base"
          >
            Add Data Source
          </button>
        </div>
      )}
    </div>
  );
};

export default DataSourcesPanel; 