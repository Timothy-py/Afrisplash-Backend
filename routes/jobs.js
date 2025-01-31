const express = require('express');
const router = express.Router();
const { R_protect } = require('../middleware/auth');
const protect = R_protect; //Ony Recuiter can create Jobs Now
const advancedResults = require('../middleware/advancedResults');
const {
  create,
  ping,
  updateJob,
  delJob,
  getMyJobs,
  getMyJob,
  getJobs,
  getJob,
  closeJob,
  openJob,
  applyJob,
  getApplicants,
  updateStatus,
  jobsByCompany,
  jobsByType,
  jobsByLocation,
  jobsByDate
} = require('../controllers/jobs');

//Jobs --Jobs In Company --Jobs Created --Manage Jobs --Applicant --Public Access other stuff
router.get('/', getJobs);
// View Jobs Public
router.get('/v/:id', getJob);
// Create A New Job
router.post('/', protect, create);
// edit a Job
router.put('/e/:id', protect, updateJob);
// View a Job Private Only companies Member
router.get('/p/:id', protect, getMyJob);

// View Jobs Private Only companies Member - pend draft close live and other
router.get('/p/', protect, getMyJobs);

// Apply For A job
router.post('/a/:id', protect, applyJob);

// Veiw all applicants
router.get('/applicants/:id', protect, getApplicants);
// Manage Applican State
router.get('/applicant/:Job_id/:applicant_id/accept', protect, ping);
router.get('/applicant/:Job_id/:applicant_id/reject', protect, ping);

// Close or reopen a Job
router.put('/c/:id', protect, closeJob);
router.put('/o/:id', protect, openJob);

// Delete a Job
router.delete('/d/:id', protect, delJob);
// Report a Job
router.post('/r/:id', ping);

// update job status
/**
 * TODO: Add Admin guard
 */
router.patch('/:id/status', updateStatus);

// Search jobs in a particular company
router.get('/search/c/:company', jobsByCompany);

// Search jobs by Type
router.get('/search/t/:type', jobsByType);

// Search jobs by Location
router.get('/search/l/:location', jobsByLocation);

// Search jobs by Date
router.get('/search/d', jobsByDate);

module.exports = router;
