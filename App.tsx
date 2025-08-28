
import React, { useState } from 'react';
import { Page } from './types';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/pages/Dashboard';
import Actividades from './components/pages/Actividades';
import Votaciones from './components/pages/Votaciones';
import Informes from './components/pages/Informes';
import Biblioteca from './components/pages/Biblioteca';
import Usuarios from './components/pages/Usuarios';
import ActivosComunitarios from './components/pages/ActivosComunitarios';
import IngresosEgresos from './components/pages/IngresosEgresos';
import InformeEconomico from './components/pages/InformeEconomico';
import { CommunityProvider } from './context/CommunityContext';

const pageTitles: { [key in Page]: string } = {
  [Page.Dashboard]: 'Inicio',
  [Page.Actividades]: 'Actividades y Agenda',
  [Page.Votaciones]: 'Votaciones',
  [Page.Informes]: 'Informes de Votación',
  [Page.Biblioteca]: 'Biblioteca Comunitaria',
  [Page.Usuarios]: 'Usuarios y Roles',
  [Page.Activos]: 'Activos Comunitarios',
  [Page.Finanzas]: 'Ingresos y Egresos',
  [Page.InformeEconomico]: 'Informe Económico',
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Dashboard:
        return <Dashboard />;
      case Page.Actividades:
        return <Actividades />;
      case Page.Votaciones:
        return <Votaciones />;
      case Page.Informes:
        return <Informes />;
      case Page.Biblioteca:
        return <Biblioteca />;
      case Page.Usuarios:
        return <Usuarios />;
      case Page.Activos:
        return <ActivosComunitarios />;
      case Page.Finanzas:
        return <IngresosEgresos />;
      case Page.InformeEconomico:
        return <InformeEconomico />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <CommunityProvider>
        <div className="flex h-screen bg-light-gray text-text-primary">
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title={pageTitles[currentPage]} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-light-gray p-4 md:p-6 lg:p-8">
                    {renderPage()}
                </main>
            </div>
        </div>
    </CommunityProvider>
  );
};

export default App;
