# 🛡️Shasthya-Rakshak : **AI-Powered Healthcare Claims Fraud Detection System**  
*For West Bengal Health & Family Welfare*

![Shasthya-Rakshak Logo](https://img.shields.io/badge/Shasthya--Rakshak-Healthcare%20Fraud%20Detection-blue?style=for-the-badge)

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

## 🎯 Overview:

**Shasthya-Rakshak** is a comprehensive administrative dashboard designed for the West Bengal Health & Family Welfare to monitor healthcare claims, detect fraudulent activities, and manage the state's healthcare fraud detection system.

The system leverages **AI-powered neural engines** to analyze claims in real-time, identify suspicious patterns, and provide actionable insights to healthcare administrators across all 23 districts of West Bengal.

## **🔗 Live Project Link:**
[https://app-9je2r5tvilfl.appmedo.com/]

### Key Objectives:

- 🔍 **Fraud Detection**: Identify and flag suspicious healthcare claims using AI
- 📊 **Real-time Monitoring**: Track claims, hospitals, and district-level fraud statistics
- 🤖 **AI Assistant**: Interactive chatbot for querying system data and insights
- 🏥 **Hospital Management**: Monitor 240+ registered hospitals across West Bengal
- 🗺️ **District Analytics**: Comprehensive fraud risk analysis for all 23 districts
- 🔐 **Secure Access**: Role-based authentication and authorization


## ✨ Features:

## **Dashboard Analytics**
- Real-time KPI cards displaying:
  - Total Claims Processed
  - Fraud Cases Detected
  - Funds Saved (in Crores)
  - Pending Reviews
- Interactive charts and visualizations
- Trend analysis and historical data
- Quick action buttons for common tasks
## **Hospital Logs Management**
- Comprehensive hospital database (240+ hospitals)
- Real-time claim tracking
- Fraud detection status for each hospital
- Detailed hospital profiles with:
  - Claim statistics
  - Fraud rate percentage
  - Risk level indicators
  - Contact information
- Advanced filtering and search
- Export functionality
## **District Risk Monitoring**
- Complete coverage of all 23 West Bengal districts
- Color-coded risk levels:
  - 🔴 High Risk (>8% fraud rate)
  - 🟠 Medium Risk (4-8% fraud rate)
  - 🟢 Low Risk (<4% fraud rate)
- Interactive district cards with:
  - Total claims count
  - Fraud cases detected
  - Fraud rate percentage
  - Real-time updates
- Click-to-view detailed statistics
## **AI Investigator Chatbot**
- Natural language query interface
- 15+ supported query patterns:
  - Fraud detection information
  - Hospital performance analysis
  - District statistics
  - Claim details
  - Funds saved reports
  - System status
- Voice command simulation
- Real-time response generation
- Message history
- Mobile-responsive design
## **Notification System**
- Real-time alerts for:
  - High-risk hospital detection
  - District fraud rate changes
  - Claim approvals
  - System updates
  - Suspicious activities
- Color-coded by priority
- Mark as read/unread
- Delete individual notifications
- Bulk actions (mark all read, clear all)
- Scrollable notification list
## **Settings & Configuration**
- **General Settings**:
  - Profile management (name, email, department, role)
  - System preferences (auto-verification, real-time sync)
  - Save/Cancel functionality with change detection
- **Notifications**:
  - High-value claims alerts
  - Fraud pattern detection
  - System outage notifications
- **Security & Privacy**:
  - Password management
  - Two-factor authentication
  - Session timeout control
  - Login notifications
- **API & Database**:
  - API key management
  - Webhook configuration
  - Database status monitoring
  - Data export and backup
## **Authentication System**
- Secure login page
- Role-based access control
- Session management
- Protected routes
- Logout functionality
## **Theme Support**
- Light and Dark mode toggle
- Persistent theme preference
- Smooth transitions
- Consistent color scheme

## 🛠️ Tech Stack:

### Frontend Framework
- **React 18.3** 
- **TypeScript 5.6** 
- **Vite 5.4** 
### UI Components & Styling
- **shadcn/ui** 
- **Tailwind CSS 3.4** 
- **Lucide React** 
- **Recharts** 
### Routing & State
- **React Router DOM 6.28** 
- **React Context API** 
### Development Tools
- **ESLint** 
- **TypeScript ESLint** 
- **PostCSS** 
- **Autoprefixer**

## 🚀 Getting Started:

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or **pnpm** 8.x)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone <https://github.com/Suchetamon27/Swasthya-Rakshak-repo>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   https://app-9je2r5tvilfl.appmedo.com/login
   ```

### Build for Production

```bash
npm run build
```


### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

### 📁 Project Structure:

Swasthya-Rakshak/
├── public/                      # Static assets
├── src/
│   ├── components/              # React components
│   │   ├── layouts/            # Layout components
│   │   │   └── AdminLayout.tsx # Main admin layout
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── switch.tsx
│   │   │   └── ... (30+ components)
│   │   ├── AIChatbot.tsx       
│   │   ├── NotificationBell.tsx
│   │   ├── DistrictRiskGrid.tsx 
│   │   └── KPICard.tsx        
│   │
│   │   ├── AppContext.tsx    
│   │   ├── AuthContext.tsx     
│   │   └── ThemeContext.tsx   
│   │
│   ├── hooks/                  
│   │   └── use-toast.ts        
│   │
│   ├── lib/                    
│   │   └── utils.ts          
│   │
│   ├── pages/                 
│   │   ├── Dashboard.tsx     
│   │   ├── HospitalLogs.tsx   
│   │   ├── Settings.tsx        
│   │   └── Login.tsx           
│   │
│   ├── App.tsx                
│   ├── main.tsx
│   ├── routes.tsx             
│   ├── index.css             
│   └── vite-env.d.ts           
│
├── .eslintrc.cjs               
├── tailwind.config.js         
├── tsconfig.json             
├── vite.config.ts           
├── package.json                
└── README.md              ]



## 📝 Contributing
     
     🤝We welcome contributions.
     
    - Fork the project.
    - Create your feature branch (git checkout -b feature/amazing-feature).
    - Commit your changes (git commit -m 'Add some amazing feature').
    - Push to the branch (git push origin feature/amazing-feature).
    - Open a Pull Request.

**Made with ❤️ for the people of West Bengal**⭐ Star us on GitHub — it motivates us a lot!

Copyright © 2026 Shasthya-Rakshak. All rights reserved.


