
// --------- Email Input thing for Newsletter Footer ---------

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


// --------- Navbar Dropdown content hover ---------


const menuItem = document.getElementById('dropdownCons');
const dropdown = document.getElementById('dropdownContentCons');
let timeout;

function showDropdown() {
    clearTimeout(timeout);
    dropdown.classList.add('show');
}

function hideDropdown() {
    timeout = setTimeout(() => {
        dropdown.classList.remove('show');
    }, 333); // Is in ms!!!
}

// Show dropdown when hovering menu or the dropdown itself
menuItem.addEventListener('mouseenter', showDropdown);
menuItem.addEventListener('mouseleave', hideDropdown);
dropdown.addEventListener('mouseenter', showDropdown);
dropdown.addEventListener('mouseleave', hideDropdown);