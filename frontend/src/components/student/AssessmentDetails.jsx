import React, { useEffect, useState } from 'react';
import { Card } from '../ui';
import { getStudentAssessments } from '../../services/studentService';
import { toast } from 'react-toastify';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { 
  FileText, 
  Calendar,
  Award,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const AssessmentDetails = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setLoading(true);
        const data = await getStudentAssessments();
        setAssessments(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching assessments:', err);
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <p className="text-gray-600 text-lg animate-pulse">Loading assessment details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Card className="p-8 max-w-lg w-full">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Assessments</h2>
            <p className="text-gray-600 mb-4">{error}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Assessment Records
          </h1>
          <p className="mt-2 text-gray-600">View your detailed assessment records and marks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Summary Cards */}
          <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Assessments</p>
                <p className="text-2xl font-bold text-blue-600">{assessments.length}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {assessments.filter(a => 
                    a.rppMarks !== null && 
                    a.spoMarks !== null && 
                    a.assignmentMarks !== null
                  ).length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Upcoming</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {assessments.filter(a => !a.isSubmitted).length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Score</p>
                <p className="text-2xl font-bold text-purple-600">
                  {(() => {
                    const totalAssignmentMarks = assessments.reduce((sum, curr) => 
                      sum + (curr.assignmentMarks || 0), 0
                    );
                    // Convert to scale of 60
                    const convertedScore = (totalAssignmentMarks * 60) / 100;
                    return Math.round(convertedScore);
                  })()} / 60
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Assessment Table */}
        <Card className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Assessment Details</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>RPP Marks</TableHead>
                    <TableHead>SPO Marks</TableHead>
                    <TableHead>Assignment Marks</TableHead>
                    <TableHead>Total Marks</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assessments.map((assessment, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {assessment.scheduledDate ? new Date(assessment.scheduledDate).toLocaleDateString() : 'Not Scheduled'}
                      </TableCell>
                      <TableCell>{assessment.rppMarks}</TableCell>
                      <TableCell>{assessment.spoMarks}</TableCell>
                      <TableCell>{assessment.assignmentMarks}</TableCell>
                      <TableCell className="font-semibold">
                        {assessment.totalMarks}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            assessment.rppMarks !== null || 
                            assessment.spoMarks !== null || 
                            assessment.assignmentMarks !== null
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {assessment.rppMarks !== null || 
                           assessment.spoMarks !== null || 
                           assessment.assignmentMarks !== null
                            ? 'Done'
                            : 'Pending'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentDetails; 