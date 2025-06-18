import React from 'react';
import { Cuboid as Cube, Calendar, CalendarX } from 'lucide-react';
import { ProjectStats as StatsType } from '../types';

interface ProjectStatsProps {
  stats: StatsType;
  t: (key: string) => string;
}

const ProjectStats: React.FC<ProjectStatsProps> = ({ stats, t }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
        <Cube className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-medium text-blue-700">
          {t('stats.total')}: {stats.total}
        </span>
      </div>
      <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
        <Calendar className="w-4 h-4 text-green-600" />
        <span className="text-sm font-medium text-green-700">
          {t('stats.scheduled')}: {stats.planned}
        </span>
      </div>
      <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg">
        <CalendarX className="w-4 h-4 text-orange-600" />
        <span className="text-sm font-medium text-orange-700">
          {t('stats.unscheduled')}: {stats.unplanned}
        </span>
      </div>
    </div>
  );
};

export default ProjectStats;