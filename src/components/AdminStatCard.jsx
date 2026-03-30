import React from 'react';

/**
 * A generic UI component for displaying summary statistics in the admin dashboard. Admin stat card UI.
 */
export function AdminStatCard({ title, value, icon, trend }) {
  const isPositiveTrend = trend && trend > 0;
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        {trend !== undefined && (
          <p className={`text-xs mt-2 ${isPositiveTrend ? 'text-green-500' : 'text-red-500'}`}>
            {isPositiveTrend ? '↑' : '↓'} {Math.abs(trend)}% from last month
          </p>
        )}
      </div>
      {icon && (
        <div className="h-10 w-10 bg-blue-50 flex items-center justify-center rounded-full text-blue-600">
          {icon}
        </div>
      )}
    </div>
  );
}
