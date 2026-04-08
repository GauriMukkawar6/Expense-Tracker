function loginUser() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginpassword").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    alert("No user found. Please sign up first.");
    return;
  }

  if (username === storedUser.username && password === storedUser.password) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUser", username);
    alert("Login successfull");
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials");
  }
}

function goToSignup(){
  window.location.href = "signup.html";
}

function signupUser() {
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  const income = parseFloat(document.getElementById("signupIncome").value);

  if (!username || !password || !income) {
    alert("Please fill all fields");
    return;
  }

  const user = {
    username: username,
    password: password,
    income: income,
    expenses: 0
  }

  localStorage.setItem("user", JSON.stringify(user));

  alert("Signup successfull!");

  window.location.href = "login.html";
}

function goToLogin(){
  window.location.href = "login.html";
}

document.getElementById("signupForm")?.addEventListener("submit", function(e){
  e.preventDefault();

  signupUser();
});