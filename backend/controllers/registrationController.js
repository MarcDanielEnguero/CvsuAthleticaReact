const nodemailer = require('nodemailer');
const Registration = require('./models/Registration');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send registration notification email
const sendRegistrationNotification = async (registrationData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: registrationData.cvsuEmail,
      subject: 'Free Training Registration Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
          <div style="background-color: white; padding: 20px; border-radius: 10px;">
            <h2 style="color: #2c3e50; text-align: center;">Free Training Registration Confirmation</h2>
            <hr style="border: 1px solid #ecf0f1;">
            <p>Dear <strong>${registrationData.firstName} ${registrationData.lastName}</strong>,</p>
            <p>Your registration for Free Training has been successfully submitted.</p>
            
            <h3>Registration Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ecf0f1;"><strong>Coach:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ecf0f1;">${registrationData.coach}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ecf0f1;"><strong>Student Number:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ecf0f1;">${registrationData.studentNumber}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ecf0f1;"><strong>Department:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ecf0f1;">${registrationData.department}</td>
              </tr>
            </table>
            
            <p style="margin-top: 20px;">We will contact you shortly with further instructions regarding your Free Training registration.</p>
            
            <p style="text-align: center; margin-top: 20px; color: #7f8c8d;">
              <small>This is an automated email. Please do not reply.</small>
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Registration notification email sent');
  } catch (error) {
    console.error('Email notification error:', error);
  }
};

// Registration Controller
exports.registerTraining = async (req, res) => {
  try {
    // Validate input data
    const requiredFields = [
      'firstName', 'lastName', 'studentNumber', 'phoneNumber', 
      'college', 'department', 'course', 'yearSection', 'cvsuEmail', 'coach'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Incomplete registration',
        errors: missingFields.map(field => `${field} is required`)
      });
    }

    // Create registration
    const registration = await Registration.create(req.body);
    
    // Send notification email
    await sendRegistrationNotification(req.body);

    res.status(201).json({ 
      registrationId: registration._id,
      message: 'Registration successful',
      coach: registration.coach
    });
  } catch (error) {
    console.error('Registration Error:', error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'Registration failed',
        errors: ['Student number or email already exists']
      });
    }

    // Validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        error: 'Registration validation failed',
        errors: errors
      });
    }

    res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    });
  }
};