import QueryPanel from '../components/QueryPanel';

const Dashboard = () => {
  return (
    <div className="w-full px-2 sm:px-4 py-3 sm:py-6">
      <div className="w-full h-[calc(100vh-6rem)] sm:h-[calc(100vh-8rem)]">
        <div className="bg-white rounded-lg h-full shadow-sm">
          <QueryPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 