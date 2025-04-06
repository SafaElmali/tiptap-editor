import TiptapEditor from "../components/TiptapEditor/TiptapEditor";

const App = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      {/* Top Header */}
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <h1 className="text-xl font-semibold">Tiptap Editor</h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 bg-white p-4 overflow-hidden">
        <div className="h-full">
          <TiptapEditor />
        </div>
      </div>
    </div>
  );
};

export default App;
