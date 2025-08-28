import React, { useState, useMemo } from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { FinancialRecord, TransactionType } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Icon from '../icons';

// Fix: Define a type for the editable record to handle the date as a string for the input form.
type EditableFinancialRecord = Omit<Partial<FinancialRecord>, 'date'> & { date?: string };

const IngresosEgresos: React.FC = () => {
    const { financialRecords, setFinancialRecords } = useCommunity();
    const [editingId, setEditingId] = useState<string | null>(null);
    // Fix: Use the new EditableFinancialRecord type for the state.
    const [editedRecord, setEditedRecord] = useState<EditableFinancialRecord>({});

    const handleEdit = (record: FinancialRecord) => {
        setEditingId(record.id);
        setEditedRecord({
            ...record,
            // Fix: Convert date to string for the input field without unsafe casting.
            date: record.date.toISOString().split('T')[0] // For input type="date"
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditedRecord({});
    };

    const handleSave = () => {
        if (!editedRecord.amount || editedRecord.amount <= 0) {
            alert('El monto debe ser mayor a 0.');
            return;
        }
        if (editingId) {
            setFinancialRecords(records => records.map(r => r.id === editingId ? { 
                ...r, 
                ...editedRecord,
                // Fix: Convert the date string back to a Date object on save.
                date: new Date(editedRecord.date!) 
            } as FinancialRecord : r));
            handleCancel();
        }
    };
    
    const handleDelete = (id: string) => {
        if(window.confirm('¿Está seguro de que desea eliminar este registro?')){
            setFinancialRecords(records => records.filter(r => r.id !== id));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedRecord(prev => ({ ...prev, [name]: name === 'amount' ? parseFloat(value) || 0 : value }));
    };

    const totals = useMemo(() => {
        const ingresos = financialRecords.filter(r => r.type === TransactionType.Ingreso).reduce((acc, r) => acc + r.amount, 0);
        const egresos = financialRecords.filter(r => r.type === TransactionType.Egreso).reduce((acc, r) => acc + r.amount, 0);
        return { ingresos, egresos, balance: ingresos - egresos };
    }, [financialRecords]);

    const chartData = useMemo(() => {
        const monthlyData: { [key: string]: { name: string, Ingresos: number, Egresos: number } } = {};
        financialRecords.forEach(record => {
            const month = record.date.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' });
            if (!monthlyData[month]) {
                monthlyData[month] = { name: month, Ingresos: 0, Egresos: 0 };
            }
            if (record.type === TransactionType.Ingreso) {
                monthlyData[month].Ingresos += record.amount;
            } else {
                monthlyData[month].Egresos += record.amount;
            }
        });
        return Object.values(monthlyData).reverse();
    }, [financialRecords]);

    const isEditing = (id: string) => editingId === id;

    return (
        <div className="space-y-6">
            <Card>
                <h2 className="text-xl font-bold mb-4">Resumen Financiero</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-green-100 rounded-lg">
                        <p className="text-sm text-green-800">Total Ingresos</p>
                        <p className="text-2xl font-bold text-green-900">{totals.ingresos.toLocaleString('es-BO', { style: 'currency', currency: 'BOB' })}</p>
                    </div>
                    <div className="p-4 bg-red-100 rounded-lg">
                        <p className="text-sm text-red-800">Total Egresos</p>
                        <p className="text-2xl font-bold text-red-900">{totals.egresos.toLocaleString('es-BO', { style: 'currency', currency: 'BOB' })}</p>
                    </div>
                     <div className={`p-4 rounded-lg ${totals.balance >= 0 ? 'bg-blue-100' : 'bg-yellow-100'}`}>
                        <p className={`text-sm ${totals.balance >= 0 ? 'text-blue-800' : 'text-yellow-800'}`}>Balance</p>
                        <p className={`text-2xl font-bold ${totals.balance >= 0 ? 'text-blue-900' : 'text-yellow-900'}`}>{totals.balance.toLocaleString('es-BO', { style: 'currency', currency: 'BOB' })}</p>
                    </div>
                </div>
                <div style={{ width: '100%', height: 250 }} className="mt-6">
                    <ResponsiveContainer>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value: number) => value.toLocaleString('es-BO')} />
                            <Legend />
                            <Bar dataKey="Ingresos" fill="#25D366" />
                            <Bar dataKey="Egresos" fill="#EF4444" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Registro de Movimientos</h2>
                    <Button leftIcon="plus">Nuevo Movimiento</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-xs text-text-secondary uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Fecha</th><th className="px-6 py-3">Concepto</th><th className="px-6 py-3">Tipo</th><th className="px-6 py-3">Monto (Bs.)</th><th className="px-6 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {financialRecords.map(record => (
                                <tr key={record.id} className="bg-white border-b hover:bg-gray-50">
                                    {/* Fix: Use the string date from the state and remove the unsafe cast. */}
                                    <td className="px-6 py-4">{isEditing(record.id) ? <input type="date" name="date" value={editedRecord.date || ''} onChange={handleInputChange} className="border rounded px-2 py-1"/> : record.date.toLocaleDateString('es-ES')}</td>
                                    <td className="px-6 py-4">{isEditing(record.id) ? <input name="concept" value={editedRecord.concept} onChange={handleInputChange} className="border rounded px-2 py-1 w-full"/> : record.concept}</td>
                                    <td className="px-6 py-4">{isEditing(record.id) ? (
                                        <select name="type" value={editedRecord.type} onChange={handleInputChange} className="border rounded px-2 py-1">
                                            {Object.values(TransactionType).map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    ) : <span className={`font-semibold ${record.type === TransactionType.Ingreso ? 'text-green-600' : 'text-red-600'}`}>{record.type}</span>}</td>
                                    <td className="px-6 py-4">{isEditing(record.id) ? <input type="number" name="amount" value={editedRecord.amount} onChange={handleInputChange} className="border rounded px-2 py-1 w-full"/> : record.amount.toLocaleString('es-BO')}</td>
                                    <td className="px-6 py-4">
                                         {isEditing(record.id) ? (
                                            <div className="flex space-x-2"><Button onClick={handleSave} className="p-2 bg-green-500 hover:bg-green-600"><Icon name="save" className="w-4 h-4 text-white"/></Button><Button onClick={handleCancel} className="p-2 bg-gray-500 hover:bg-gray-600"><Icon name="x" className="w-4 h-4 text-white"/></Button></div>
                                        ) : (
                                            <div className="flex space-x-2"><Button onClick={() => handleEdit(record)} variant="ghost" className="p-2"><Icon name="edit" className="w-4 h-4"/></Button><Button onClick={() => handleDelete(record.id)} variant="ghost" className="p-2 text-red-500 hover:bg-red-50"><Icon name="trash2" className="w-4 h-4"/></Button></div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default IngresosEgresos;