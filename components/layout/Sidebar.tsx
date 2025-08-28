
import React from 'react';
import { Page } from '../../types';
import Icon from '../icons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

type NavItem = {
  page: Page;
  label: string;
  icon: React.ComponentProps<typeof Icon>['name'];
};

const navItems: NavItem[] = [
  { page: Page.Dashboard, label: 'Inicio', icon: 'home' },
  { page: Page.Actividades, label: 'Actividades', icon: 'calendar' },
  { page: Page.Votaciones, label: 'Votaciones', icon: 'vote' },
  { page: Page.Informes, label: 'Informes', icon: 'fileText' },
  { page: Page.Biblioteca, label: 'Biblioteca', icon: 'book' },
  { page: Page.Usuarios, label: 'Usuarios', icon: 'users' },
  { page: Page.Activos, label: 'Activos', icon: 'archive' },
  { page: Page.Finanzas, label: 'Finanzas', icon: 'dollarSign' },
  { page: Page.InformeEconomico, label: 'Informe Económico', icon: 'barChart2' },
];

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <aside className="w-64 bg-primary text-white flex flex-col">
      <div className="flex items-center justify-center p-6 border-b border-primary-light">
        <h1 className="text-2xl font-bold">Wasi DAO</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.page}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(item.page);
            }}
            className={`flex items-center px-4 py-2.5 rounded-lg transition-colors ${
              currentPage === item.page
                ? 'bg-primary-dark font-semibold'
                : 'hover:bg-primary-light'
            }`}
          >
            <Icon name={item.icon} className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-primary-light text-center text-xs">
          <p>&copy; 2024 DAO Comunitario</p>
      </div>
    </aside>
  );
};

export default Sidebar;
