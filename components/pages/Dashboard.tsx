
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useCommunity } from '../../context/CommunityContext';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import Icon from '../icons';
import { Activity, Proposal } from '../../types';

const participationData = [
  { name: 'Ene', votaciones: 4, asambleas: 2 },
  { name: 'Feb', votaciones: 3, asambleas: 1 },
  { name: 'Mar', votaciones: 5, asambleas: 3 },
  { name: 'Abr', votaciones: 4, asambleas: 2 },
  { name: 'May', votaciones: 6, asambleas: 2 },
  { name: 'Jun', votaciones: 7, asambleas: 4 },
  { name: 'Jul', votaciones: 5, asambleas: 2 },
];

const QuickActionButton: React.FC<{ icon: React.ComponentProps<typeof Icon>['name'], label: string }> = ({ icon, label }) => (
    <Button variant="ghost" className="flex flex-col h-24 w-full items-center justify-center text-center bg-white hover:bg-gray-50 border rounded-lg">
        <Icon name={icon} className="w-6 h-6 mb-2 text-primary" />
        <span className="text-xs font-semibold text-text-primary">{label}</span>
    </Button>
);

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => (
    <div className="flex items-center space-x-3 py-2 border-b last:border-b-0">
        <div className="flex-shrink-0 bg-primary-light text-primary p-2 rounded-lg">
            <Icon name="calendar" className="w-5 h-5" />
        </div>
        <div>
            <p className="font-semibold text-sm">{activity.title}</p>
            <p className="text-xs text-text-secondary">{activity.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })} - {activity.location}</p>
        </div>
    </div>
);

const DecisionItem: React.FC<{ proposal: Proposal }> = ({ proposal }) => (
     <div className="flex items-start space-x-3 py-2 border-b last:border-b-0">
        <div className="flex-shrink-0 text-secondary mt-1">
             <Icon name="checkCircle" className="w-5 h-5" />
        </div>
        <div>
            <p className="font-semibold text-sm">{proposal.title}</p>
            <p className="text-xs text-text-secondary">Cerrada el {proposal.expiresAt.toLocaleDateString('es-ES')}</p>
        </div>
    </div>
);


const Dashboard: React.FC = () => {
    const { activities, proposals } = useCommunity();
    const upcomingActivities = activities.filter(a => a.status === 'Programada').slice(0, 3);
    const recentDecisions = proposals.filter(p => p.status === 'Cerrada').slice(0, 3);
    
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main column */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Resumen de Participación (Últimos 7 Meses)</CardTitle>
            </CardHeader>
            <CardContent>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={participationData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="votaciones" fill="#075E54" name="Votaciones" />
                        <Bar dataKey="asambleas" fill="#25D366" name="Asambleas" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card>
                <CardHeader>
                    <CardTitle>Próximas Actividades</CardTitle>
                </CardHeader>
                <CardContent>
                   {upcomingActivities.length > 0 ? (
                        upcomingActivities.map(act => <ActivityItem key={act.id} activity={act} />)
                   ) : (
                       <p>No hay actividades programadas.</p>
                   )}
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Últimas Decisiones</CardTitle>
                </CardHeader>
                <CardContent>
                    {recentDecisions.length > 0 ? (
                        recentDecisions.map(prop => <DecisionItem key={prop.id} proposal={prop} />)
                    ) : (
                        <p>No hay decisiones recientes.</p>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>

      {/* Side column */}
      <div className="lg:col-span-1 space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Accesos Rápidos</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <QuickActionButton icon="plus" label="Crear Votación" />
                    <QuickActionButton icon="fileUp" label="Subir Archivo" />
                    <QuickActionButton icon="calendar" label="Agendar Actividad" />
                    <QuickActionButton icon="dollarSign" label="Registrar Gasto" />
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
