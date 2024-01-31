
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
  import { getDatabase, ref, child, push, update } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
  const firebaseConfig = {
    apiKey: "AIzaSyCnW2PBJRaDJNTfGPFGpItNyadT4zMFTuk",
    authDomain: "my-first-project-a4387.firebaseapp.com",
    databaseURL: "https://my-first-project-a4387-default-rtdb.firebaseio.com",
    projectId: "my-first-project-a4387",
    storageBucket: "my-first-project-a4387.appspot.com",
    messagingSenderId: "1028057817868",
    appId: "1:1028057817868:web:2ff0bc38a0a11390219f29"
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);
  const db=getDatabase()


const contactFullname = document.querySelector("#contactFullname");
const contactEmail = document.querySelector("#contactEmail");
const contactAddress = document.querySelector("#contactAddress");
const contactPhone = document.querySelector("#contactPhone");
const contactTextarea = document.querySelector("#contactTextarea");
const contactSendBtn = document.querySelector("#contactSendBtn");
const alertSuccessMessage = document.querySelector(".alert-success");
const alertErrorMessage = document.querySelector(".alert-danger");

function hideAlert(alertElement) {
  alertElement.classList.add('alert-hidden');
  setTimeout(() => {
    alertElement.style.display = 'none';
    alertElement.classList.remove('alert-hidden');
  }, 3000);
}

contactSendBtn.addEventListener("click", async function (e) {
  e.preventDefault();

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
  if (
    contactFullname.value.trim() === "" ||
    contactEmail.value.trim() === "" ||
    contactAddress.value.trim() === "" ||
    contactPhone.value.trim() === "" ||
    contactTextarea.value.trim() === "" ||
    !emailPattern.test(contactEmail.value)
  ) {
    alertErrorMessage.style.display = "block";
    
    setTimeout(() => {
      hideAlert(alertErrorMessage);
    }, 3000);

    return;
  }

  const contactInfo = {
    contactFullname: contactFullname.value,
    contactEmail: contactEmail.value,
    contactAddress: contactAddress.value,
    contactPhone: contactPhone.value,
    contactTextarea: contactTextarea.value,
  };

  try {
    alertSuccessMessage.style.display = "block";
    
    await push(ref(db, "contact"), contactInfo);

    setTimeout(() => {
      hideAlert(alertSuccessMessage);
      contactFullname.value = "";
      contactEmail.value = "";
      contactAddress.value = "";
      contactPhone.value = "";
      contactTextarea.value = "";
    }, 3000);
  } catch (error) {
    console.error("Error sending contact information to Firebase:", error);
  }
});
