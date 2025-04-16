import { useState } from 'react';
import { PaperAirplaneIcon, ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline';

const QueryPanel = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newResponse = {
        answer: `Based on your ERP data, I've identified these supply chain bottlenecks:
• Warehouse A is operating at 94% capacity
• Supplier XYZ has missed delivery deadlines by 3.2 days on average`,
        suggestions: [
          'Implement cross-docking at Warehouse A to reduce storage requirements',
          'Identify alternative suppliers to supplement deliveries during peak periods'
        ]
      };
      
      setResponse(newResponse);
      setHistory([...history, { query, response: newResponse }]);
      setQuery('');
      setIsLoading(false);
    }, 1500);
  };

  const clearQuery = () => {
    setQuery('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="h-full flex flex-col w-full">
      {/* Response display area */}
      <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto w-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <ArrowPathIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 animate-spin" />
            <p className="mt-2 text-sm sm:text-base text-gray-600">Analyzing industrial data...</p>
          </div>
        ) : response ? (
          <div className="space-y-4 sm:space-y-6 w-full">
            <div className="card bg-gray-50 border border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Response</h3>
              <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line">{response.answer}</p>
            </div>
            
            {response.suggestions?.length > 0 && (
              <div className="card bg-blue-50 border border-blue-200">
                <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-2 sm:mb-3">Optimization Suggestions</h3>
                <ul className="list-disc pl-5 space-y-1 sm:space-y-2">
                  {response.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="text-sm sm:text-base text-blue-900">{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4 sm:p-8">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Industrial Retrieval System</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-md mb-2">
              Ask questions about your industrial data to get AI-powered insights.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md">
              Example: "What are the current bottlenecks in our supply chain operations?"
            </p>
          </div>
        )}
      </div>
      
      {/* Query input form */}
      <div className="border-t border-gray-200 p-2 sm:p-4 bg-white w-full">
        <form onSubmit={handleSubmit} className="flex items-end gap-2 sm:gap-3 w-full">
          <div className="flex-1 relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about your industrial operations..."
              className="w-full absolute bottom-0 px-2 sm:px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base min-h-[50px] sm:min-h-[60px] resize-none"
              rows={1}
            />
            {query && (
              <button 
                type="button" 
                onClick={clearQuery}
                className="absolute right-2 sm:right-3 bottom-2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
          <button 
            type="submit"
            disabled={!query.trim() || isLoading}
            className={`px-3 sm:px-4 py-2 rounded-md font-medium transition-colors h-[50px] sm:h-[60px] aspect-square flex items-center justify-center p-0 ${
              !query.trim() || isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-700 text-white hover:bg-blue-800'
            }`}
          >
            <PaperAirplaneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default QueryPanel; 