import "./css/styles.css";
import { auth, db } from "./firebase.js";
import javascriptLogo from "./javascript.svg";
import { setupCounter } from "./counter.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  collection,
  addDoc,
  getFirestore,
  getDocs,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

// console.log("Auth Init:", auth, db)

const signUpIn = document.querySelector(".signUpIn");
const logoutButton = document.getElementById("logoutButton");
const siteContent = document.getElementById("content");
const signUpForm = document.getElementById("signUpForm");
const loginForm = document.getElementById("loginForm");

async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // alert("User Signed Up: ", userCredential.user);
  } catch (error) {
    console.error("Error Signing Up:", error);
  }
}

async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // alert("User Signed In: ", userCredential.user);
  } catch (error) {
    console.error("Error Signing In:", error);
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
    signUpIn.classList.add("hidden");
    logoutButton.classList.remove("hidden");
    siteContent.classList.remove("hidden");
  } else {
    console.log("No user is signed in.");
  }
});

async function logout() {
  try {
    await signOut(auth);
    // alert("User Signed Out");
    signUpIn.classList.remove("hidden");
    logoutButton.classList.add("hidden");
    siteContent.classList.add("hidden");
  } catch (error) {
    console.error("Error Signing Out:", error);
  }
}

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signUpEmail").value;
  const password = document.getElementById("signUpPassword").value;
  console.log("Signing Up...");
  console.log("Email: ", email, " Password: ", password);
  signUp(email, password);
  signUpForm.reset();
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  console.log("Signing In...");
  console.log("Email: ", email, " Password: ", password);
  signIn(email, password);
  loginForm.reset();
});

document.getElementById("logoutButton").addEventListener("click", async () => {
  logout();
});

const guestBook = document.querySelector(".guestBook");

async function addNameToDB(name) {
  try {
    const docRef = await addDoc(collection(db, "guestbook"), { name: name });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

onSnapshot(collection(db, "guestbook"), (snapshot) => {
  guestBook.innerHTML = "";
  snapshot.forEach((doc) => {
    const nameData = doc.data();
    const nameDiv = document.createElement("div");
    const nameSpan = document.createElement("input");
    const buttonHolder = document.createElement("div");
    buttonHolder.classList.add("buttonHolder");
    nameDiv.classList.add("nameEntry");
    nameSpan.value = nameData.name;
    nameSpan.disabled = true;
    nameDiv.append(nameSpan);
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("editButton");

    editButton.addEventListener("click", () => {
      if (editButton.textContent === "Edit") {
        nameSpan.disabled = false;
        nameSpan.focus();
        editButton.textContent = "Save";
      } else {
        nameSpan.disabled = true;
        editButton.textContent = "Edit";
        nameData.name = nameSpan.value;
        updateDoc(doc.ref, nameData)
          .then(() => {
            //   console.log("Document successfully updated!");
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      }
    });

    buttonHolder.append(editButton);
    const delButton = document.createElement("button");
    delButton.textContent = "X";
    delButton.classList.add("deleteButton");

    delButton.addEventListener("click", async () => {
      console.log("Delete button clicked");
      try {
        await deleteDoc(doc.ref);
        console.log("Document successfully deleted!");
      } catch (error) {
        console.error("Error removing document: ", error);
      }
    });

    buttonHolder.append(delButton);
    nameDiv.append(buttonHolder);
    guestBook.append(nameDiv);
  });
});

document.querySelector(".addNameButton").addEventListener("click", async () => {
  const nameInput = document.querySelector(".nameInput");
  const name = nameInput.value.trim();
  await addNameToDB(name);
  nameInput.value = "";
});
