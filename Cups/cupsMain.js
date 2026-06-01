const supabaseUrl = 'https://qxidlnuurcfuqcsvwryb.supabase.co';
const supabaseKey = 'sb_publishable_5WbTkW9HL-1tvaEsg1-WRQ_InP2IoLa';

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);


let ALL_CUPS = [];
let CURRENT_VIEW = [];


async function loadCups() {
    const { data, error } = await supabaseClient
        .from('waifuCups')
        .select('*');

    if (error) {
        console.error('Error loading Cups:', error);
        return;
    }

    ALL_CUPS = data;
    CURRENT_VIEW = [...ALL_CUPS];

    renderCups(CURRENT_VIEW);
}

function renderCups(cups) {
    const container = document.getElementById('plastic_container');
    container.innerHTML = '';

    cups.forEach(cup => {
        const card = document.createElement('div');
        card.classList.add('cup-card');

        card.innerHTML = `
      <img src="${cup.cup_preview_image}" height="250vw" class="cup-preview" alt="${cup.cup_name}">
      <h4>${cup.cup_name}</h4>
      <p>Creator: ${cup.partner_name ?? 'N/A'}</p>
      <p>Artist: ${cup.artist_name ?? 'Unknown'}</p>
    `;

        container.appendChild(card);
    });
}

const filters = {
    material: null,
    search: '',
    collab: null,
};

let sortMode = null;

function applyFiltersAndSorting() {
    if (!ALL_CUPS.length) {
        console.warn('applyFiltersAndSorting called before data loaded');
        return;
    }

    let result = [...ALL_CUPS];



    if (filters.material) {
        result = result.filter(c =>
            c.material === filters.material
        );
    }


    if (filters.collab !== null) {
        result = result.filter(c =>
            c.collab_cup === filters.collab
        );
    }

    if (filters.search) {
        result = result.filter(c =>
            c.cup_name.toLowerCase().includes(filters.search)
        );
    }

    if (sortMode === 'AZ') {
        result.sort((a, b) => a.cup_name.localeCompare(b.cup_name));
    }

    if (sortMode === 'ZA') {
        result.sort((a, b) => b.cup_name.localeCompare(a.cup_name));
    }

    if (sortMode === 'NEWEST') {
        result.sort((a, b) =>
            new Date(b.release_date) - new Date(a.release_date)
        );
    }

    if (sortMode === 'OLDEST') {
        result.sort((a, b) =>
            new Date(a.release_date) - new Date(b.release_date)
        );
    }

    CURRENT_VIEW = result;
    renderCups(CURRENT_VIEW);
}

function bindButtons() {
    document.getElementById('SortAZ').addEventListener('click', () => {
        sortMode = 'AZ';
        applyFiltersAndSorting();
    });

    document.getElementById('SortZA').addEventListener('click', () => {
        sortMode = 'ZA';
        applyFiltersAndSorting();
    });

    document.getElementById('SortNO').addEventListener('click', () => {
        sortMode = 'NEWEST';
        applyFiltersAndSorting();
    });

    document.getElementById('SortON').addEventListener('click', () => {
        sortMode = 'OLDEST';
        applyFiltersAndSorting();
    });

    document.getElementById('SortCol').addEventListener('click', () => {
        filters.collab = true;
        applyFiltersAndSorting();
    });

    document.getElementById('SortNCol').addEventListener('click', () => {
        filters.collab = false;
        applyFiltersAndSorting();
    });

    document.getElementById('SortMaP').addEventListener('click', () => {
        filters.material = 'plastic';
        applyFiltersAndSorting();
    });

    document.getElementById('SortMaM').addEventListener('click', () => {
        filters.material = 'metal';
        applyFiltersAndSorting();
    });



        document.getElementById('SortSpf').addEventListener('input', (e) => {
        filters.search = e.target.value.trim().toLowerCase();
        applyFiltersAndSorting();
    });


    document.getElementById('ResetFilters').addEventListener('click', () => {
        filters.material = null;
        filters.search = '';
        filters.collab = null;
        sortMode = null;
        document.getElementById('SortSpf').value = '';

        applyFiltersAndSorting();
    });



}

document.addEventListener('DOMContentLoaded', async () => {
    await loadCups();
    bindButtons();
});