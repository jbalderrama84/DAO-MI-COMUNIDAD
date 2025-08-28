
import React from 'react';
import Icon from '../icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <Icon name="x" className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        {footer && (
          <div className="flex items-center justify-end p-4 border-t">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
