// Check Login
const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}

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

// History Table
const historyTable = document.getElementById("historyTable");

// Load Study Plans
async function loadPlans() {

    try {

        const response = await fetch("http://localhost:5000/api/plans", {

            method: "GET",

            headers: {
                "content-type":"application/json",
                "Authorization":`Bearer ${token}`
            }

        });

        const data = await response.json();

        historyTable.innerHTML = "";

        if (response.ok) {

            if (data.plans.length === 0) {

                historyTable.innerHTML = `
                    <tr>
                        <td colspan="5" class="text-center">
                            No study plans found.
                        </td>
                    </tr>
                `;

                return;
            }

            data.plans.forEach(plan => {

                historyTable.innerHTML += `

                <tr>

                    <td>${new Date(plan.date).toLocaleDateString()}</td>

                    <td>${plan.mood}</td>

                    <td>${plan.subject}</td>

                    <td>${plan.studyTime}</td>
                        <td>
        <button class="btn btn-warning btn-sm"
            onclick="updatePlan('${plan._id}')">
            Update
        </button>

        <button class="btn btn-danger btn-sm"
            onclick="deletePlan('${plan._id}')">
            Delete
        </button>
    </td>
</tr>





                    <td>
                        <span class="badge bg-success">
                            Completed
                        </span>
                    </td>

                </tr>

                `;

            });

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to load study history.");

    }

}

// Load Data
loadPlans();

// -------------------------
// Update Plan
// -------------------------
async function updatePlan(id) {

    const token = localStorage.getItem("token");

    const mood = prompt("Enter new mood:");
    const subject = prompt("Enter new subject:");
    const studyTime = prompt("Enter new study time:");
    const date = prompt("Enter new date (YYYY-MM-DD):");

    const response = await fetch(`http://localhost:5000/api/plans/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            mood,
            subject,
            studyTime,
            date
        })
    });

    const data = await response.json();

    if (response.ok) {
        alert("Plan updated successfully");
        loadPlans();
    } else {
        alert(data.message);
    }
}
async function deletePlan(id) {

    const token = localStorage.getItem("token");

    if (!confirm("Are you sure you want to delete this plan?")) {
        return;
    }

    const response = await fetch(`http://localhost:5000/api/plans/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (response.ok) {
        alert("Plan deleted successfully");
        loadPlans();
    } else {
        alert(data.message);
    }
}