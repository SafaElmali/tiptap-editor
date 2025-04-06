import TiptapEditor from '../components/TiptapEditor';

const App = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      {/* Top Header */}
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <h1 className="text-xl font-semibold">Tiptap Editor</h1>
      </header>
      
      {/* Main Content - 3 Column Grid */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-64 bg-gray-100 p-4 border-r border-gray-200 overflow-y-auto">
          <h2 className="text-lg font-medium mb-4">Left Panel</h2>
          <p>Navigation or document structure could go here</p>
        </div>
        
        {/* Editor Area (Middle) */}
        <div className="flex-1 bg-white p-4 overflow-y-auto flex flex-col">
          <div className="border border-gray-300 rounded-md p-4 flex-1 h-full">
            <TiptapEditor />
          </div>
        </div>
        
        {/* Right Panel */}
        <div className="w-64 bg-gray-100 p-4 border-l border-gray-200 overflow-y-auto">
          <h2 className="text-lg font-medium mb-4">Right Panel</h2>
          <p>Properties, formatting options, or metadata could go here</p>
        </div>
      </div>
    </div>
  );
};

export default App;
