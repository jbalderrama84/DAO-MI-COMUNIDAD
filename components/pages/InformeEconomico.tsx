
import React, { useState, useMemo } from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { TransactionType } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

const InformeEconomico: React.FC = () => {
    const { financialRecords } = useCommunity();
    const [period, setPeriod] = useState<string>(new Date().toISOString().slice(0, 7)); // YYYY-MM

    const filteredRecords = useMemo(() => {
        if (!period) return financialRecords;
        const [year, month] = period.split('-').map(Number);
        return financialRecords.filter(record => {
            const recordDate = new Date(record.date);
            return recordDate.getFullYear() === year && recordDate.getMonth() + 1 === month;
        });
    }, [period, financialRecords]);

    const totals = useMemo(() => {
        const ingresos = filteredRecords.filter(r => r.type === TransactionType.Ingreso).reduce((acc, r) => acc + r.amount, 0);
        const egresos = filteredRecords.filter(r => r.type === TransactionType.Egreso).reduce((acc, r) => acc + r.amount, 0);
        return { ingresos, egresos, balance: ingresos - egresos };
    }, [filteredRecords]);
    
    const formattedPeriod = new Date(period + '-02').toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

    return (
        <Card>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                <h2 className="text-xl font-bold">Informe Económico Mensual</h2>
                <div className="flex items-center space-x-2">
                    <label htmlFor="period" className="text-sm font-medium">Seleccionar Período:</label>
                    <input 
                        type="month" 
                        id="period"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-light"
                    />
                </div>
            </div>
             <div className="flex justify-end space-x-2 mb-6">
                <Button leftIcon="download" variant="ghost">Descargar PDF</Button>
                <Button leftIcon="share">Compartir Informe</Button>
            </div>

            <div className="prose max-w-none text-text-secondary">
                 <h3 className="text-lg font-semibold text-text-primary">
                    Resumen para {formattedPeriod}
                </h3>
                {filteredRecords.length > 0 ? (
                <>
                    <p>
                        Durante el período de <strong>{formattedPeriod}</strong>, la comunidad registró los siguientes movimientos financieros:
                    </p>
                    <ul>
                        <li><strong>Total de Ingresos:</strong> <span className="text-green-600 font-semibold">{totals.ingresos.toLocaleString('es-BO', { style: 'currency', currency: 'BOB' })}</span></li>
                        <li><strong>Total de Egresos:</strong> <span className="text-red-600 font-semibold">{totals.egresos.toLocaleString('es-BO', { style: 'currency', currency: 'BOB' })}</span></li>
                        <li><strong>Balance del Período:</strong> <span className={`${totals.balance >= 0 ? 'text-blue-600' : 'text-yellow-600'} font-semibold`}>{totals.balance.toLocaleString('es-BO', { style: 'currency', currency: 'BOB' })}</span></li>
                    </ul>
                    <h4 className="text-md font-semibold text-text-primary mt-4">Detalle de Movimientos:</h4>
                    <ul className="list-disc pl-5">
                        {filteredRecords.map(record => (
                            <li key={record.id}>
                                {record.date.toLocaleDateString('es-ES')}: {record.concept} - 
                                <span className={`font-semibold ${record.type === TransactionType.Ingreso ? 'text-green-600' : 'text-red-600'}`}>
                                    {' '}{record.amount.toLocaleString('es-BO')} Bs. ({record.type})
                                </span>
                            </li>
                        ))}
                    </ul>
                </>
                ) : (
                    <p>No se encontraron movimientos financieros para el período seleccionado.</p>
                )}
            </div>
        </Card>
    );
};

export default InformeEconomico;
