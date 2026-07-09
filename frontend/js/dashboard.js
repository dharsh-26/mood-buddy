// -------------------------
// Wait until DOM loads (IMPORTANT FIX)
// -------------------------
document.addEventListener("DOMContentLoaded", () => {

    // Get Logged-in User
    const user = JSON.parse(localStorage.getItem("user"));

    const welcomeMessage = document.getElementById("welcomeMessage");

    if (user) {
        welcomeMessage.textContent = `Welcome, ${user.name}!`;
    } else {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    // -------------------------
    // Today's Mood
    // -------------------------

    const moodSelect = document.getElementById("moodSelect");
    const todayMood = document.getElementById("todayMood");

    if (!moodSelect || !todayMood) {
        console.error("Mood elements not found in HTML");
        return;
    }

    // Load saved mood
    const savedMood = localStorage.getItem("todayMood");

    if (savedMood) {
        moodSelect.value = savedMood;
        todayMood.textContent = "Today's Mood: " + savedMood;
    } else {
        todayMood.textContent = "Today's Mood: No mood selected";
    }

    moodSelect.addEventListener("change", () => {

        const mood = moodSelect.value;

        if (!mood) return;

        localStorage.setItem("todayMood", mood);

        todayMood.textContent = "Today's Mood: " + mood;
    });
    // Dashboard Statistics

const totalPlans = document.getElementById("totalPlans");
const completedPlans = document.getElementById("completedPlans");
const currentMood = document.getElementById("currentMood");

currentMood.textContent = localStorage.getItem("todayMood") || "No Mood";

    // -------------------------
    // Study Progress
    // -------------------------

    const progressBar = document.getElementById("progressBar");
    const updateProgressBtn = document.getElementById("updateProgressBtn");

    let progress = Number(localStorage.getItem("studyProgress")) || 0;

    updateProgress();

    updateProgressBtn.addEventListener("click", () => {

        if (progress < 100) {
            progress += 20;
        } else {
            progress = 0;
        }

        localStorage.setItem("studyProgress", progress);

        updateProgress();
    });

    function updateProgress() {
        progressBar.style.width = progress + "%";
        progressBar.innerHTML = progress + "%";
    }
    async function loadStatistics() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch("http://localhost:5000/api/plans", {

            headers: {
                "Authorization": `Bearer ${token}`
            }

        });

        const data = await response.json();

        if (response.ok) {

            totalPlans.textContent = data.plans.length;

            // Every created plan is considered completed
            completedPlans.textContent = data.plans.length;

        }

    } catch (error) {

        console.log(error);

    }

}
loadStatistics();

    // -------------------------
    // Logout
    // -------------------------

    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.addEventListener("click", () => {

        const confirmLogout = confirm("Are you sure you want to logout?");

        if (confirmLogout) {
            localStorage.clear();
            window.location.href = "login.html";
        }
    });

});
