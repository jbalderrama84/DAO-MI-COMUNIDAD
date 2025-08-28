
import React from 'react';
import { useCommunity } from '../../context/CommunityContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Icon from '../icons';

const Usuarios: React.FC = () => {
    const { users } = useCommunity();

    return (
        <Card>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Miembros de la Comunidad</h2>
                <Button leftIcon="plus">Añadir Miembro</Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-text-secondary">
                    <thead className="text-xs text-text-secondary uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nombre</th>
                            <th scope="col" className="px-6 py-3">Rol</th>
                            <th scope="col" className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-text-primary">
                                    <div className="flex items-center">
                                        <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full mr-3"/>
                                        {user.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4">{user.role}</td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                        <Button variant="ghost" className="p-2"><Icon name="edit" className="w-4 h-4"/></Button>
                                        <Button variant="ghost" className="p-2 text-red-500 hover:bg-red-50"><Icon name="trash2" className="w-4 h-4"/></Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default Usuarios;
