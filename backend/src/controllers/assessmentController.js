import Assessment from '../models/Assessment.js';
import Student from '../models/Student.js';
import { Op } from 'sequelize';
import sequelize from '../config/database.js';

// Helper function to find the appropriate student model based on roll number
// This is a simplified version that just returns the Student model
const getStudentModel = (rollNo) => {
  // For now, we'll just use the main Student model
  return Student;
};

// Save or update assessment data
const saveAssessment = async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    
    const {
      studentRollNo, 
      experimentNo, 
      scheduledPerformanceDate, 
      actualPerformanceDate, 
      scheduledSubmissionDate, 
      actualSubmissionDate, 
      rppMarks, 
      spoMarks, 
      assignmentMarks, 
      id,
      finalAssignmentMarks,
      testMarks,
      theoryAttendanceMarks,
      finalMarks,
      unitTest1Marks,
      unitTest2Marks,
      unitTest3Marks,
      convertedUnitTestMarks
    } = req.body;

    console.log('Extracted studentRollNo:', studentRollNo);
    console.log('Extracted experimentNo:', experimentNo);

    // Validate required fields
    if (!studentRollNo || studentRollNo.trim() === '') {
      console.error('Missing studentRollNo in request');
      return res.status(400).json({
        success: false,
        message: 'Student roll number is required'
      });
    }

    if (experimentNo === undefined || experimentNo === null) {
      console.error('Missing experimentNo in request');
      return res.status(400).json({
        success: false,
        message: 'Experiment number is required'
      });
    }

    let assessment;
    
    if (id) {
      // Update existing assessment
      assessment = await Assessment.findByPk(id);
      
      if (!assessment) {
        return res.status(404).json({
          success: false,
          message: 'Assessment not found'
        });
      }
      
      // Update fields
      assessment.studentRollNo = studentRollNo;
      assessment.experimentNo = experimentNo;
      assessment.scheduledPerformanceDate = scheduledPerformanceDate;
      assessment.actualPerformanceDate = actualPerformanceDate;
      assessment.scheduledSubmissionDate = scheduledSubmissionDate;
      assessment.actualSubmissionDate = actualSubmissionDate;
      assessment.rppMarks = rppMarks;
      assessment.spoMarks = spoMarks;
      assessment.assignmentMarks = assignmentMarks;
      
      if (finalAssignmentMarks) assessment.finalAssignmentMarks = finalAssignmentMarks;
      if (testMarks) assessment.testMarks = testMarks;
      if (theoryAttendanceMarks) assessment.theoryAttendanceMarks = theoryAttendanceMarks;
      if (finalMarks) assessment.finalMarks = finalMarks;
      if (unitTest1Marks) assessment.unitTest1Marks = unitTest1Marks;
      if (unitTest2Marks) assessment.unitTest2Marks = unitTest2Marks;
      if (unitTest3Marks) assessment.unitTest3Marks = unitTest3Marks;
      if (convertedUnitTestMarks) assessment.convertedUnitTestMarks = convertedUnitTestMarks;
      
      try {
        await assessment.save();
        console.log('Assessment updated:', assessment.toJSON());
      } catch (saveError) {
        console.error('Error saving assessment:', saveError);
        throw saveError;
      }
    } else {
      // Create new assessment
      try {
        assessment = await Assessment.create({
          studentRollNo,
          experimentNo,
          scheduledPerformanceDate,
          actualPerformanceDate,
          scheduledSubmissionDate,
          actualSubmissionDate,
          rppMarks,
          spoMarks,
          assignmentMarks,
          finalAssignmentMarks,
          testMarks,
          theoryAttendanceMarks,
          finalMarks,
          unitTest1Marks,
          unitTest2Marks,
          unitTest3Marks,
          convertedUnitTestMarks
        });
        console.log('New assessment created:', assessment.toJSON());
      } catch (createError) {
        console.error('Error creating assessment:', createError);
        throw createError;
      }
    }

    res.status(200).json({
      success: true,
      message: 'Assessment saved successfully',
      id: assessment.id,
      data: assessment
    });
  } catch (error) {
    console.error('Error in saveAssessment:', error);
    
    // Log more detailed error information
    if (error.name === 'SequelizeValidationError') {
      console.error('Validation errors:', error.errors.map(e => e.message));
    }
    
    if (error.parent) {
      console.error('Database error:', error.parent.message);
      
      if (error.parent.sql) {
        console.error('SQL Query:', error.parent.sql);
      }
    }
    
    res.status(500).json({
      success: false,
      message: 'Error saving assessment',
      error: error.message
    });
  }
};

// Get all assessments for a student
const getStudentAssessments = async (req, res) => {
  try {
    const { studentRollNo } = req.params;
    console.log('Fetching assessments for student:', studentRollNo);
    
    const assessments = await Assessment.findAll({ 
      where: { studentRollNo },
      order: [['experimentNo', 'ASC']]
    });

    console.log(`Found ${assessments.length} assessments for student ${studentRollNo}`);
    
    // Log each assessment's unit test marks
    assessments.forEach((assessment, index) => {
      console.log(`Assessment ${index + 1} (ID: ${assessment.id}, Experiment: ${assessment.experimentNo}):`);
      console.log(`  Unit Test 1: ${assessment.unitTest1Marks}`);
      console.log(`  Unit Test 2: ${assessment.unitTest2Marks}`);
      console.log(`  Unit Test 3: ${assessment.unitTest3Marks}`);
      console.log(`  Converted Unit Test Marks: ${assessment.convertedUnitTestMarks}`);
    });
    
    res.status(200).json({
      success: true,
      data: assessments
    });
  } catch (error) {
    console.error('Error fetching student assessments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student assessments',
      error: error.message
    });
  }
};

// Get all assessments for a batch
const getBatchAssessments = async (req, res) => {
  try {
    const { batchId } = req.params;
    console.log('Fetch request for batch assessments:', batchId);
    
    // Since we don't have a direct way to get students by batch,
    // we'll just return assessments filtered by a pattern in studentRollNo
    // This assumes roll numbers contain batch identifiers
    
    const assessments = await Assessment.findAll({
      where: {
        // You might need to adjust this logic based on your roll number format
        // This is just a placeholder example
        studentRollNo: {
          [Op.like]: `%${batchId}%`
        }
      },
      order: [
        ['studentRollNo', 'ASC'], 
        ['experimentNo', 'ASC']
      ]
    });

    console.log(`Found ${assessments.length} assessments for batch ${batchId}`);
    
    res.status(200).json({
      success: true,
      data: assessments
    });
  } catch (error) {
    console.error('Error fetching batch assessments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching batch assessments',
      error: error.message
    });
  }
};

export { saveAssessment, getStudentAssessments, getBatchAssessments }; 