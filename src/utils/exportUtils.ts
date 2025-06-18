import html2canvas from 'html2canvas';
import { Project, ExportData } from '../types';

export const exportToImage = async (elementId: string): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  const canvas = await html2canvas(element, {
    backgroundColor: '#ffffff',
    scale: 2,
    width: element.scrollWidth,
    height: element.scrollHeight,
    scrollX: 0,
    scrollY: 0,
  });

  const link = document.createElement('a');
  link.download = `gantt-chart-${new Date().toISOString().split('T')[0]}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};

export const exportToJSON = (projects: Project[]): void => {
  const exportData: ExportData[] = projects.map(project => ({
    id: project.id,
    name: project.name,
    start: project.startDate,
    end: project.endDate
  }));

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "gantt-projects.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export const importFromJSON = (file: File): Promise<Project[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        const normalizedData: Project[] = importedData.map((item: any) => ({
          id: item.id || Date.now() + Math.random(),
          name: item.name || '',
          type: 'feature' as const,
          startDate: item.start || item.startDate || '',
          endDate: item.end || item.endDate || '',
          description: item.description || ''
        }));
        
        if (Array.isArray(normalizedData) && normalizedData.every(item => 
          item.name && (item.startDate || item.endDate)
        )) {
          resolve(normalizedData);
        } else {
          reject(new Error('Invalid JSON format'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
};