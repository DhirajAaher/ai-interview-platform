🎉 Successfully pushed to GitHub!

Your project is now on:

https://github.com/DhirajAaher/ai-interview-platform

The important part is:

To https://github.com/DhirajAaher/ai-interview-platform.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.

So your AI Interview Preparation Platform backend + frontend project is now uploaded. ✅

One warning to fix later

You saw:

git: 'credential-manager-core' is not a git command.

This did not stop the push. GitHub authentication worked, so we can fix the credential-manager warning separately.

Next recommended step

Before making a LinkedIn post, let's make your GitHub repository look professional:

Add a README.md
Add project description/features
Add technology stack
Add database/ER diagram
Add screenshots of the application
Add API endpoint documentation
Add setup/run instructions
Add your GitHub project link to your resume/LinkedIn

Since this is a portfolio project, README + screenshots + ER diagram will make the repository much stronger.

If you want, we can do it 
step-by-step from CMD, starting with README.md.

Guide me step-by-step from CMD

Absolutely. We’ll do it one CMD step at a time, and you send me the output before moving to the next step.

Your GitHub repo is already pushed successfully, so now we’ll make it professional.

Step 1 — Check your current Git status

You should already be in:

C:\Users\Admin\Downloads\ai-interview-platform

Run:

git status
Expected output

Something similar to:

On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean

Run only this command now and send me the output.
Then I'll give you Step 2.

next
Step 2 — Create README.md

We'll create the README directly from CMD.

First make sure you are here:

cd C:\Users\Admin\Downloads\ai-interview-platform

Now run:

notepad README.md

If Windows asks:

Do you want to create a new file?

Click Yes.

Paste this content into Notepad:

# AI Interview Preparation Platform

An AI-powered interview preparation platform designed to help candidates prepare for technical interviews through personalized interview sessions, questions, answers, feedback, and scoring.

## 🚀 Features

- User management
- Resume management
- Create interview sessions
- Select job role and experience level
- Generate and manage interview questions
- Submit interview answers
- Score and feedback management
- REST APIs using Spring Boot
- MySQL database integration
- React frontend
- AI integration for interview preparation
- Structured database relationships

## 🛠️ Technology Stack

### Backend
- Java
- Spring Boot
- Spring Data JPA / Hibernate
- REST API
- Maven

### Frontend
- React
- Vite
- JavaScript
- HTML
- CSS

### Database
- MySQL 8

### AI
- Google Gemini API

### Tools
- Git
- GitHub
- Postman
- VS Code / Spring Tool Suite

## 🏗️ Project Architecture

```text
AI Interview Preparation Platform
│
├── frontend/
│   └── React + Vite
│
├── src/
│   └── main/
│       ├── java/
│       │   └── Spring Boot Backend
│       │
│       └── resources/
│           └── application configuration
│
├── pom.xml
├── .gitignore
└── README.md
🗄️ Database Structure

The application uses the following main entities:

Users
  │
  ├── Resumes
  │
  └── Interviews
        │
        └── Questions
              │
              └── Answers
Main Tables
users
resumes
interview
questions
answers
🔗 Entity Relationships
users
  │
  ├──────────────< resumes
  │
  └──────────────< interview
                    │
                    └──────────────< questions
                                      │
                                      └──────────────< answers
⚙️ Backend Setup
1. Clone the repository
git clone https://github.com/DhirajAaher/ai-interview-platform.git
cd ai-interview-platform
2. Configure MySQL

Create a MySQL database:

CREATE DATABASE interview_preparation;
3. Configure application properties

Create:

src/main/resources/application.properties

Use your local database credentials.

Example:

spring.datasource.url=jdbc:mysql://localhost:3306/interview_preparation
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

gemini.api.key=${GEMINI_API_KEY}
4. Configure Gemini API Key

Set the environment variable:

set GEMINI_API_KEY=YOUR_API_KEY

Do not commit your real API key to GitHub.

5. Run the backend

On Windows:

mvnw.cmd spring-boot:run

The backend runs on:

http://localhost:8080
🎨 Frontend Setup

Open another terminal:

cd frontend
npm install
npm run dev

The frontend will normally run on the Vite development server.

🔌 Main API Endpoints
Users
GET    /api/users
GET    /api/users/{id}
POST   /api/users
PUT    /api/users/{id}
DELETE /api/users/{id}
Resumes
GET    /api/resumes
GET    /api/resumes/{id}
POST   /api/resumes
PUT    /api/resumes/{id}
DELETE /api/resumes/{id}
Interviews
GET    /api/interviews
GET    /api/interviews/{id}
POST   /api/interviews
PUT    /api/interviews/{id}
DELETE /api/interviews/{id}
Questions
GET    /api/questions
GET    /api/questions/{id}
POST   /api/questions
PUT    /api/questions/{id}
DELETE /api/questions/{id}
Answers
GET    /api/answers
GET    /api/answers/{id}
POST   /api/answers
PUT    /api/answers/{id}
DELETE /api/answers/{id}
📌 Project Purpose

The goal of this project is to provide a structured platform where candidates can practice interviews based on their target job role and experience level while maintaining their interview questions, answers, scores, and feedback.

🔐 Security

Sensitive configuration such as:

Database passwords
API keys

should be stored locally or through environment variables and should not be committed to GitHub.

👨‍💻 Developer

Dhiraj Aher

GitHub:
https://github.com/DhirajAaher

LinkedIn:
https://linkedin.com/in/dhiraj-aher


Then **Save** the file and close Notepad.

### Step 2.1 — Check the file

Back in CMD, run:

```cmd
dir README.md

Then:

git status

You should see:

Untracked files:
    README.md

Send me that output, and we'll do Step 3: add README to Git and push it to GitHub.