import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { LibraryView } from './views/LibraryView';
import { CreateView } from './views/CreateView';
import { CoachView } from './views/CoachView';
import { EvaluationView } from './views/EvaluationView';

function App() {
  const [activeTab, setActiveTab] = useState('library');

  const renderView = () => {
    switch (activeTab) {
      case 'library':
        return <LibraryView />;
      case 'create':
        return <CreateView />;
      case 'coach':
        return <CoachView />;
      case 'eval':
        return <EvaluationView />;
      default:
        return <LibraryView />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderView()}
    </Layout>
  );
}

export default App;
