// your function here
async function createPlan() {
    const token = localStorage.getItem("token");

    const mood = document.getElementById("moodSelect").value;
    const subject = document.getElementById("subject").value;
    const studyTime = document.getElementById("studyTime").value;
    const date = document.getElementById("date").value;

    const response = await fetch("http://localhost:5000/api/plans", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
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
        alert("Plan created successfully!");
        console.log(data);
    } else {
        alert(data.message);
    }
}