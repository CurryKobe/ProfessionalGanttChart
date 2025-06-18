import React, { useState, useEffect } from 'react';
import { Plus, Save } from 'lucide-react';
import { Project } from '../types';
import { formatDate } from '../utils/dateUtils';

interface ProjectFormProps {
  onSubmit: (project: Omit<Project, 'id'>) => void;
  onUpdate: (id: number, project: Omit<Project, 'id'>) => void;
  editingProject: Project | null;
  onCancelEdit: () => void;
  t: (key: string) => string;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  onSubmit,
  onUpdate,
  editingProject,
  onCancelEdit,
  t
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'feature' as Project['type'],
    startDate: '',
    endDate: '',
    description: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingProject) {
      setFormData({
        name: editingProject.name,
        type: editingProject.type,
        startDate: editingProject.startDate,
        endDate: editingProject.endDate,
        description: editingProject.description || ''
      });
    } else {
      // Set default dates for new projects
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      
      setFormData({
        name: '',
        type: 'feature',
        startDate: formatDate(today),
        endDate: formatDate(nextWeek),
        description: ''
      });
    }
    setErrors({});
  }, [editingProject]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('validation.nameRequired');
    }

    if (!formData.startDate && !formData.endDate) {
      newErrors.startDate = t('validation.dateRequired');
      newErrors.endDate = t('validation.dateRequired');
    }

    if (formData.startDate && formData.endDate && 
        new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = t('validation.endBeforeStart');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const projectData = {
      name: formData.name.trim(),
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description.trim()
    };

    if (editingProject) {
      onUpdate(editingProject.id, projectData);
    } else {
      onSubmit(projectData);
    }

    // Reset form for new projects
    if (!editingProject) {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      
      setFormData({
        name: '',
        type: 'feature',
        startDate: formatDate(today),
        endDate: formatDate(nextWeek),
        description: ''
      });
    }
  };

  const handleCancel = () => {
    onCancelEdit();
    setErrors({});
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <Plus className="w-4 h-4 text-blue-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">
          {editingProject ? t('form.title.edit') : t('form.title.add')}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.projectName')}
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-colors"
            placeholder={t('form.projectName.placeholder')}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.startDate')}
            </label>
            <input
              type="date"
              id="startDate"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-colors"
            />
            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.endDate')}
            </label>
            <input
              type="date"
              id="endDate"
              value={formData.endDate}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-colors"
            />
            {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.description')}
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-colors"
            placeholder={t('form.description.placeholder')}
            rows={3}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {editingProject ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {editingProject ? t('form.submit.save') : t('form.submit.add')}
          </button>
          
          {editingProject && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
            >
              {t('form.cancel')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;