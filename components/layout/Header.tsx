
import React from 'react';
import { useCommunity } from '../../context/CommunityContext';
import Icon from '../icons';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { currentUser } = useCommunity();

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-text-primary">{title}</h1>
      <div className="flex items-center space-x-3">
        <div className="text-right">
            <p className="font-semibold text-sm">{currentUser.name}</p>
            <p className="text-xs text-text-secondary">{currentUser.role}</p>
        </div>
        <img
          src={currentUser.avatarUrl}
          alt={currentUser.name}
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
