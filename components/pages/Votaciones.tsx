
import React, { useState, useMemo } from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { Proposal, VoteOption, ProposalType } from '../../types';
import Card, { CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import Icon from '../icons';
import Modal from '../ui/Modal';

// Form components
const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light" />
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea {...props} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light" />
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <select {...props} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light" />
);


const ProposalCard: React.FC<{ proposal: Proposal }> = ({ proposal }) => {
    const { currentUser, castVote } = useCommunity();

    const votes = useMemo(() => ({
        si: proposal.votes.filter(v => v.option === VoteOption.Si).length,
        no: proposal.votes.filter(v => v.option === VoteOption.No).length,
        abstencion: proposal.votes.filter(v => v.option === VoteOption.Abstencion).length,
    }), [proposal.votes]);
    const totalVotes = votes.si + votes.no + votes.abstencion;
    
    const userVote = proposal.votes.find(v => v.userId === currentUser.id)?.option;
    const isExpired = new Date() > proposal.expiresAt;
    const isClosed = proposal.status === 'Cerrada' || isExpired;
    const canVote = !isClosed && !userVote;

    const getButtonVariant = (option: VoteOption) => {
        if (userVote === option) return "primary";
        return "ghost";
    }

    return (
        <Card className="flex flex-col">
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <CardTitle>{proposal.title}</CardTitle>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${isClosed ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {isClosed ? 'Cerrada' : 'Abierta'}
                    </span>
                </div>
                <p className="text-xs text-text-secondary mt-1">
                    Por {proposal.author} - Vence el {proposal.expiresAt.toLocaleDateString('es-ES')}
                </p>
                <p className="text-sm text-text-secondary my-4">{proposal.description}</p>
            </div>

            <div>
                <div className="space-y-2 mb-4">
                    <VoteBar label="Sí" count={votes.si} total={totalVotes} color="bg-green-500" />
                    <VoteBar label="No" count={votes.no} total={totalVotes} color="bg-red-500" />
                    <VoteBar label="Abstención" count={votes.abstencion} total={totalVotes} color="bg-gray-400" />
                </div>
                <div className="flex justify-between items-center border-t pt-4">
                     <div className="flex space-x-2">
                        <Button size-sm="true" variant={getButtonVariant(VoteOption.Si)} onClick={() => castVote(proposal.id, VoteOption.Si)} disabled={isClosed}>Sí</Button>
                        <Button size-sm="true" variant={getButtonVariant(VoteOption.No)} onClick={() => castVote(proposal.id, VoteOption.No)} disabled={isClosed}>No</Button>
                        <Button size-sm="true" variant={getButtonVariant(VoteOption.Abstencion)} onClick={() => castVote(proposal.id, VoteOption.Abstencion)} disabled={isClosed}>Abstención</Button>
                     </div>
                     <span className="text-sm font-semibold">{totalVotes} Votos</span>
                </div>
            </div>
        </Card>
    );
};

const VoteBar: React.FC<{label: string, count: number, total: number, color: string}> = ({ label, count, total, color}) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    return (
        <div>
            <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-semibold">{label}</span>
                <span>{count} ({percentage.toFixed(0)}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`${color} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    )
}

const CreateProposalModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    const { addProposal } = useCommunity();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [expiresAt, setExpiresAt] = useState('');
    const [type, setType] = useState<ProposalType>(ProposalType.Simple);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!title || !description || !expiresAt) {
            alert("Por favor, complete todos los campos.");
            return;
        }
        addProposal({
            title,
            description,
            expiresAt: new Date(expiresAt),
            type,
            author: '', // This will be overwritten by context
        });
        onClose();
        setTitle('');
        setDescription('');
        setExpiresAt('');
        setType(ProposalType.Simple);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Crear Nueva Propuesta">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700">Fecha de Vencimiento</label>
                    <Input id="expiresAt" type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo de Votación</label>
                    <Select id="type" value={type} onChange={(e) => setType(e.target.value as ProposalType)}>
                        {Object.values(ProposalType).map(t => <option key={t} value={t}>{t}</option>)}
                    </Select>
                </div>
            </form>
             <div className="flex items-center justify-end p-4 border-t">
                <div className="flex space-x-2">
                    <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSubmit}>Crear Propuesta</Button>
                </div>
            </div>
        </Modal>
    );
};


const Votaciones: React.FC = () => {
    const { proposals } = useCommunity();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Propuestas de la Comunidad</h2>
                <Button leftIcon="plus" onClick={() => setIsModalOpen(true)}>Crear Propuesta</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {proposals.map((proposal) => (
                    <ProposalCard key={proposal.id} proposal={proposal} />
                ))}
            </div>
            <CreateProposalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Votaciones;
