import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBatchDetails } from '../../services/teacherService';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Loader2, UserCircle } from 'lucide-react';

const StudentCard = ({ student }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <UserCircle className="h-10 w-10 text-[#155E95]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {student.name || 'Student Name'}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            Roll No: {student.rollNumber}
          </p>
          <p className="text-sm text-gray-500">
            {student.email}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const BatchDetails = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [batch, setBatch] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        console.log('🔍 Fetching batch details for ID:', batchId);
        setLoading(true);
        const data = await getBatchDetails(batchId);
        console.log('📦 Received batch details:', data);
        
        if (!data || !data.batch) {
          throw new Error('Invalid batch data received');
        }

        console.log('✅ Setting batch data:', data.batch);
        console.log('✅ Setting students data:', data.students);
        
        setBatch(data.batch);
        setStudents(Array.isArray(data.students) ? data.students : []);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching batch details:', err);
        setError(err.message || 'Failed to fetch batch details');
      } finally {
        setLoading(false);
      }
    };

    fetchBatchDetails();
  }, [batchId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => navigate('/teacher/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Batch Details</h1>
        <Button onClick={() => navigate('/teacher/dashboard')}>Back to Dashboard</Button>
      </div>

      {batch && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{batch.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="font-semibold text-gray-700">Subject:</p>
                <p className="text-gray-600">{batch.subjectName} ({batch.subjectCode})</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Year:</p>
                <p className="text-gray-600">{batch.year}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Division:</p>
                <p className="text-gray-600">{batch.division}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Schedule:</p>
                <p className="text-gray-600">{batch.day} at {batch.time}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Roll Number Range:</p>
                <p className="text-gray-600">{batch.rollNumberStart} - {batch.rollNumberEnd}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Duration:</p>
                <p className="text-gray-600">
                  {new Date(batch.startDate).toLocaleDateString()} to {new Date(batch.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Enrolled Students ({students.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {students.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {students
                .sort((a, b) => a.rollNumber - b.rollNumber)
                .map((student) => (
                  <StudentCard key={student.id} student={student} />
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No students enrolled in this batch.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchDetails; 