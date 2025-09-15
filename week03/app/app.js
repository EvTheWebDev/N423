function connectStorage() {
  if (localStorage) {
    let students = localStorage.getItem("students");
    if (students) {
        // alert("Storage Connected!");
    } else {
      localStorage.setItem("students", JSON.stringify([]));
    }
  } else {
    alert("Your browser does not support local storage. Try updating.");
  }
}


function initListeners() {
  $("#submit").on("click", (e) => {
    e.preventDefault();
    // alert("Button clicked!");
    let fn = $("#firstName").val();
    let ln = $("#lastName").val();
    let cs = $("#classes").val();
    // alert(`Hello, ${fn} ${ln}. You are enrolled in ${cs}.`);

    let newArrClasses = cs.split(",").map((item) => item.trim());
    // console.log(newArrClasses);

    let studentObj = {
      fName: fn,
      lName: ln,
      classes: newArrClasses,
    };
    // console.log(studentObj);

    // Clear Form Values
    $("#firstName").val("");
    $("#lastName").val("");
    $("#classes").val("");

    addStudent(studentObj);

    // Bottom of submit click function
  });

  $("#showLocal").on("click", (e) => {
   getStudents();
  });

  //   Bottom of initListeners()
}

function addStudent(student) {
  let allStudents = JSON.parse(localStorage.getItem("students"));
  allStudents.push(student);
  localStorage.setItem("students", JSON.stringify(allStudents));

  // Bottom of addStudent()
}

function getStudents() {
    $("#app").empty();
    let allStudents = JSON.parse(localStorage.getItem("students"));
    let studentString = "<div><p>";
    $.each(allStudents, (index, student) => {
      studentString += `First Name: ${student.fName} Last Name: ${student.lName}`;
      $.each(student.classes, (i, cls) => {
        studentString += ` <span>${cls}</span>,`;
      }); 
      studentString += "</p>";
    })
   studentString += "</div>";
    $("#app").html(studentString);
    // Bottom of getStudents()
}


$(document).ready(function () {
  connectStorage();
  initListeners();
});
