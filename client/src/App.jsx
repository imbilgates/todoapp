import { useContext } from 'react';
import './App.css';
import Todo from './components/Todo';
import FullScreenLoader from './components/ui/FullScreenLoader';
import { TodoContext } from './context/TodoContext';

function AppContent() {
  const { loading } = useContext(TodoContext);

  return loading ? <FullScreenLoader /> : <Todo />;
}

function App() {
  return (
    <AppContent />
  );
}

export default App;
