import { X } from 'lucide-react';

function StudentAssessmentDialog({ isOpen, onClose, student }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-xl transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Record of Continuous Term work Assessment</h2>
              <p className="text-sm text-gray-500">AY: 2023-2024 | Semester: II</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            {/* Student Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Teacher Name:</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#155E95] focus:ring-[#155E95] sm:text-sm"
                  placeholder="Enter teacher name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Lab Coordinator:</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#155E95] focus:ring-[#155E95] sm:text-sm"
                  placeholder="Enter lab coordinator name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Batch:</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#155E95] focus:ring-[#155E95] sm:text-sm"
                  placeholder="Enter batch"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Subject:</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#155E95] focus:ring-[#155E95] sm:text-sm"
                  placeholder="Enter subject"
                />
              </div>
            </div>

            {/* Assessment Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Expt. No.</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan={2}>Performance Date</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan={2}>Submission Date</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RPP Marks (Out of 5)</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SPO Marks (Out of 5)</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment Marks (Out of 10)</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sign of Faculty</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sign of Student</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                  </tr>
                  <tr className="bg-gray-50">
                    <th></th>
                    <th className="px-3 py-2 text-xs font-medium text-gray-500">Scheduled</th>
                    <th className="px-3 py-2 text-xs font-medium text-gray-500">Actual</th>
                    <th className="px-3 py-2 text-xs font-medium text-gray-500">Scheduled</th>
                    <th className="px-3 py-2 text-xs font-medium text-gray-500">Actual</th>
                    <th colSpan={6}></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...Array(12)].map((_, index) => (
                    <tr key={index + 1}>
                      <td className="px-3 py-3 text-sm text-gray-900">{index + 1}</td>
                      <td className="px-3 py-3">
                        <input type="date" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#155E95] focus:ring-[#155E95] sm:text-sm" />
                      </td>
                      <td className="px-3 py-3">
                        <input type="date" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#155E95] focus:ring-[#155E95] sm:text-sm" />
                      </td>
                      <td className="px-3 py-3">
                        <input type="date" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#155E95] focus:ring-[#155E95] sm:text-sm" />
                      </td>
                      <td className="px-3 py-3">
                        <input type="date" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#155E95] focus:ring-[#155E95] sm:text-sm" />
                      </td>
                      <td className="px-3 py-3">
                        <input type="number" max="5" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#155E95] focus:ring-[#155E95] sm:text-sm" />
                      </td>
                      <td className="px-3 py-3">
                        <input type="number" max="5" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#155E95] focus:ring-[#155E95] sm:text-sm" />
                      </td>
                      <td className="px-3 py-3">
                        <input type="number" max="10" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#155E95] focus:ring-[#155E95] sm:text-sm" />
                      </td>
                      <td className="px-3 py-3">
                        <div className="h-8 w-20 border border-gray-300 rounded-md"></div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="h-8 w-20 border border-gray-300 rounded-md"></div>
                      </td>
                      <td className="px-3 py-3">
                        <input type="text" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#155E95] focus:ring-[#155E95] sm:text-sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Final Assessment */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Proportionate Assignment marks out of 60(A)</span>
                  <input type="number" className="w-20 rounded-md border-gray-300 shadow-sm focus:border-[#155E95] focus:ring-[#155E95] sm:text-sm" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Test marks out of 20(B)</span>
                  <input type="number" className="w-20 rounded-md border-gray-300 shadow-sm focus:border-[#155E95] focus:ring-[#155E95] sm:text-sm" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Theory Attendance marks out of 20(C)</span>
                  <input type="number" className="w-20 rounded-md border-gray-300 shadow-sm focus:border-[#155E95] focus:ring-[#155E95] sm:text-sm" />
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="bg-[#155E95] bg-opacity-5 p-4 rounded-lg">
                  <p className="text-lg font-semibold text-[#155E95]">
                    Final TW marks (Converted to) out of 25 or 50: 
                    <span className="ml-2 text-2xl">42</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#155E95]"
            >
              Close
            </button>
            <button
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#155E95] hover:bg-[#0f4a75] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#155E95]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentAssessmentDialog;