import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, BookOpen, Calendar, User, Mail, Phone, Building } from 'lucide-react';
import { getCurrentUser } from '../../lib/auth';
import { getTeacherById } from '../../services/teacherService';
import { toast } from 'react-toastify';

function TeacherDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teacherDetails, setTeacherDetails] = useState(null);

  useEffect(() => {
    const loadTeacherDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!user) {
          console.error('No user found in localStorage');
          setError('You must be logged in to view this page');
          toast.error('Authentication required');
          return;
        }
        
        if (!user.teacherId) {
          console.error('No teacherId found in user object:', user);
          setError('Teacher ID not found. Please contact support.');
          toast.error('Teacher ID not found');
          return;
        }
        
        console.log('Fetching teacher details for ID:', user.teacherId);
        const data = await getTeacherById(user.teacherId);
        console.log('Loaded teacher details:', data);
        setTeacherDetails(data);
      } catch (err) {
        console.error('Error loading teacher details:', err);
        setError('Failed to load teacher details. Please try again later.');
        toast.error('Failed to load teacher details');
      } finally {
        setLoading(false);
      }
    };

    loadTeacherDetails();
  }, [user]);

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
    if (yearId === 'SE') {
      navigate('/teacher/year/SE');
    } else if (yearId === 'TE') {
      navigate('/teacher/year/TE');
    } else if (yearId === 'BE') {
      navigate('/teacher/year/BE');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#155E95]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="text-[#155E95] hover:text-[#0f4a75] underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

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
      {teacherDetails && (
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
                  <p className="font-medium text-gray-900">{teacherDetails.phone || 'Not provided'}</p>
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
                {teacherDetails.subjects && teacherDetails.subjects.map((subject, index) => (
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
      )}

      {/* Years Section */}
      <div className="max-w-7xl mx-auto">
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
    </div>
  );
}

export default TeacherDashboard;