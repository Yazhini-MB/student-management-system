let students = [];
let selectedRow = null;

// function addStudent() {
//   let name = document.getElementById("name").value;
//   let roll = document.getElementById("roll").value;
//   let dept = document.getElementById("dept").value;

//   let row = document.createElement("tr");

//   row.innerHTML = `
//     <td>${name}</td>
//     <td>${roll}</td>
//     <td>${dept}</td>
//     <td><button onclick="deleteRow(this)">Delete</button></td>
//   `;

//   document.getElementById("studentTable").appendChild(row);
// }

// function deleteRow(btn) {
//   btn.parentElement.parentElement.remove();
// }
// function addStudent() {
//   let name = document.getElementById("name").value;
//   let roll = document.getElementById("roll").value;
//   let dept = document.getElementById("dept").value;

//   if (selectedRow == null) {
//     // ADD new row
//     let row = document.createElement("tr");

//     row.innerHTML = `
//       <td>${name}</td>
//       <td>${roll}</td>
//       <td>${dept}</td>
//       <td>
//         <button onclick="editRow(this)">Edit</button>
//         <button onclick="deleteRow(this)">Delete</button>
//       </td>
//     `;

//     document.getElementById("studentTable").appendChild(row);
//   } else {
//     // UPDATE existing row
//     selectedRow.children[0].innerText = name;
//     selectedRow.children[1].innerText = roll;
//     selectedRow.children[2].innerText = dept;

//     selectedRow = null; // reset
//   }

//   // clear input
//   document.getElementById("name").value = "";
//   document.getElementById("roll").value = "";
//   document.getElementById("dept").value = "";
// }
// let selectedRow = null;
// function editRow(btn) {
//   selectedRow = btn.parentElement.parentElement;

//   document.getElementById("name").value = selectedRow.children[0].innerText;
//   document.getElementById("roll").value = selectedRow.children[1].innerText;
//   document.getElementById("dept").value = selectedRow.children[2].innerText;
// }

function addStudent() {
  let name = document.getElementById("name").value;
  let roll = document.getElementById("roll").value;
  let dept = document.getElementById("dept").value;

  if (selectedRow == null) {
    let student = { name, roll, dept };
    students.push(student);
  } else {
    let index = selectedRow.rowIndex - 1;
    students[index] = { name, roll, dept };
    selectedRow = null;
  }

  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();

  document.getElementById("name").value = "";
  document.getElementById("roll").value = "";
  document.getElementById("dept").value = "";
}
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
function editStudent(index) {
  selectedRow = { index };

  document.getElementById("name").value = students[index].name;
  document.getElementById("roll").value = students[index].roll;
  document.getElementById("dept").value = students[index].dept;
}

function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}
window.onload = function() {
  let data = localStorage.getItem("students");
  if (data) {
    students = JSON.parse(data);
    displayStudents();
  }
};