import React from 'react';
import { Layers, HardHat, Package, FileText, Anchor } from 'lucide-react';

const BuildingNotes = () => {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <h3 className="text-3xl sm:text-4xl font-extrabold text-orange-800 border-b-4 border-orange-500 pb-3 flex items-center gap-3">
        <Layers className="w-8 h-8 text-orange-600" /> Building Construction Notes
      </h3>

      <p className="text-lg text-gray-700 leading-relaxed bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
        This comprehensive curriculum covers the fundamental principles of structural design, construction materials, effective site management, and mandatory safety regulations essential for all practical construction projects at Mutovu TSS.
      </p>

      {/* --- Detailed Modules Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Module 1: Structural Foundations */}
        <div className="p-5 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-blue-500 space-y-3">
          <h4 className="text-xl font-bold text-blue-700 flex items-center gap-2">
            <Anchor className="w-5 h-5" /> Chapter 1: Foundations & Loads
          </h4>
          <ul className="list-disc list-outside ml-5 text-gray-600 text-sm space-y-1">
            <li>Soil investigation and bearing capacity analysis.</li>
            <li>Types of foundations: strip, pad, raft, and pile foundations. </li>
            <li>Calculation of dead, live, and wind loads.</li>
            <li>Designing shallow foundations (footings).</li>
          </ul>
        </div>

        {/* Module 2: Material Science (Concrete Focus) */}
        <div className="p-5 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-green-500 space-y-3">
          <h4 className="text-xl font-bold text-green-700 flex items-center gap-2">
            <Package className="w-5 h-5" /> Chapter 2: Concrete Technology
          </h4>
          <ul className="list-disc list-outside ml-5 text-gray-600 text-sm space-y-1">
            <li>Concrete components: Cement, aggregates, and water ratio (w/c ratio).</li>
            <li>Proportioning and mixing methods for different grades (M20, M30).</li>
            <li>Reinforced Concrete (RC) principles and rebar placement.</li>
            <li>Curing techniques and quality control measures.</li>
          </ul>
        </div>

        {/* Module 3: Site Management & Safety */}
        <div className="p-5 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-red-500 space-y-3">
          <h4 className="text-xl font-bold text-red-700 flex items-center gap-2">
            <HardHat className="w-5 h-5" /> Chapter 3: OHS & Site Logistics
          </h4>
          <ul className="list-disc list-outside ml-5 text-gray-600 text-sm space-y-1">
            <li>Occupational Health and Safety (OHS) regulations checklist.</li>
            <li>Risk assessment and hazard identification on a construction site.</li>
            <li>Site layout planning and temporary facilities.</li>
            <li>Project scheduling (Gantt charts and critical path method - CPM).</li>
          </ul>
        </div>
      </div>
      
      {/* --- Additional Resources Block --- */}
      <div className="pt-4 space-y-4">
        <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
          <FileText className="w-6 h-6 text-orange-600" /> Essential Documents & Resources
        </h4>
        <ul className="space-y-3">
          <li className="flex items-start gap-2 text-gray-700">
            <span className="text-orange-500 font-bold">»</span> 
            **Rwanda Building Code Extracts (2024):** Mandatory standards for structural integrity and materials used in the Southern Province.
          </li>
          <li className="flex items-start gap-2 text-gray-700">
            <span className="text-orange-500 font-bold">»</span> 
            **Practical Lab Guide:** Step-by-step instructions for concrete cube testing and material strength verification.
          </li>
          <li className="flex items-start gap-2 text-gray-700">
            <span className="text-orange-500 font-bold">»</span> 
            **CAD Drawing Templates:** Pre-configured templates for technical drawings of simple residential structures.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BuildingNotes;