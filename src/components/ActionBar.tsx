import React from 'react';
import { Trash2, Download, Upload, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Project } from '../types';
import { exportToJSON, importFromJSON } from '../utils/exportUtils';
import ConfirmModal from './ConfirmModal';
import Toast from './Toast';

interface ActionBarProps {
  projects: Project[];
  onClearAll: () => void;
  onImportProjects: (projects: Project[]) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  t: (key: string) => string;
}

const ActionBar: React.FC<ActionBarProps> = ({
  projects,
  onClearAll,
  onImportProjects,
  zoom,
  onZoomChange,
  t
}) => {
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [importedProjects, setImportedProjects] = React.useState<Project[] | null>(null);
  const [showImportReplaceModal, setShowImportReplaceModal] = React.useState(false);
  const [showImportAppendModal, setShowImportAppendModal] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  const handleExportJSON = () => {
    if (projects.length === 0) {
      alert(t('import.noProjects'));
      return;
    }
    exportToJSON(projects);
  };

  const handleImportJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const imported = await importFromJSON(file);
        if (projects.length > 0) {
          setImportedProjects(imported);
          setShowImportReplaceModal(true);
          return;
        }
        onImportProjects(imported);
        setShowToast(true);
      } catch (error) {
        alert(t('import.error'));
        console.error('Import error:', error);
      }
    };
    
    input.click();
  };

  const handleClearAll = () => {
    if (projects.length === 0) return;
    setShowConfirm(true);
  };

  const handleZoomIn = () => {
    if (zoom < 2) {
      onZoomChange(Math.min(zoom + 0.1, 2));
    }
  };

  const handleZoomOut = () => {
    if (zoom > 0.5) {
      onZoomChange(Math.max(zoom - 0.1, 0.5));
    }
  };

  const handleZoomReset = () => {
    onZoomChange(1);
  };

  React.useEffect(() => {
    if (!showImportReplaceModal && importedProjects) {
      setTimeout(() => setShowImportAppendModal(true), 0);
    }
    // eslint-disable-next-line
  }, [showImportReplaceModal]);

  React.useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mobile-gap mb-4 sm:mb-6">
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <button
          onClick={handleExportJSON}
          disabled={projects.length === 0}
          className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed mobile-text"
        >
          <Download className="w-5 h-5 mr-2" />
          <span>{t('actions.exportJson')}</span>
        </button>
        
        <button
          onClick={handleImportJSON}
          className="btn btn-secondary mobile-text"
        >
          <Upload className="w-5 h-5 mr-2" />
          <span>{t('actions.importJson')}</span>
        </button>
        
        <button
          onClick={handleClearAll}
          disabled={projects.length === 0}
          className="btn btn-danger disabled:opacity-50 disabled:cursor-not-allowed mobile-text"
        >
          <Trash2 className="w-5 h-5 mr-2" />
          <span>{t('actions.clearAll')}</span>
        </button>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 0.5}
          className="btn-icon disabled:opacity-50 disabled:cursor-not-allowed"
          title={t('actions.zoomOut')}
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        
        <button
          onClick={handleZoomReset}
          className="btn-icon"
          title={t('actions.zoomReset')}
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        
        <button
          onClick={handleZoomIn}
          disabled={zoom >= 2}
          className="btn-icon disabled:opacity-50 disabled:cursor-not-allowed"
          title={t('actions.zoomIn')}
        >
          <ZoomIn className="w-5 h-5" />
        </button>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => { setShowConfirm(false); onClearAll(); }}
        title={t('modal.clearAll.title') || t('actions.clearAll')}
        message={t('modal.clearAll.message')}
        confirmText={t('modal.delete.confirm')}
        cancelText={t('modal.delete.cancel')}
        danger={true}
      />

      <ConfirmModal
        isOpen={showImportReplaceModal}
        onClose={() => { setShowImportReplaceModal(false); setImportedProjects(null); }}
        onConfirm={() => {
          if (importedProjects) {
            onImportProjects(importedProjects);
            setImportedProjects(null);
            setShowImportReplaceModal(false);
            setShowToast(true);
          }
        }}
        title={t('import.replaceConfirm')}
        message={t('import.replaceConfirm')}
        confirmText={t('modal.delete.confirm')}
        cancelText={t('modal.delete.cancel')}
        danger={true}
      />

      <ConfirmModal
        isOpen={showImportAppendModal}
        onClose={() => { setShowImportAppendModal(false); setImportedProjects(null); }}
        onConfirm={() => {
          if (importedProjects) {
            onImportProjects([...projects, ...importedProjects]);
            setImportedProjects(null);
            setShowImportAppendModal(false);
            setShowToast(true);
          }
        }}
        title={t('import.appendConfirm')}
        message={t('import.appendConfirm')}
        confirmText={t('modal.delete.confirm')}
        cancelText={t('modal.delete.cancel')}
        danger={false}
      />

      <Toast show={showToast} message={t('import.success')} />
    </div>
  );
};

export default ActionBar;