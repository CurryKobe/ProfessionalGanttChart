import React, { useState, useEffect } from 'react';
import { Plus, Save } from 'lucide-react';
import { Project } from '../types';
import { formatDate } from '../utils/dateUtils';
import { DatePicker, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'antd/dist/reset.css';

interface ProjectFormProps {
  onSubmit: (project: Omit<Project, 'id'>) => void;
  onUpdate: (id: number, project: Omit<Project, 'id'>) => void;
  editingProject: Project | null;
  onCancelEdit: () => void;
  t: (key: string) => string;
  language?: string;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  onSubmit,
  onUpdate,
  editingProject,
  onCancelEdit,
  t,
  language = 'zh',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'feature' as Project['type'],
    startDate: '',
    endDate: '',
    description: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    if (editingProject) {
      setDateRange([
        editingProject.startDate ? dayjs(editingProject.startDate) : null,
        editingProject.endDate ? dayjs(editingProject.endDate) : null
      ]);
      setFormData({
        name: editingProject.name,
        type: editingProject.type,
        startDate: editingProject.startDate,
        endDate: editingProject.endDate,
        description: editingProject.description || ''
      });
    } else {
      const today = dayjs();
      const nextWeek = today.add(7, 'day');
      setDateRange([today, nextWeek]);
      setFormData({
        name: '',
        type: 'feature',
        startDate: today.format('YYYY/MM/DD'),
        endDate: nextWeek.format('YYYY/MM/DD'),
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

    if (!startDate && !endDate) {
      newErrors.startDate = t('validation.dateRequired');
      newErrors.endDate = t('validation.dateRequired');
    }

    if (startDate && endDate && startDate.isAfter(endDate)) {
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
      startDate: startDate ? startDate.format('YYYY/MM/DD') : '',
      endDate: endDate ? endDate.format('YYYY/MM/DD') : '',
      description: formData.description.trim()
    };

    if (editingProject) {
      onUpdate(editingProject.id, projectData);
    } else {
      onSubmit(projectData);
    }

    if (!editingProject) {
      const today = dayjs();
      const nextWeek = today.add(7, 'day');
      setDateRange([today, nextWeek]);
      setFormData({
        name: '',
        type: 'feature',
        startDate: today.format('YYYY/MM/DD'),
        endDate: nextWeek.format('YYYY/MM/DD'),
        description: ''
      });
    }
  };

  const handleCancel = () => {
    onCancelEdit();
    setErrors({});
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 mobile-padding mb-4 sm:mb-6 shadow-md">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100">
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
        </div>
        <h2 className="mobile-heading font-semibold text-gray-800">
          {editingProject ? t('form.title.edit') : t('form.title.add')}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.projectName')}
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full border-2 border-blue-200 rounded-xl shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-400 bg-gray-50 transition-all text-base sm:text-lg px-4 py-3 font-medium placeholder-gray-400"
            placeholder={t('form.projectName.placeholder')}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.startDate')}
            </label>
            <ConfigProvider locale={language === 'zh' ? zhCN : enUS}>
              <DatePicker
                id="startDate"
                value={startDate}
                onChange={date => setDateRange([date, endDate])}
                format="YYYY/MM/DD"
                allowClear={true}
                className="w-full !rounded-xl !shadow !border-blue-200 !h-12 !text-base !px-4 !py-3"
                placeholder={t('form.startDate')}
                style={{ background: '#f8fafc', borderColor: '#4f8cff' }}
                popupClassName="antd-date-popup"
                dateRender={date => <div className="rounded-xl px-2 py-1">{dayjs(date).date()}</div>}
              />
            </ConfigProvider>
            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
              {t('form.endDate')}
            </label>
            <ConfigProvider locale={language === 'zh' ? zhCN : enUS}>
              <DatePicker
                id="endDate"
                value={endDate}
                onChange={date => setDateRange([startDate, date])}
                format="YYYY/MM/DD"
                allowClear={true}
                className="w-full !rounded-xl !shadow !border-blue-200 !h-12 !text-base !px-4 !py-3"
                placeholder={t('form.endDate')}
                style={{ background: '#f8fafc', borderColor: '#4f8cff' }}
                popupClassName="antd-date-popup"
                dateRender={date => <div className="rounded-xl px-2 py-1">{dayjs(date).date()}</div>}
              />
            </ConfigProvider>
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
            className="w-full border-2 border-blue-200 rounded-xl shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-400 bg-gray-50 transition-all text-base sm:text-lg px-4 py-3 font-medium placeholder-gray-400"
            placeholder={t('form.description.placeholder')}
            rows={3}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            className="btn btn-primary w-full sm:w-auto"
          >
            {editingProject ? <Save className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
            {editingProject ? t('form.submit.save') : t('form.submit.add')}
          </button>
          
          {editingProject && (
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary w-full sm:w-auto"
            >
              {t('form.submit.cancel')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;