const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

// Create or Update Employee
document.getElementById("employeeForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("employeeId").value;
  const name = document.getElementById("name").value;
  const position = document.getElementById("position").value;
  const salary = document.getElementById("salary").value;

  const method = id ? "PUT" : "POST";
  const url = id
    ? `http://localhost:5000/api/employees/${id}`
    : "http://localhost:5000/api/employees";

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, position, salary }),
  });

  document.getElementById("employeeForm").reset();
  fetchEmployees();
});

// Fetch All Employees
async function fetchEmployees() {
  const res = await fetch("http://localhost:5000/api/employees", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  const tbody = document.querySelector("#employeeTable tbody");
  tbody.innerHTML = "";

  data.forEach((emp) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.position}</td>
      <td>${emp.salary}</td>
      <td>
        <button onclick="editEmployee('${emp._id}', '${emp.name}', '${emp.position}', ${emp.salary})">Edit</button>
        <button onclick="deleteEmployee('${emp._id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function editEmployee(id, name, position, salary) {
  document.getElementById("employeeId").value = id;
  document.getElementById("name").value = name;
  document.getElementById("position").value = position;
  document.getElementById("salary").value = salary;
}

async function deleteEmployee(id) {
  await fetch(`http://localhost:5000/api/employees/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  fetchEmployees();
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

fetchEmployees();
