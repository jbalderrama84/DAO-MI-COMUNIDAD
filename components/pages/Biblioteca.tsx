
import React from 'react';
import { useCommunity } from '../../context/CommunityContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Icon from '../icons';

const fileTypeIcon = (type: string): React.ComponentProps<typeof Icon>['name'] => {
    switch(type) {
        case 'PDF': return 'fileText';
        case 'XLSX': return 'barChart2';
        case 'Folder': return 'folderPlus';
        default: return 'fileText';
    }
}

const Biblioteca: React.FC = () => {
    const { files } = useCommunity();

    return (
         <Card>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Biblioteca de Documentos</h2>
                <div className="flex space-x-2">
                    <Button leftIcon="folderPlus" variant="ghost">Crear Carpeta</Button>
                    <Button leftIcon="fileUp">Subir Archivo</Button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-text-secondary">
                    <thead className="text-xs text-text-secondary uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nombre</th>
                            <th scope="col" className="px-6 py-3">Tamaño</th>
                            <th scope="col" className="px-6 py-3">Última Modificación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file) => (
                            <tr key={file.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-text-primary">
                                    <div className="flex items-center">
                                        <Icon name={fileTypeIcon(file.type)} className="w-5 h-5 mr-3 text-primary" />
                                        {file.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4">{file.size}</td>
                                <td className="px-6 py-4">{file.lastModified.toLocaleDateString('es-ES')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default Biblioteca;
