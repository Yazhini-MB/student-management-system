let students = [];
let selectedIndex = null;

// Add / Update Student
function addStudent() {
  let name = document.getElementById("name").value.trim();
  let roll = document.getElementById("roll").value.trim();
  let dept = document.getElementById("dept").value.trim();

  // Validation
  if (name === "" || roll === "" || dept === "") {
    alert("Please fill all fields");
    return;
  }

  if (selectedIndex === null) {
    // ADD
    students.push({ name, roll, dept });
  } else {
    // UPDATE
    students[selectedIndex] = { name, roll, dept };
    selectedIndex = null;
  }

  saveToLocal();
  displayStudents();
  clearInputs();
}

// Display Students
function displayStudents() {
  let table = document.getElementById("studentTable");
  table.innerHTML = "";

  students.forEach((student, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.roll}</td>
      <td>${student.dept}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
}

// Edit
function editStudent(index) {
  selectedIndex = index;

  document.getElementById("name").value = students[index].name;
  document.getElementById("roll").value = students[index].roll;
  document.getElementById("dept").value = students[index].dept;
}

// Delete
function deleteStudent(index) {
  students.splice(index, 1);
  saveToLocal();
  displayStudents();
}

// Save to localStorage
function saveToLocal() {
  localStorage.setItem("students", JSON.stringify(students));
}

// Clear Inputs
function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("roll").value = "";
  document.getElementById("dept").value = "";
}

// Load on page start
window.onload = function () {
  let data = localStorage.getItem("students");

  if (data) {
    students = JSON.parse(data);
    displayStudents();
  }
};