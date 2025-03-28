import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, BookOpen, Calendar, User, Mail, Phone, Building } from 'lucide-react';
import { getCurrentUser } from '../../lib/auth';

function TeacherDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const teacherDetails = {
    name: "Jyoti Jadhav",
    email: "jhjadhav@pict.edu",
    phone: "+91 96653 22346",
    department: "Information Technology",
    subjects: ["Database Management"]
  };

  const academicYears = [
    { id: 'SE', name: 'Second Year (SE)', students: 180, batches: 6 },
    { id: 'TE', name: 'Third Year (TE)', students: 165, batches: 6 },
    { id: 'BE', name: 'Fourth Year (BE)', students: 170, batches: 6 }
  ];

  const batches = [
    { id: 'A1', name: 'Batch A1', students: 30, schedule: 'Monday, Wednesday' },
    { id: 'A2', name: 'Batch A2', students: 30, schedule: 'Tuesday, Thursday' },
    { id: 'A3', name: 'Batch A3', students: 30, schedule: 'Wednesday, Friday' },
    { id: 'A4', name: 'Batch A4', students: 30, schedule: 'Monday, Thursday' }
  ];

  const handleYearClick = (yearId) => {
    // Will be implemented in future to navigate to specific year view
    console.log(`Clicked year: ${yearId}`);
  };

  const handleBatchClick = (batchId) => {
    navigate(`/teacher/batch/${batchId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Institute Header */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md mb-8">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-[#155E95] bg-opacity-10 rounded-full flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-[#155E95]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                PUNE INSTITUTE OF COMPUTER TECHNOLOGY
              </h1>
              <p className="text-gray-500 mt-1">Excellence in Engineering Education & Research</p>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm text-gray-500">Academic Year</p>
            <p className="text-lg font-semibold text-[#155E95]">2023-2024</p>
          </div>
        </div>
      </div>

      {/* Teacher Details Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#155E95] px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <User className="w-5 h-5 mr-2" />
              Teacher Profile
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start space-x-3">
              <User className="w-5 h-5 text-[#155E95] mt-1" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{teacherDetails.name}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-[#155E95] mt-1" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{teacherDetails.email}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-[#155E95] mt-1" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{teacherDetails.phone}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Building className="w-5 h-5 text-[#155E95] mt-1" />
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium text-gray-900">{teacherDetails.department}</p>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6">
            <p className="text-sm text-gray-500 mb-2">Subjects</p>
            <div className="flex flex-wrap gap-2">
              {teacherDetails.subjects.map((subject, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#155E95] bg-opacity-10 text-[#155E95] rounded-full text-sm"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Years Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          Academic Years
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {academicYears.map((year) => (
            <button
              key={year.id}
              onClick={() => handleYearClick(year.id)}
              className="bg-white hover:bg-[#155E95] hover:text-white transition-all duration-300 rounded-lg shadow-md p-6 text-left group"
            >
              <h4 className="text-lg font-semibold group-hover:text-white text-gray-900 mb-3">
                {year.name}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-[#155E95] group-hover:text-white" />
                  <span className="text-sm group-hover:text-white text-gray-600">
                    {year.students} Students
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#155E95] group-hover:text-white" />
                  <span className="text-sm group-hover:text-white text-gray-600">
                    {year.batches} Batches
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Batches Section */}
      <div className="max-w-7xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Laboratory Batches
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {batches.map((batch) => (
            <button
              key={batch.id}
              onClick={() => handleBatchClick(batch.id)}
              className="bg-white hover:shadow-lg transition-all duration-300 rounded-lg shadow-md p-6 text-left border-l-4 border-[#155E95] group"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  {batch.name}
                </h4>
                <span className="px-3 py-1 bg-[#155E95] bg-opacity-10 text-[#155E95] rounded-full text-sm">
                  {batch.students} Students
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2 text-[#155E95]" />
                <span className="text-sm">{batch.schedule}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;