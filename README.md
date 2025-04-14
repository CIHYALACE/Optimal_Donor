# Optimal Donor Platform

A comprehensive crowdfunding platform built with Django and React that connects donors with meaningful causes.

## 🌟 Features

- **User Management**
  - User registration and authentication
  - Profile management with customizable details
  - Role-based access control

- **Campaign Management**
  - Create and manage fundraising campaigns
  - Campaign categorization and tagging
  - Rich media support with multiple images
  - Progress tracking and goal management

- **Donation System**
  - Secure donation processing
  - Donation history and tracking
  - Campaign progress visualization    




- **Social Features**
  - Comments and discussions
  - Rating system
  - Content moderation with reporting system

- **Admin Features**
  - Campaign approval system
  - User management
  - Content moderation
  - Analytics and reporting

## 🔧 Technology Stack

### Backend
- Django
- Django REST Framework
- PostgreSQL
- JWT Authentication
- Django CORS Headers

### Frontend
- React
- Redux Toolkit
- React Bootstrap
- Axios
- React Router DOM
- SweetAlert2

## 📦 Project Structure

```
optimal_donor/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store configuration
│   │   └── styles/        # CSS styles
│   └── public/            # Static assets
│
└── optimalDonor/          # Django backend application
    ├── users/             # User management app
    ├── core/              # Main application logic
    └── optimalDonor/      # Project configuration
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL

### Backend Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your database and other configurations
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Start the development server:
```bash
python manage.py runserver
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

## 🧪 Testing

### Backend Tests
```bash
python manage.py test
```

### Frontend Tests
```bash
cd frontend
pnpm test
```

## 📚 API Documentation

The API documentation is available at `/api/docs/` when running the development server.

## 👥 Team Members
- Josephine  - CEO & Founder 
- AbdelRahman Youssef - Chief Operations Officer
- Hosam Semry - Chief Technology Officer
- Mohamed Loay - Community Outreach Director
- Ahmed Soliman - partner 
- Amr Hosam - Community Outreach Director
- Mona Ali - Supervisor


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

For any inquiries, please reach out to:
- Email: abodyoussef2015@gmail.com
- Phone: +020 10 279 833 79
