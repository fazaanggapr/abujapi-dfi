import React from 'react';
import ActivityFeed from './ActivityFeed';
import QuickActions from './QuickActions';

const MainContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ActivityFeed />
      <QuickActions />
    </div>
  );
};

export default MainContent;