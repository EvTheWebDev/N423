function connectStorage() {
  if (localStorage) {
    let students = localStorage.getItem("studentList");
    if (students) {
      // alert("Storage Connected!");
    } else {
      localStorage.setItem("studentList", JSON.stringify([]));
    }
  } else {
    alert("Your browser does not support local storage. Try updating.");
  }
}

function initListeners() {
  $("#submit").on("click", function (e) {
    e.preventDefault();
    let fName = $("#firstName").val();
    let lName = $("#lastName").val();
    let phoneNumber = $("#phoneNumber").val(); 
    let email = $("#email").val();
    let cls = $("#classes").val();
    let newArrClasses = cls.split(",").map((item) => item.trim());

    let student = {
      firstName: fName,
      lastName: lName,
      phoneNumber: phoneNumber,
      email: email,
      classes: newArrClasses,
    };
    console.log(student);
    clearForm();
    let studentList = JSON.parse(localStorage.getItem("studentList"));
    studentList.push(student);
    localStorage.setItem("studentList", JSON.stringify(studentList));
    alert("Student Added: " + fName + " " + lName);
  });
  $("#showStudents").on("click", function (e) {
    e.preventDefault();
    let studentList = JSON.parse(localStorage.getItem("studentList"));
    let appDiv = $("#app");
    appDiv.empty();
    if (studentList.length === 0) {
      appDiv.append("<h3>No students found.</h3>");
    } else {
      studentList.forEach((student, index) => {
        let studentDiv = $(`
          <div class="student-card">
            <h3>Student ${index + 1}</h3>
            <p><strong>Name:</strong> ${student.firstName} ${student.lastName}</p>
            <p><strong>Phone Number:</strong> ${student.phoneNumber}</p>
            <p><strong>Email:</strong> ${student.email}</p>
            <p><strong>Classes:</strong> ${student.classes.join(", ")}</p>
          </div>
        `);
        appDiv.append(studentDiv);
      });
    }
  });
  // Bottom of initListeners
}

function clearForm() {
  $("#firstName").val("");
  $("#lastName").val("");
  $("#phoneNumber").val("");
  $("#email").val("");
  $("#classes").val("");
}

$(document).ready(function () {
  connectStorage();
  initListeners();
});
