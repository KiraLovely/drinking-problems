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


// --------- NavBar Icon Fetch ---------
const supabaseUrl = 'https://qxidlnuurcfuqcsvwryb.supabase.co';
const supabaseKey = 'sb_publishable_5WbTkW9HL-1tvaEsg1-WRQ_InP2IoLa';

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);


async function getNavIcon(name) {
    const { data, error } = await supabaseClient
        .from('loreLeakageImages')
        .select('image_url')
        .eq('image_name', name)
        .single();

    if (error || !data) {
        console.error('Image load failed:', name, error);
        return null;
    }

    return data.image_url;
}

document.addEventListener('DOMContentLoaded', async () => {
    const logo = await getNavIcon('loreLeakageIco');
    const fallBack = 'Sorry! Image was unable to load properly!';

    document.getElementById('HomeImg_Nav').src = logo || fallBack;
});