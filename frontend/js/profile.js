// Check Login
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user) {
    alert("Please login first.");
    window.location.href = "login.html";
}

// Form Elements
const profileForm = document.getElementById("profileForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Load User Data
nameInput.value = user.name;
emailInput.value = user.email;
passwordInput.value="";

// Update Profile
profileForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const updatedData = {
        name: nameInput.value.trim(),
        password: passwordInput.value
    };

    try {

        const response = await fetch("http://localhost:5000/api/auth/profile", {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(updatedData)

        });

        const data = await response.json();

        if (response.ok) {

            alert(data.message);

            // Update Local Storage
            user.name = updatedData.name;
            localStorage.setItem("user", JSON.stringify(user));

            // Clear Password Field
            passwordInput.value = "";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to connect to the server.");

    }

});
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "🙈";
    } else {
        password.type = "password";
        togglePassword.textContent = "👁️";
    }

});

// Logout
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("todayMood");
        localStorage.removeItem("studyProgress");

        window.location.href = "login.html";

    }

});