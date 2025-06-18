import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ProjectForm from './components/ProjectForm';
import ProjectStats from './components/ProjectStats';
import ActionBar from './components/ActionBar';
import GanttChart from './components/GanttChart';
import ConfirmModal from './components/ConfirmModal';
import SEOContent from './components/SEOContent';
import { Project, ViewMode, ProjectStats as StatsType, Language, Theme } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTranslation } from './utils/i18n';
import { applyTheme } from './utils/themes';
import { Mail } from 'lucide-react';

function App() {
  const [projects, setProjects] = useLocalStorage<Project[]>('gantt-projects', []);
  const [language, setLanguage] = useLocalStorage<Language>('gantt-language', 'en');
  const [theme, setTheme] = useLocalStorage<Theme>('gantt-theme', 'light');
  const [viewMode, setViewMode] = useState<ViewMode>('day');
  const [zoom, setZoom] = useState(1);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    projectId: number | null;
    projectName: string;
  }>({
    isOpen: false,
    projectId: null,
    projectName: ''
  });
  const [showContact, setShowContact] = useState(false);

  const { t } = useTranslation(language);

  // Apply theme on mount and theme change
  useEffect(() => {
    applyTheme(theme);
    
    // Update HTML lang attribute
    document.documentElement.lang = language;
    
    // Update page title based on language
    document.title = language === 'zh' 
      ? '专业甘特图 - 免费在线项目时间线管理工具'
      : 'Professional Gantt Chart - Free Online Project Timeline Management Tool';
      
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        language === 'zh'
          ? '使用我们免费的专业甘特图工具创建精美的项目时间线。可视化项目进度，管理截止日期，跟踪进展。无需注册。'
          : 'Create stunning project timelines with our free professional Gantt chart tool. Visualize project schedules, manage deadlines, and track progress with intuitive drag-and-drop interface. No registration required.'
      );
    }
  }, [theme, language]);

  const stats: StatsType = useMemo(() => {
    const total = projects.length;
    const planned = projects.filter(p => p.startDate && p.endDate).length;
    const unplanned = total - planned;
    
    return { total, planned, unplanned };
  }, [projects]);

  const handleAddProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now() + Math.random()
    };
    setProjects(prev => [...prev, newProject]);
  };

  const handleUpdateProject = (id: number, projectData: Omit<Project, 'id'>) => {
    setProjects(prev => 
      prev.map(p => p.id === id ? { ...projectData, id } : p)
    );
    setEditingProject(null);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    // Scroll to form
    document.getElementById('project-form')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  const handleDeleteProject = (id: number) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      setDeleteModal({
        isOpen: true,
        projectId: id,
        projectName: project.name
      });
    }
  };

  const confirmDelete = () => {
    if (deleteModal.projectId !== null) {
      setProjects(projects.filter((p: Project) => p.id !== deleteModal.projectId));
      setDeleteModal({ isOpen: false, projectId: null, projectName: '' });
      // 如果正在编辑被删除的项目，取消编辑
      if (editingProject?.id === deleteModal.projectId) {
        setEditingProject(null);
      }
    }
  };

  const handleClearAll = () => {
    setProjects([]);
    setEditingProject(null);
  };

  const handleImportProjects = (importedProjects: Project[]) => {
    // 为每个导入的项目分配唯一 id，防止 key 冲突和批量操作异常
    const projectsWithUniqueId = importedProjects.map(p => ({ ...p, id: Date.now() + Math.random() }));
    setProjects(projectsWithUniqueId);
    setEditingProject(null);
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-7xl mx-auto mobile-container py-4 sm:py-6">
        <Header 
          language={language}
          theme={theme}
          onLanguageChange={handleLanguageChange}
          onThemeChange={handleThemeChange}
          t={t}
        />
        
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mobile-gap">
            <ProjectStats stats={stats} t={t} />
            <ActionBar
              projects={projects}
              onClearAll={handleClearAll}
              onImportProjects={handleImportProjects}
              zoom={zoom}
              onZoomChange={setZoom}
              t={t}
            />
          </div>

          <div id="project-form">
            <ProjectForm
              onSubmit={handleAddProject}
              onUpdate={handleUpdateProject}
              editingProject={editingProject}
              onCancelEdit={handleCancelEdit}
              t={t}
            />
          </div>

          <GanttChart
            projects={projects}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
            zoom={zoom}
            t={t}
          />
        </div>

        {/* SEO Content */}
        <SEOContent t={t} />

        <footer className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t text-center mobile-text" style={{ borderColor: 'var(--color-border)', color: 'var(--color-textLight)' }}>
          <p>{t('footer.text')}</p>
        </footer>
      </div>

      {/* 联系我浮窗 */}
      <div
        className="fixed right-4 bottom-4 z-50"
        onMouseEnter={() => setShowContact(true)}
        onMouseLeave={() => setShowContact(false)}
      >
        <button className="contact-fab focus:outline-none">
          <Mail className="w-7 h-7 text-white" />
        </button>
        {showContact && (
          <div className="contact-card absolute right-0 bottom-20">
            <Mail className="w-6 h-6 text-blue-500 flex-shrink-0" />
            <div>
              <div className="font-semibold mb-1">{t('footer.contact')}</div>
              <a href="mailto:vairfly@gmail.com" className="text-blue-600 hover:underline font-medium break-all">vairfly@gmail.com</a>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, projectId: null, projectName: '' })}
        onConfirm={confirmDelete}
        title={t('modal.delete.title')}
        message={t('modal.delete.message', { name: deleteModal.projectName })}
        confirmText={t('modal.delete.confirm')}
        cancelText={t('modal.delete.cancel')}
        danger={true}
      />
    </div>
  );
}

export default App;