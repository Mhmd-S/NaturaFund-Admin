import { useState } from 'react';
import { useParams } from 'react-router-dom';

import TabbedWindow from '@components/common/TabbedWindow';

import Investments from '@pages/Users/UserDetails/Investments';
import Projects from '@pages/Users/UserDetails/Projects';
import UserInfo from '@pages/Users/UserDetails/UserInfo';

const UserDetails = () => {
  const [currentTab, setCurrentTab] = useState('User Info');

  const { id } = useParams();

  const tabs = ['User Info', 'Projects', 'Investments'];

  const renderTab = () => {
    switch (currentTab) {
      case 'User Info':
        return <UserInfo userId={id} />;
      case 'Projects':
        return <Projects userId={id} />;
      case 'Investments':
        return <Investments userId={id} />;
    }
  };

  return (
    <TabbedWindow
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      showGoBack
      tabs={tabs}
    >
      {renderTab()}
    </TabbedWindow>
  );
};

export default UserDetails;
