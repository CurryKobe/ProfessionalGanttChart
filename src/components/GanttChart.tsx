import React from 'react';
import { Edit2, Trash2, Download } from 'lucide-react';
import { Project, ViewMode, TimeUnit } from '../types';
import { 
  generateDateRange, 
  generateWeekRange, 
  generateMonthRange,
  formatDisplayDate,
  isToday,
  isTodayInRange,
  getProjectPosition 
} from '../utils/dateUtils';
import { exportToImage } from '../utils/exportUtils';

interface GanttChartProps {
  projects: Project[];
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: number) => void;
  zoom: number;
  t: (key: string) => string;
}

const GanttChart: React.FC<GanttChartProps> = ({
  projects,
  viewMode,
  onViewModeChange,
  onEditProject,
  onDeleteProject,
  zoom,
  t
}) => {
  const getTimelineData = () => {
    if (projects.length === 0) {
      const today = new Date();
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + 90);
      return { minDate: today, maxDate: futureDate };
    }

    const validDates = projects.flatMap(p => [
      p.startDate ? new Date(p.startDate) : null,
      p.endDate ? new Date(p.endDate) : null
    ]).filter(Boolean) as Date[];

    if (validDates.length === 0) {
      const today = new Date();
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + 90);
      return { minDate: today, maxDate: futureDate };
    }

    const minDate = new Date(Math.min(...validDates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...validDates.map(d => d.getTime())));

    // Add padding
    minDate.setDate(minDate.getDate() - 30);
    maxDate.setDate(maxDate.getDate() + 60);

    return { minDate, maxDate };
  };

  const { minDate, maxDate } = getTimelineData();

  const getTimeUnits = () => {
    switch (viewMode) {
      case 'day':
        return generateDateRange(minDate, maxDate);
      case 'week':
        return generateWeekRange(minDate, maxDate);
      case 'month':
        return generateMonthRange(minDate, maxDate);
      default:
        return generateDateRange(minDate, maxDate);
    }
  };

  const timeUnits = getTimeUnits();

  const handleExportImage = async () => {
    try {
      await exportToImage('gantt-chart-content');
    } catch (error) {
      console.error('Export failed:', error);
      alert(t('export.error'));
    }
  };

  const getColumnWidth = () => {
    const baseWidth = viewMode === 'day' ? 60 : viewMode === 'week' ? 120 : 180;
    return Math.max(baseWidth * zoom, baseWidth * 0.7);
  };

  const columnWidth = getColumnWidth();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <Download className="w-4 h-4 text-green-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">{t('gantt.title')}</h2>
        </div>
        
        <button
          onClick={handleExportImage}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
        >
          <Download className="w-4 h-4" />
          {t('actions.exportImage')}
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
        <span className="text-sm font-medium text-gray-700">{t('gantt.view')}:</span>
        {(['day', 'week', 'month'] as ViewMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => onViewModeChange(mode)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              viewMode === mode
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {t(`gantt.view.${mode}`)}
          </button>
        ))}
      </div>

      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>
            {timeUnits.length} {t(`timeline.${viewMode === 'day' ? 'days' : viewMode === 'week' ? 'weeks' : 'months'}`)}
          </span>
          <span>
            {minDate.toLocaleDateString()} - {maxDate.toLocaleDateString()}
          </span>
        </div>
      </div>

      <div id="gantt-chart-container" className="min-h-96">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Download className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">{t('gantt.empty.title')}</h3>
            <p className="text-sm text-center max-w-sm">
              {t('gantt.empty.subtitle')}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div id="gantt-chart-content" className="min-w-full">
              {/* Timeline Header */}
              <div className="flex border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="w-48 flex-shrink-0 px-4 py-3 font-medium text-gray-700 border-r border-gray-200">
                  {t('gantt.projectTimeline')}
                </div>
                <div className="flex">
                  {timeUnits.map((unit, index) => {
                    const isCurrentPeriod = viewMode === 'day' 
                      ? isToday(unit as Date)
                      : isTodayInRange((unit as TimeUnit).start, (unit as TimeUnit).end);
                    
                    return (
                      <div
                        key={index}
                        className={`flex-shrink-0 px-2 py-3 text-xs text-center border-r border-gray-200 ${
                          isCurrentPeriod ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600'
                        }`}
                        style={{ width: `${columnWidth}px` }}
                      >
                        {viewMode === 'day' 
                          ? formatDisplayDate(unit as Date)
                          : (unit as TimeUnit).label
                        }
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Project Rows */}
              <div className="divide-y divide-gray-100">
                {projects.map((project) => {
                  const position = getProjectPosition(project, timeUnits, viewMode);
                  const isUnplanned = !project.startDate && !project.endDate;
                  
                  return (
                    <div key={project.id} className="flex hover:bg-gray-50 transition-colors group">
                      <div className="w-48 flex-shrink-0 px-4 py-6 border-r border-gray-200">
                        <div className="text-sm font-medium text-gray-800 mb-1">
                          {project.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {project.startDate && project.endDate
                            ? `${new Date(project.startDate).toLocaleDateString()} - ${new Date(project.endDate).toLocaleDateString()}`
                            : project.startDate
                            ? `${new Date(project.startDate).toLocaleDateString()} - ${t('gantt.open')}`
                            : project.endDate
                            ? `${t('gantt.open')} - ${new Date(project.endDate).toLocaleDateString()}`
                            : t('gantt.unscheduled')
                          }
                        </div>
                      </div>
                      
                      <div className="flex-1 relative py-6" style={{ minWidth: `${timeUnits.length * columnWidth}px` }}>
                        <div
                          className={`absolute top-1/2 transform -translate-y-1/2 h-6 rounded-md cursor-pointer transition-all ${
                            isUnplanned
                              ? 'bg-gray-200 border-2 border-dashed border-gray-300'
                              : 'bg-blue-500 hover:bg-blue-600'
                          }`}
                          style={{
                            left: `${position.left}%`,
                            width: `${position.width}%`,
                            minWidth: isUnplanned ? '60px' : '10px'
                          }}
                          title={`${project.name}\n${project.startDate || 'No start'} - ${project.endDate || 'No end'}`}
                        />
                        
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <button
                            onClick={() => onEditProject(project)}
                            className="w-6 h-6 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition-colors"
                          >
                            <Edit2 className="w-3 h-3 text-gray-600" />
                          </button>
                          <button
                            onClick={() => onDeleteProject(project.id)}
                            className="w-6 h-6 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
                          >
                            <Trash2 className="w-3 h-3 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
          <span className="text-sm text-gray-600">
            {t('gantt.zoom')}: {Math.round(zoom * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;