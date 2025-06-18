import React from 'react';
import { Trash2, Download, Upload, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Project } from '../types';
import { exportToJSON, importFromJSON } from '../utils/exportUtils';

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
        const importedProjects = await importFromJSON(file);
        
        if (projects.length > 0) {
          const shouldReplace = confirm(t('import.replaceConfirm'));
          if (!shouldReplace) {
            const shouldAppend = confirm(t('import.appendConfirm'));
            if (shouldAppend) {
              onImportProjects([...projects, ...importedProjects]);
            }
            return;
          }
        }
        
        onImportProjects(importedProjects);
        alert(t('import.success'));
      } catch (error) {
        alert(t('import.error'));
        console.error('Import error:', error);
      }
    };
    
    input.click();
  };

  const handleClearAll = () => {
    if (projects.length === 0) return;
    
    if (confirm(t('modal.clearAll.message'))) {
      onClearAll();
    }
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

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleExportJSON}
          disabled={projects.length === 0}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          {t('actions.exportJson')}
        </button>
        
        <button
          onClick={handleImportJSON}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          <Upload className="w-4 h-4" />
          {t('actions.importJson')}
        </button>
        
        <button
          onClick={handleClearAll}
          disabled={projects.length === 0}
          className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="w-4 h-4" />
          {t('actions.clearAll')}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 0.5}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title={t('actions.zoomOut')}
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        
        <button
          onClick={handleZoomReset}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          title={t('actions.zoomReset')}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        
        <button
          onClick={handleZoomIn}
          disabled={zoom >= 2}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title={t('actions.zoomIn')}
        >
          <ZoomIn className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ActionBar;