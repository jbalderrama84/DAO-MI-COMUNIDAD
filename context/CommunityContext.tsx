
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
    User, Proposal, Activity, CommunityFile, CommunityAsset, FinancialRecord, Vote, VoteOption
} from '../types';
import { 
    mockUsers, mockProposals, mockActivities, mockFiles, mockAssets, mockFinancialRecords, currentUser 
} from '../data/mockData';

interface CommunityContextType {
    currentUser: User;
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    proposals: Proposal[];
    setProposals: React.Dispatch<React.SetStateAction<Proposal[]>>;
    activities: Activity[];
    setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
    files: CommunityFile[];
    setFiles: React.Dispatch<React.SetStateAction<CommunityFile[]>>;
    assets: CommunityAsset[];
    setAssets: React.Dispatch<React.SetStateAction<CommunityAsset[]>>;
    financialRecords: FinancialRecord[];
    setFinancialRecords: React.Dispatch<React.SetStateAction<FinancialRecord[]>>;
    castVote: (proposalId: string, option: VoteOption) => void;
    addProposal: (proposal: Omit<Proposal, 'id' | 'createdAt' | 'votes' | 'status'>) => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const CommunityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [proposals, setProposals] = useState<Proposal[]>(mockProposals);
    const [activities, setActivities] = useState<Activity[]>(mockActivities);
    const [files, setFiles] = useState<CommunityFile[]>(mockFiles);
    const [assets, setAssets] = useState<CommunityAsset[]>(mockAssets);
    const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>(mockFinancialRecords);

    const castVote = (proposalId: string, option: VoteOption) => {
        setProposals(prevProposals => 
            prevProposals.map(p => {
                if (p.id === proposalId) {
                    const existingVoteIndex = p.votes.findIndex(v => v.userId === currentUser.id);
                    const newVotes = [...p.votes];
                    if (existingVoteIndex !== -1) {
                        newVotes.splice(existingVoteIndex, 1);
                    }
                    newVotes.push({ userId: currentUser.id, option });
                    return { ...p, votes: newVotes };
                }
                return p;
            })
        );
    };

    const addProposal = (proposalData: Omit<Proposal, 'id' | 'createdAt' | 'votes' | 'status'>) => {
        const newProposal: Proposal = {
            ...proposalData,
            id: `prop-${Date.now()}`,
            createdAt: new Date(),
            votes: [],
            status: 'Abierta',
            author: currentUser.name,
        };
        setProposals(prev => [newProposal, ...prev]);
    };

    const value = {
        currentUser,
        users,
        setUsers,
        proposals,
        setProposals,
        activities,
        setActivities,
        files,
        setFiles,
        assets,
        setAssets,
        financialRecords,
        setFinancialRecords,
        castVote,
        addProposal
    };

    return (
        <CommunityContext.Provider value={value}>
            {children}
        </CommunityContext.Provider>
    );
};

export const useCommunity = (): CommunityContextType => {
    const context = useContext(CommunityContext);
    if (context === undefined) {
        throw new Error('useCommunity must be used within a CommunityProvider');
    }
    return context;
};
