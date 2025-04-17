import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentStudent } from '../../services/studentService';
import { Card } from '../ui';
import { toast } from 'react-toastify';
import { 
  UserCircle, 
  BookOpen, 
  Calendar, 
  GraduationCap,
  Building2,
  Mail,
  Hash,
  Clock,
  Award,
  ChevronRight
} from 'lucide-react';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const studentData = await getCurrentStudent();
        setStudent(studentData);
        setError(null);
      } catch (err) {
        console.error('Error fetching student data:', err);
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const handleAssessmentClick = () => {
    navigate('/student/assessments');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <p className="text-gray-600 text-lg animate-pulse">Loading student data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center transform hover:scale-105 transition-transform duration-200">
          <div className="text-red-500 text-6xl mb-4 animate-bounce">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center transform hover:scale-105 transition-transform duration-200">
          <div className="text-gray-400 text-6xl mb-4 animate-bounce">📚</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Data Available</h2>
          <p className="text-gray-600">No student data is currently available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Student Dashboard
          </h1>
          <p className="mt-2 text-gray-600">Welcome back, {student.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Student Profile Section */}
          <Card 
            className={`col-span-1 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 ${activeCard === 'profile' ? 'ring-2 ring-blue-500' : ''}`}
            onMouseEnter={() => setActiveCard('profile')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-full">
                  <UserCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Student Profile</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group">
                  <Mail className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{student.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 group">
                  <Hash className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                  <div>
                    <p className="text-sm text-gray-500">Roll Number</p>
                    <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{student.rollNumber}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 group">
                  <Building2 className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{student.department}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 group">
                  <GraduationCap className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                  <div>
                    <p className="text-sm text-gray-500">Year</p>
                    <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{student.year}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 group">
                  <BookOpen className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                  <div>
                    <p className="text-sm text-gray-500">Division</p>
                    <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{student.division}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Summary Section */}
          <Card 
            className={`col-span-1 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 ${activeCard === 'summary' ? 'ring-2 ring-purple-500' : ''}`}
            onMouseEnter={() => setActiveCard('summary')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-full">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Summary</h2>
              </div>
              <div className="space-y-4">
                <div 
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg transform hover:scale-105 transition-transform duration-200 cursor-pointer group"
                  onClick={handleAssessmentClick}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Assessments</p>
                      <p className="text-2xl font-bold text-blue-600">{student.assessments?.length || 0}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-blue-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg transform hover:scale-105 transition-transform duration-200">
                  <p className="text-sm text-gray-500">Attendance Records</p>
                  <p className="text-2xl font-bold text-green-600">{student.attendance?.length || 0}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Unit Test Marks Section */}
          <Card 
            className={`col-span-1 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 ${activeCard === 'unitTests' ? 'ring-2 ring-orange-500' : ''}`}
            onMouseEnter={() => setActiveCard('unitTests')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-3 rounded-full">
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Unit Test Marks</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Test 1</p>
                  <p className="text-2xl font-bold text-orange-600">{student.assessments?.[0]?.unitTest1Marks || 'N/A'} / 30</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Test 2</p>
                  <p className="text-2xl font-bold text-orange-600">{student.assessments?.[0]?.unitTest2Marks || 'N/A'} / 30</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Test 3</p>
                  <p className="text-2xl font-bold text-orange-600">{student.assessments?.[0]?.unitTest3Marks || 'N/A'} / 30</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 