
import React, { useState } from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { CommunityAsset, AssetCategory } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Icon from '../icons';

const ActivosComunitarios: React.FC = () => {
    const { assets, setAssets } = useCommunity();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedAsset, setEditedAsset] = useState<Partial<CommunityAsset>>({});

    const handleEdit = (asset: CommunityAsset) => {
        setEditingId(asset.id);
        setEditedAsset(asset);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditedAsset({});
    };

    const handleSave = () => {
        if (!editedAsset.value || editedAsset.value <= 0) {
            alert('El valor del activo debe ser mayor a 0.');
            return;
        }
        if (editingId) {
            setAssets(assets.map(a => a.id === editingId ? { ...a, ...editedAsset } as CommunityAsset : a));
            handleCancel();
        }
    };
    
    const handleDelete = (id: string) => {
        if(window.confirm('¿Está seguro de que desea eliminar este activo?')){
            setAssets(assets.filter(a => a.id !== id));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedAsset(prev => ({ ...prev, [name]: name === 'value' ? parseFloat(value) || 0 : value }));
    };

    const isEditing = (id: string) => editingId === id;

    return (
        <Card>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Inventario de Activos Comunitarios</h2>
                <Button leftIcon="plus">Añadir Activo</Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-text-secondary">
                    <thead className="text-xs text-text-secondary uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nombre</th>
                            <th scope="col" className="px-6 py-3">Categoría</th>
                            <th scope="col" className="px-6 py-3">Responsable</th>
                            <th scope="col" className="px-6 py-3">Ubicación</th>
                            <th scope="col" className="px-6 py-3">Valor (Bs.)</th>
                            <th scope="col" className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.map((asset) => (
                            <tr key={asset.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">{isEditing(asset.id) ? <input name="name" value={editedAsset.name} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" /> : asset.name}</td>
                                <td className="px-6 py-4">{isEditing(asset.id) ? (
                                    <select name="category" value={editedAsset.category} onChange={handleInputChange} className="border rounded px-2 py-1 w-full">
                                        {Object.values(AssetCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                ) : asset.category}</td>
                                <td className="px-6 py-4">{isEditing(asset.id) ? <input name="responsible" value={editedAsset.responsible} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" /> : asset.responsible}</td>
                                <td className="px-6 py-4">{isEditing(asset.id) ? <input name="location" value={editedAsset.location} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" /> : asset.location}</td>
                                <td className="px-6 py-4">{isEditing(asset.id) ? <input type="number" name="value" value={editedAsset.value} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" /> : asset.value.toLocaleString('es-BO')}</td>
                                <td className="px-6 py-4">
                                    {isEditing(asset.id) ? (
                                        <div className="flex space-x-2">
                                            <Button onClick={handleSave} className="p-2 bg-green-500 hover:bg-green-600"><Icon name="save" className="w-4 h-4 text-white"/></Button>
                                            <Button onClick={handleCancel} className="p-2 bg-gray-500 hover:bg-gray-600"><Icon name="x" className="w-4 h-4 text-white"/></Button>
                                        </div>
                                    ) : (
                                        <div className="flex space-x-2">
                                            <Button onClick={() => handleEdit(asset)} variant="ghost" className="p-2"><Icon name="edit" className="w-4 h-4"/></Button>
                                            <Button onClick={() => handleDelete(asset.id)} variant="ghost" className="p-2 text-red-500 hover:bg-red-50"><Icon name="trash2" className="w-4 h-4"/></Button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default ActivosComunitarios;
