
import React from 'react';
import { useCommunity } from '../../context/CommunityContext';
import Card from '../ui/Card';
import Button from '../ui/Button';

const Informes: React.FC = () => {
    const { proposals } = useCommunity();

    const totalProposals = proposals.length;
    const openProposals = proposals.filter(p => p.status === 'Abierta').length;
    const closedProposals = totalProposals - openProposals;
    const totalVotes = proposals.reduce((acc, p) => acc + p.votes.length, 0);

    return (
        <Card>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Informe General de Votaciones</h2>
                <div className="flex space-x-2">
                    <Button leftIcon="download" variant="ghost">Descargar PDF</Button>
                    <Button leftIcon="share">Compartir Informe</Button>
                </div>
            </div>
            <div className="prose max-w-none text-text-secondary">
                <p>
                    A la fecha, la comunidad ha gestionado un total de <strong>{totalProposals} propuestas</strong>. 
                    De estas, <strong>{openProposals} se encuentran actualmente abiertas</strong> para votación, 
                    mientras que <strong>{closedProposals} ya han sido cerradas</strong> y sus resultados registrados.
                </p>
                <p>
                    Se ha registrado una participación total de <strong>{totalVotes} votos</strong> en todas las propuestas, lo que demuestra un compromiso activo de los miembros en la toma de decisiones.
                </p>
                <h3 className="text-lg font-semibold text-text-primary mt-6">Recomendaciones</h3>
                <ul>
                    <li>Fomentar la participación en las propuestas con menor número de votos.</li>
                    <li>Revisar las propuestas abiertas que están próximas a su fecha de vencimiento.</li>
                    <li>Comunicar activamente los resultados de las votaciones cerradas a toda la comunidad.</li>
                </ul>
            </div>
        </Card>
    );
};

export default Informes;
