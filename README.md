# DocUSafe - Student Document Management System

DocUSafe is a secure and user-friendly document management system designed for educational institutions. It facilitates the secure storage, verification, and management of student documents while providing separate interfaces for administrators and students.

## Features

### Admin Features

- **Document Management**

  - View all submitted documents
  - Verify or reject documents
  - Search and filter documents
  - Preview document contents
  - Track document status

- **User Management**

  - View all users
  - Manage user accounts
  - Monitor user activity
  - Control user access

- **Reports**
  - Generate system usage reports
  - Track document verification statistics
  - Monitor user activities
  - Export data in various formats

### Student Features

- **Document Submission**

  - Upload academic documents
  - Track document status
  - View verification results
  - Manage personal documents

- **College Requests**

  - Submit document requests
  - Track request status
  - Communicate with administrators

- **Notifications**
  - Real-time status updates
  - Document verification alerts
  - System announcements

## Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript (Vanilla)
- Font Awesome for icons
- Google Fonts (Poppins)

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer for file uploads

## Project Structure

```
DocUSafe/
├── assets/                  # Frontend assets
│   ├── css/                 # CSS stylesheets
│   ├── js/                  # JavaScript files
│   └── images/              # Image resources
├── backend/                 # Backend code
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Express middleware
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── uploads/             # Document storage
│   ├── .env.example         # Environment variables example
│   ├── package.json         # Backend dependencies
│   └── server.js            # Entry point
├── pages/                   # HTML pages
│   ├── admin/               # Admin interface
│   └── student/             # Student interface
├── index.html               # Landing page
├── login.html               # Login page
├── signup.html              # Signup page
└── package.json             # Frontend dependencies
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/vnsh69/DTL_DocUsafe.git
   cd DTL_DocUsafe
   ```

2. **Set Up Frontend**

   ```bash
   # Install frontend dependencies
   npm install
   ```

3. **Set Up Backend**

   ```bash
   # Navigate to backend directory
   cd backend

   # Install backend dependencies
   npm install

   # Create .env file from example
   cp .env.example .env

   # Edit .env file with your configuration
   # Especially set the MongoDB URI and JWT secret
   ```

4. **Create Uploads Directory**

   ```bash
   # Create directory for document uploads
   mkdir -p backend/uploads
   ```

5. **Create Admin User**

   ```bash
   # Run the admin creation script
   node backend/scripts/createAdmin.js
   ```

### Running the Application

1. **Start the Backend Server**

   ```bash
   # From the backend directory
   npm run dev
   ```

2. **Start the Frontend Server**

   ```bash
   # From the root directory
   npm start
   ```

3. **Access the Application**

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Default Admin Credentials

- Email: admin@docusafe.com
- Password: admin123

## Usage

### Admin Access

1. Navigate to the login page
2. Use admin credentials
3. Access the admin dashboard
4. Manage documents, users, and system settings

### Student Access

1. Create an account or login
2. Upload documents for verification
3. Track document status
4. Submit college requests
5. Monitor notifications

## Security Features

- Secure login system
- Role-based access control
- Document encryption (planned)
- Audit logging
- Session management

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Future Enhancements

- [ ] Document encryption
- [ ] Advanced search filters
- [ ] Bulk document processing
- [ ] Email notifications
- [ ] Mobile application
- [ ] API integration
- [ ] Document templates
- [ ] Automated verification

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/docusafe

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d

# Email Configuration (optional)
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=noreply@docusafe.com
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users

- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get single user (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)
- `PUT /api/users/profile/update` - Update own profile

### Documents

- `POST /api/documents` - Upload a document
- `GET /api/documents` - Get all documents (admin only)
- `GET /api/documents/my` - Get user's documents
- `GET /api/documents/:id` - Get single document
- `PUT /api/documents/:id` - Update document (admin only)
- `DELETE /api/documents/:id` - Delete document (admin only)
- `PUT /api/documents/:id/verify` - Verify document (admin only)
- `PUT /api/documents/:id/reject` - Reject document (admin only)

### Requests

- `POST /api/requests` - Create a request
- `GET /api/requests` - Get all requests (admin only)
- `GET /api/requests/my` - Get user's requests
- `GET /api/requests/:id` - Get single request
- `PUT /api/requests/:id` - Update request (admin only)
- `DELETE /api/requests/:id` - Delete request (admin only)
- `PUT /api/requests/:id/approve` - Approve request (admin only)
- `PUT /api/requests/:id/reject` - Reject request (admin only)
- `PUT /api/requests/:id/complete` - Complete request (admin only)

## License

This project is licensed under the ISC License.
