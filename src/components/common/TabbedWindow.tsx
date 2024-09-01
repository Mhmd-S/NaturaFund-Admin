import React from 'react';

import TabNav, { TabNavProps } from '@/components/common/TabNav';

interface TabbedWindowProps extends TabNavProps {
  children: React.ReactNode;
}

const TabbedWindow = ({ currentTab, setCurrentTab, tabs, children }: TabbedWindowProps) => {
  return (
    <div className="w-full overflow-y-auto p-6 bg-gray-300/20">
      <div className="flex flex-col bg-white p-6 rounded-3xl">
        <TabNav tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <div className="min-h-[26rem] p-4 grid grid-cols-1 gap-16 bg-white rounded-3xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TabbedWindow;
