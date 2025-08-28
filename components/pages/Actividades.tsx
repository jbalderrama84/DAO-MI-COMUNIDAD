
import React from 'react';
import { useCommunity } from '../../context/CommunityContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Icon from '../icons';
import { Activity } from '../../types';

const statusBadge = (status: Activity['status']) => {
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
    switch (status) {
        case 'Programada':
            return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Programada</span>;
        case 'Realizada':
            return <span className={`${baseClasses} bg-green-100 text-green-800`}>Realizada</span>;
        case 'Cancelada':
            return <span className={`${baseClasses} bg-red-100 text-red-800`}>Cancelada</span>;
        default:
            return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>Desconocido</span>;
    }
};

const Actividades: React.FC = () => {
    const { activities } = useCommunity();
    
    return (
        <Card>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Agenda Comunitaria</h2>
                <Button leftIcon="plus">Agendar Actividad</Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-text-secondary">
                    <thead className="text-xs text-text-secondary uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Fecha</th>
                            <th scope="col" className="px-6 py-3">Título</th>
                            <th scope="col" className="px-6 py-3">Lugar</th>
                            <th scope="col" className="px-6 py-3">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((activity) => (
                            <tr key={activity.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-text-primary">
                                    {activity.date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </td>
                                <td className="px-6 py-4 text-text-primary">{activity.title}</td>
                                <td className="px-6 py-4">{activity.location}</td>
                                <td className="px-6 py-4">{statusBadge(activity.status)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default Actividades;
