
import { User, Proposal, VoteOption, ProposalType, Activity, CommunityFile, AssetCategory, CommunityAsset, FinancialRecord, TransactionType } from '../types';

export const currentUser: User = {
  id: 'user-1',
  name: 'Juan Quispe',
  role: 'Vecino',
  avatarUrl: 'https://picsum.photos/seed/juan/100/100',
};

export const mockUsers: User[] = [
  currentUser,
  { id: 'user-2', name: 'Maria Mamani', role: 'Autoridad', avatarUrl: 'https://picsum.photos/seed/maria/100/100' },
  { id: 'user-3', name: 'Carlos Condori', role: 'Vecino', avatarUrl: 'https://picsum.photos/seed/carlos/100/100' },
  { id: 'user-4', name: 'Ana Flores', role: 'Secretaria', avatarUrl: 'https://picsum.photos/seed/ana/100/100' },
];

export const mockProposals: Proposal[] = [
  {
    id: 'prop-1',
    title: 'Compra de nuevo tractor comunitario',
    description: 'Se propone la adquisición de un tractor modelo John Deere 5075E para mejorar la productividad agrícola de la comunidad.',
    type: ProposalType.Mayoritario,
    author: 'Maria Mamani',
    createdAt: new Date('2024-07-15T10:00:00Z'),
    expiresAt: new Date('2024-08-20T23:59:59Z'),
    status: 'Abierta',
    votes: [
      { userId: 'user-2', option: VoteOption.Si },
      { userId: 'user-3', option: VoteOption.Si },
    ],
  },
  {
    id: 'prop-2',
    title: 'Reparación del techo del salón comunal',
    description: 'El techo del salón presenta goteras. Se solicita aprobar un presupuesto de 5000 Bs. para su reparación inmediata.',
    type: ProposalType.Simple,
    author: 'Carlos Condori',
    createdAt: new Date('2024-07-10T09:00:00Z'),
    expiresAt: new Date('2024-07-12T23:59:59Z'),
    status: 'Cerrada',
    votes: [
      { userId: 'user-1', option: VoteOption.Si },
      { userId: 'user-2', option: VoteOption.Si },
      { userId: 'user-3', option: VoteOption.Si },
      { userId: 'user-4', option: VoteOption.Abstencion },
    ],
  },
   {
    id: 'prop-3',
    title: 'Organización de la feria anual de productos',
    description: 'Definir la fecha y el comité organizador para la feria anual de productos locales.',
    type: ProposalType.Simple,
    author: 'Ana Flores',
    createdAt: new Date('2024-06-20T14:00:00Z'),
    expiresAt: new Date('2024-07-30T23:59:59Z'),
    status: 'Abierta',
    votes: [
       { userId: 'user-4', option: VoteOption.Si },
    ],
  },
];

export const mockActivities: Activity[] = [
    { id: 'act-1', date: new Date('2024-08-15T10:00:00Z'), title: 'Asamblea General Ordinaria', location: 'Salón Comunal', status: 'Programada' },
    { id: 'act-2', date: new Date('2024-08-25T08:00:00Z'), title: 'Jornada de limpieza de canales', location: 'Río Principal', status: 'Programada' },
    { id: 'act-3', date: new Date('2024-07-20T14:00:00Z'), title: 'Taller de capacitación en siembra', location: 'Salón Comunal', status: 'Realizada' },
];

export const mockFiles: CommunityFile[] = [
    { id: 'file-1', name: 'Estatuto Orgánico.pdf', type: 'PDF', size: '1.2 MB', lastModified: new Date('2023-01-15') },
    { id: 'file-2', name: 'Acta de Fundación.pdf', type: 'PDF', size: '800 KB', lastModified: new Date('2020-05-20') },
    { id: 'file-3', name: 'Presupuesto 2024.xlsx', type: 'XLSX', size: '250 KB', lastModified: new Date('2024-02-10') },
    { id: 'file-4', name: 'Actas de Asamblea', type: 'Folder', size: '15 archivos', lastModified: new Date('2024-07-15') },
];

export const mockAssets: CommunityAsset[] = [
    { id: 'asset-1', name: 'Salón Comunal', category: AssetCategory.Infraestructura, responsible: 'Maria Mamani', location: 'Plaza Principal', value: 150000 },
    { id: 'asset-2', name: 'Tractor Fiat 400', category: AssetCategory.Vehiculo, responsible: 'Carlos Condori', location: 'Galpón', value: 80000 },
    { id: 'asset-3', name: 'Terreno Comunitario "La Pradera"', category: AssetCategory.Tierra, responsible: 'Comunidad', location: 'Norte', value: 250000 },
    { id: 'asset-4', name: 'Kit de herramientas manuales', category: AssetCategory.Herramienta, responsible: 'Juan Quispe', location: 'Depósito', value: 3500 },
];

export const mockFinancialRecords: FinancialRecord[] = [
    { id: 'fin-1', date: new Date('2024-07-01'), concept: 'Aporte mensual de socios', type: TransactionType.Ingreso, amount: 2500 },
    { id: 'fin-2', date: new Date('2024-07-05'), concept: 'Compra de combustible para tractor', type: TransactionType.Egreso, amount: 450 },
    { id: 'fin-3', date: new Date('2024-07-10'), concept: 'Pago servicio de electricidad', type: TransactionType.Egreso, amount: 250 },
    { id: 'fin-4', date: new Date('2024-07-15'), concept: 'Alquiler de salón comunal', type: TransactionType.Ingreso, amount: 500 },
    { id: 'fin-5', date: new Date('2024-06-01'), concept: 'Aporte mensual de socios', type: TransactionType.Ingreso, amount: 2400 },
    { id: 'fin-6', date: new Date('2024-06-08'), concept: 'Reparación de bomba de agua', type: TransactionType.Egreso, amount: 800 },
    { id: 'fin-7', date: new Date('2024-05-01'), concept: 'Aporte mensual de socios', type: TransactionType.Ingreso, amount: 2600 },
    { id: 'fin-8', date: new Date('2024-05-12'), concept: 'Compra de semillas', type: TransactionType.Egreso, amount: 1200 },
];
