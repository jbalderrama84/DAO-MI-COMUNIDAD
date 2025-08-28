
export enum Page {
  Dashboard = 'dashboard',
  Actividades = 'actividades',
  Votaciones = 'votaciones',
  Informes = 'informes',
  Biblioteca = 'biblioteca',
  Usuarios = 'usuarios',
  Activos = 'activos',
  Finanzas = 'finanzas',
  InformeEconomico = 'informe-economico',
}

export interface User {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
}

export enum VoteOption {
  Si = 'si',
  No = 'no',
  Abstencion = 'abstencion'
}

export interface Vote {
  userId: string;
  option: VoteOption;
}

export enum ProposalType {
    Simple = 'Simple',
    Mayoritario = 'Mayoritario',
    Ponderado = 'Ponderado'
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  type: ProposalType;
  author: string;
  createdAt: Date;
  expiresAt: Date;
  votes: Vote[];
  status: 'Abierta' | 'Cerrada';
}

export interface Activity {
  id: string;
  date: Date;
  title: string;
  location: string;
  status: 'Programada' | 'Realizada' | 'Cancelada';
}

export interface CommunityFile {
  id: string;
  name: string;
  type: 'PDF' | 'XLSX' | 'DOCX' | 'Folder';
  size: string;
  lastModified: Date;
}

export enum AssetCategory {
  Infraestructura = 'Infraestructura',
  Tierra = 'Tierra',
  Herramienta = 'Herramienta',
  Vehiculo = 'Vehículo',
  Otros = 'Otros'
}

export interface CommunityAsset {
  id: string;
  name: string;
  category: AssetCategory;
  responsible: string;
  location: string;
  value: number;
}

export enum TransactionType {
  Ingreso = 'Ingreso',
  Egreso = 'Egreso'
}

export interface FinancialRecord {
  id: string;
  date: Date;
  concept: string;
  type: TransactionType;
  amount: number;
}
