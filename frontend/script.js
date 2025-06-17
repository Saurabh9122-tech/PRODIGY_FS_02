let token = '';

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    window.location.href = 'dashboard.html';
  } else {
    alert(data.message);
  }
}

async function addEmployee() {
  const name = document.getElementById('name').value;
  const department = document.getElementById('department').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  const res = await fetch('http://localhost:5000/api/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ name, department, email, phone })
  });

  const data = await res.json();
  alert('Employee added');
  loadEmployees();
}

async function loadEmployees() {
  const res = await fetch('http://localhost:5000/api/employees', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  const employees = await res.json();

  const list = document.getElementById('employeeList');
  list.innerHTML = employees.map(emp => `
    <div>
      ${emp.name} - ${emp.department} - ${emp.email} - ${emp.phone}
      <button onclick="deleteEmployee('${emp._id}')">Delete</button>
    </div>
  `).join('');
}

async function deleteEmployee(id) {
  await fetch(`http://localhost:5000/api/employees/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  loadEmployees();
}

if (window.location.pathname.includes('dashboard')) {
  loadEmployees();
}
