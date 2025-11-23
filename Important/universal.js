document.getElementById("newsletter_form").addEventListener("submit", (event) => {
    event.preventDefault();

    const emailRaw = document.getElementById("newsletter_Input").value.trim();

    if(!emailRaw || !emailRaw.includes("@")){
        alert("Please enter a valid email to proceed.");
        return;
    }

    const email = encodeURIComponent(emailRaw);

    window.location.href = `Important/Newsletter_Forms/newslettertestformstest.html?email=${email}`;
});