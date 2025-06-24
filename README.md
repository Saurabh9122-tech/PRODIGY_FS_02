# PRODIGY_FS_02
# 🧑‍💼 Employee Management Web Application

This is a secure full-stack web application developed as part of **Prodigy InfoTech Internship Task 2**. It allows administrators to **Create, Read, Update, and Delete (CRUD)** employee records with proper **authentication and validation** to protect sensitive employee data.

---

## 🚀 Features

- ✅ User Registration & Secure Login (with JWT)
- ✅ Passwords hashed using `bcrypt`
- ✅ Add New Employee Records
- ✅ View All Employees (by logged-in user)
- ✅ Update or Delete Employees
- ✅ Authenticated Routes using JWT Middleware
- ✅ Responsive, human-friendly UI 

---

# 🛠️ Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| HTML, CSS, JS | Node.js, Express | MongoDB (Atlas) |

---

# 📁 Project Structure

PRODIGY_FS_02/  
├── backend/  
│ ├── models/  
│ ├── routes/  
│ ├── middleware/  
│ ├── server.js  
│ └── .env  
├── public/   
│ ├── login.html   
│ ├── register.html   
│ ├── dashboard.html   
│ └── style.css  
└── README.md 
#📦 Installation & Running Locally  
##Clone the repository

bash  
Copy code  
git clone https://github.com/Saurabh9122-tech/PRODIGY_FS_02.git   
cd PRODIGY_FS_02/backend  
##Install backend dependencies

bash   
Copy code  
npm install  
##Start the server

bash  
Copy code   
node server.js   
##Visit Frontend
Open public/login.html in your browser.   

#🔒 Authentication
All employee operations are protected using a JWT token. After login, the token is stored and used to authorize all further actions like view, edit, or delete.  

#📸 Screenshots
Add images of your login, dashboard, and CRUD operations here. 

#📃 License
This project is licensed under the MIT License. 

#✨ Acknowledgements
Prodigy InfoTech   
MongoDB Atlas   

JWT & bcrypt community  

#👨‍💻 Developed By
Saurabh Singh  
Intern @Prodigy InfoTech 
