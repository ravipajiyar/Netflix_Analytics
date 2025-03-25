// src/pages/Reports.jsx
import React, { useState } from 'react';
const Reports = () => {
   const [reportType, setReportType] = useState('Performance Analysis');
   const [timePeriod, setTimePeriod] = useState('Last 7 Days');

      const mockRecentReports = [
        { "reportName": "Q4 Performance Analysis", "category": "Performance", "date": "2023-12-31", "status": "Complete", "action": "Download" },
        { "reportName": "User Engagement Report", "category": "User Insights", "date": "2023-12-28", "status": "Pending", "action": "View" },
        { "reportName": "Content Trend Analysis", "category": "Trend Analysis", "date": "2023-12-25", "status": "Complete", "action": "Download" }
    ];

     const reportTypeOptions = [
         "Performance Analysis",
        "User Engagement",
        "Content Trends"
    ];
    const timePeriodOptions = [
       "Last 7 Days",
        "Last 30 Days",
       "Last 90 Days",
       "Last Year"
   ];


      const handleGenerateReport = () => {
         alert("Report Generated for report type: " + reportType + " and time period: "+ timePeriod)
    };
  return (
       <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Analytics Reports</h2>
             <p className="text-gray-600 mb-6">Comprehensive reports and data insights from Netflix analysis</p>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white shadow rounded p-4">
                        <h3 className="text-lg font-semibold mb-4">Performance Reports</h3>
                         <ul className="text-gray-700">
                            <li className="mb-2 flex items-center">
                              <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#3b82f6' }}></div>
                                  <span>Monthly Performance Analysis</span>
                            </li>
                            <li className="mb-2 flex items-center">
                               <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#3b82f6' }}></div>
                               <span>Viewer Engagement Metrics</span>
                            </li>
                             <li className="mb-2 flex items-center">
                                <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#3b82f6' }}></div>
                                <span>Content Performance Stats</span>
                           </li>
                         </ul>
                    </div>
                    <div className="bg-white shadow rounded p-4">
                        <h3 className="text-lg font-semibold mb-4">Trend Analysis</h3>
                         <ul className="text-gray-700">
                            <li className="mb-2 flex items-center">
                               <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#9333ea' }}></div>
                               <span>Viewing Pattern Analysis</span>
                            </li>
                            <li className="mb-2 flex items-center">
                                <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#9333ea' }}></div>
                                <span>Content Popularity Trends</span>
                            </li>
                             <li className="mb-2 flex items-center">
                                  <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#9333ea' }}></div>
                                   <span>Seasonal Performance</span>
                             </li>
                        </ul>
                    </div>
                 <div className="bg-white shadow rounded p-4">
                        <h3 className="text-lg font-semibold mb-4">User Insights</h3>
                         <ul className="text-gray-700">
                           <li className="mb-2 flex items-center">
                             <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#10b981' }}></div>
                                <span>Demographic Reports</span>
                            </li>
                            <li className="mb-2 flex items-center">
                               <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#10b981' }}></div>
                                <span>User Behavior Analysis</span>
                            </li>
                             <li className="mb-2 flex items-center">
                                <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#10b981' }}></div>
                                 <span>Preference Patterns</span>
                             </li>
                         </ul>
                  </div>
              </div>

            <div className="bg-white shadow rounded p-4 mb-8">
                <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
                <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Report Name</th>
                             <th className="border px-4 py-2">Category</th>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Status</th>
                             <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockRecentReports.map((report, index) => (
                            <tr key={index}>
                                 <td className="border px-4 py-2">{report.reportName}</td>
                                <td className="border px-4 py-2">{report.category}</td>
                                <td className="border px-4 py-2">{report.date}</td>
                                <td className="border px-4 py-2">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ report.status==='Complete' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800' }`}>
                                            {report.status}
                                     </span>
                                </td>
                                <td className="border px-4 py-2">
                                   <button className="bg-blue-500 text-white px-3 py-1 rounded"> {report.action}</button>
                               </td>
                           </tr>
                        ))}
                   </tbody>
              </table>
                </div>
           </div>


              <div className="bg-white shadow rounded p-4">
                  <h3 className="text-lg font-semibold mb-4">Generate New Report</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col">
                           <label htmlFor="report-type" className="block text-gray-700 font-medium mb-1">Report Type</label>
                           <select id="report-type"
                                   className="block w-full bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                                    value={reportType}
                                     onChange={(e) => setReportType(e.target.value)}>
                                  {reportTypeOptions.map(option => (
                                     <option key={option} value={option}>{option}</option>
                                    ))}
                            </select>
                      </div>
                     <div className="flex flex-col">
                            <label htmlFor="time-period" className="block text-gray-700 font-medium mb-1">Time Period</label>
                           <select id="time-period"
                                   className="block w-full bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                                  value={timePeriod}
                                    onChange={(e) => setTimePeriod(e.target.value)}>
                                    {timePeriodOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                     ))}
                                </select>
                        </div>
                    </div>

                   <button onClick={handleGenerateReport} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                       Generate Report
                  </button>
           </div>

         </div>
    );
};

export default Reports;