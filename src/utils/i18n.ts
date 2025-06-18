import { Language, Translations } from '../types';

export const translations: Translations = {
  en: {
    // Header
    'header.title': 'Professional Gantt Chart',
    'header.subtitle': 'Visualize project timelines and manage schedules with our intuitive Gantt chart tool',
    
    // Navigation
    'nav.language': 'Language',
    'nav.theme': 'Theme',
    'nav.themes.light': 'Light',
    'nav.themes.dark': 'Dark',
    'nav.themes.blue': 'Ocean Blue',
    'nav.themes.green': 'Forest Green',
    'nav.themes.purple': 'Royal Purple',
    
    // Stats
    'stats.total': 'Total Projects',
    'stats.scheduled': 'Scheduled',
    'stats.unscheduled': 'Unscheduled',
    
    // Actions
    'actions.exportJson': 'Export JSON',
    'actions.importJson': 'Import JSON',
    'actions.clearAll': 'Clear All',
    'actions.exportImage': 'Export Image',
    'actions.zoomIn': 'Zoom In',
    'actions.zoomOut': 'Zoom Out',
    'actions.zoomReset': 'Reset Zoom',
    
    // Form
    'form.title.add': 'Add New Project',
    'form.title.edit': 'Edit Project',
    'form.projectName': 'Project Name',
    'form.projectName.placeholder': 'Enter project name',
    'form.startDate': 'Start Date',
    'form.endDate': 'End Date',
    'form.description': 'Description',
    'form.description.placeholder': 'Project description (optional)',
    'form.submit.add': 'Add Project',
    'form.submit.save': 'Save Changes',
    'form.cancel': 'Cancel',
    
    // Validation
    'validation.nameRequired': 'Project name is required',
    'validation.dateRequired': 'Please provide at least one date',
    'validation.endBeforeStart': 'End date cannot be earlier than start date',
    
    // Gantt Chart
    'gantt.title': 'Project Timeline',
    'gantt.view': 'View',
    'gantt.view.day': 'Day',
    'gantt.view.week': 'Week',
    'gantt.view.month': 'Month',
    'gantt.projectTimeline': 'Project / Timeline',
    'gantt.zoom': 'Zoom',
    'gantt.empty.title': 'No Projects Yet',
    'gantt.empty.subtitle': 'Add your first project to see it displayed on the timeline',
    'gantt.unscheduled': 'Unscheduled',
    'gantt.open': 'Open',
    
    // Timeline
    'timeline.days': 'days',
    'timeline.weeks': 'weeks',
    'timeline.months': 'months',
    
    // Modal
    'modal.delete.title': 'Delete Project',
    'modal.delete.message': 'Are you sure you want to delete "{name}"? This action cannot be undone.',
    'modal.delete.confirm': 'Delete',
    'modal.delete.cancel': 'Cancel',
    'modal.clearAll.message': 'Are you sure you want to clear all projects? This action cannot be undone.',
    
    // Import/Export
    'import.noProjects': 'No projects to export',
    'import.replaceConfirm': 'Import will replace existing projects. Continue?',
    'import.appendConfirm': 'Add imported projects to existing ones?',
    'import.success': 'Projects imported successfully!',
    'import.error': 'Failed to import projects. Please check the file format.',
    'export.error': 'Failed to export image. Please try again.',
    
    // Footer
    'footer.text': 'Professional Gantt Chart Tool © 2025 | Built with modern web technologies',
    
    // SEO Content
    'seo.features.title': 'Key Features',
    'seo.features.interactive': 'Interactive Timeline Visualization',
    'seo.features.multiView': 'Multiple View Modes (Day/Week/Month)',
    'seo.features.export': 'Export to Image and JSON',
    'seo.features.responsive': 'Fully Responsive Design',
    'seo.features.free': 'Completely Free to Use',
    'seo.benefits.title': 'Why Choose Our Gantt Chart Tool?',
    'seo.benefits.professional': 'Professional-grade project management',
    'seo.benefits.intuitive': 'Intuitive and user-friendly interface',
    'seo.benefits.noSignup': 'No registration or signup required',
    'seo.benefits.dataControl': 'Full control over your project data'
  },
  zh: {
    // Header
    'header.title': '专业甘特图',
    'header.subtitle': '使用我们直观的甘特图工具可视化项目时间线并管理进度',
    
    // Navigation
    'nav.language': '语言',
    'nav.theme': '主题',
    'nav.themes.light': '浅色',
    'nav.themes.dark': '深色',
    'nav.themes.blue': '海洋蓝',
    'nav.themes.green': '森林绿',
    'nav.themes.purple': '皇家紫',
    
    // Stats
    'stats.total': '项目总数',
    'stats.scheduled': '已排期',
    'stats.unscheduled': '未排期',
    
    // Actions
    'actions.exportJson': '导出JSON',
    'actions.importJson': '导入JSON',
    'actions.clearAll': '清空全部',
    'actions.exportImage': '导出图片',
    'actions.zoomIn': '放大',
    'actions.zoomOut': '缩小',
    'actions.zoomReset': '重置缩放',
    
    // Form
    'form.title.add': '添加新项目',
    'form.title.edit': '编辑项目',
    'form.projectName': '项目名称',
    'form.projectName.placeholder': '请输入项目名称',
    'form.startDate': '开始日期',
    'form.endDate': '结束日期',
    'form.description': '项目描述',
    'form.description.placeholder': '项目描述（可选）',
    'form.submit.add': '添加项目',
    'form.submit.save': '保存更改',
    'form.cancel': '取消',
    
    // Validation
    'validation.nameRequired': '项目名称为必填项',
    'validation.dateRequired': '请至少提供一个日期',
    'validation.endBeforeStart': '结束日期不能早于开始日期',
    
    // Gantt Chart
    'gantt.title': '项目时间线',
    'gantt.view': '视图',
    'gantt.view.day': '按日',
    'gantt.view.week': '按周',
    'gantt.view.month': '按月',
    'gantt.projectTimeline': '项目 / 时间线',
    'gantt.zoom': '缩放',
    'gantt.empty.title': '暂无项目',
    'gantt.empty.subtitle': '添加您的第一个项目以在时间线上显示',
    'gantt.unscheduled': '未排期',
    'gantt.open': '待定',
    
    // Timeline
    'timeline.days': '天',
    'timeline.weeks': '周',
    'timeline.months': '月',
    
    // Modal
    'modal.delete.title': '删除项目',
    'modal.delete.message': '确定要删除"{name}"吗？此操作无法撤销。',
    'modal.delete.confirm': '删除',
    'modal.delete.cancel': '取消',
    'modal.clearAll.message': '确定要清空所有项目吗？此操作无法撤销。',
    
    // Import/Export
    'import.noProjects': '没有项目可导出',
    'import.replaceConfirm': '导入将替换现有项目。是否继续？',
    'import.appendConfirm': '将导入的项目添加到现有项目中？',
    'import.success': '项目导入成功！',
    'import.error': '导入项目失败。请检查文件格式。',
    'export.error': '导出图片失败。请重试。',
    
    // Footer
    'footer.text': '专业甘特图工具 © 2025 | 使用现代网络技术构建',
    
    // SEO Content
    'seo.features.title': '主要功能',
    'seo.features.interactive': '交互式时间线可视化',
    'seo.features.multiView': '多种视图模式（日/周/月）',
    'seo.features.export': '导出为图片和JSON',
    'seo.features.responsive': '完全响应式设计',
    'seo.features.free': '完全免费使用',
    'seo.benefits.title': '为什么选择我们的甘特图工具？',
    'seo.benefits.professional': '专业级项目管理',
    'seo.benefits.intuitive': '直观友好的用户界面',
    'seo.benefits.noSignup': '无需注册或登录',
    'seo.benefits.dataControl': '完全控制您的项目数据'
  }
};

export const useTranslation = (language: Language) => {
  const t = (key: string, params?: Record<string, string>): string => {
    let translation = translations[language]?.[key] || translations.en[key] || key;
    
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, value);
      });
    }
    
    return translation;
  };

  return { t };
};