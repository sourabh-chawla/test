import React from 'react';
import { BarChart, TreeDeciduous, Wind } from 'lucide-react';
import { Project } from '../../types/dapp';

const mockProjects: Project[] = [
  {
    id: 1,
    name: 'Rainforest Protection',
    type: 'Conservation',
    creditsIssued: 10000,
    creditsAvailable: 8500,
    impact: {
      co2Offset: 15000,
      treesPlanted: 5000,
      areaProtected: 100,
    },
    status: 'Active',
    icon: TreeDeciduous,
  },
  {
    id: 2,
    name: 'Wind Farm Project',
    type: 'Renewable Energy',
    creditsIssued: 5000,
    creditsAvailable: 3000,
    impact: {
      co2Offset: 8000,
      energyGenerated: 1500,
      homesSupplied: 1000,
    },
    status: 'Active',
    icon: Wind,
  },
];

const ProjectTracker: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold text-white mb-6">Project Tracking</h3>
      <div className="space-y-6">
        {mockProjects.map((project) => (
          <div key={project.id} className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <project.icon className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{project.name}</h4>
                  <span className="text-gray-400 text-sm">{project.type}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                project.status === 'Active'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {project.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-gray-400 text-sm">Credits Issued</span>
                <p className="text-white font-semibold">
                  {project.creditsIssued.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Credits Available</span>
                <p className="text-white font-semibold">
                  {project.creditsAvailable.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-600 pt-4">
              <h5 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <BarChart className="w-4 h-4" />
                <span>Environmental Impact</span>
              </h5>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(project.impact).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-gray-400 text-sm capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <p className="text-white font-semibold">{value.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTracker;