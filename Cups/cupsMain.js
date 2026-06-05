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
      <img src="${cup.cup_preview_image}" class="cup-preview" alt="${cup.cup_name}">
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

function normalizeCupName(name) {
    if (!name) return '';

    return name
        .replace(/^waifu\s*cups?\s*x\s*/i, '')
        .replace(/^waifu\s*cups?:\s*/i, '')
        .replace(/^creator\s*cups?\s*x\s*/i, '')
        .replace(/^creator\s*cups?:\s*/i, '')
        .replace(/^waifu\s*jugs?\s*x\s*/i, '')
        .replace(/^waifu\s*jugs?:\s*/i, '')
        .replace(/^creator\s*jugs?\s*x\s*/i, '')
        .replace(/^creator\s*jugs?:\s*/i, '')
        .replace(/^pixel\s*cups?\s*x\s*/i, '')
        .replace(/^pixel\s*cups?:\s*/i, '')
        .trim();
}

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

    if (filters.cup_type) {
        result = result.filter(c =>
            c.cup_type === filters.cup_type
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
        result.sort((a, b) =>
            normalizeCupName(a.cup_name)
                .localeCompare(normalizeCupName(b.cup_name))
        );
    }

    if (sortMode === 'ZA') {
        result.sort((a, b) =>
            normalizeCupName(b.cup_name)
                .localeCompare(normalizeCupName(a.cup_name))
        );
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

        document.getElementById('SortAZ').style.backgroundColor = 'darkgray';
        document.getElementById('SortZA').style.backgroundColor = '';

        applyFiltersAndSorting();
    });

    document.getElementById('SortZA').addEventListener('click', () => {
        sortMode = 'ZA';

        document.getElementById('SortZA').style.backgroundColor = 'darkgray';
        document.getElementById('SortAZ').style.backgroundColor = '';

        applyFiltersAndSorting();
    });

    document.getElementById('SortNO').addEventListener('click', () => {
        sortMode = 'NEWEST';

        document.getElementById('SortNO').style.backgroundColor = 'darkgray';
        document.getElementById('SortON').style.backgroundColor = '';

        applyFiltersAndSorting();
    });

    document.getElementById('SortON').addEventListener('click', () => {
        sortMode = 'OLDEST';

        document.getElementById('SortON').style.backgroundColor = 'darkgray';
        document.getElementById('SortNO').style.backgroundColor = '';

        applyFiltersAndSorting();
    });

    document.getElementById('SortCol').addEventListener('click', () => {
        filters.collab = true;

        document.getElementById('SortCol').style.backgroundColor = 'darkgray';
        document.getElementById('SortNCol').style.backgroundColor = '';

        applyFiltersAndSorting();
    });

    document.getElementById('SortNCol').addEventListener('click', () => {
        filters.collab = false;

        document.getElementById('SortNCol').style.backgroundColor = 'darkgray';
        document.getElementById('SortCol').style.backgroundColor = '';

        applyFiltersAndSorting();
    });

    document.getElementById('SortMaP').addEventListener('click', () => {
        filters.material = 'plastic';

        document.getElementById('SortMaP').style.backgroundColor = 'darkgray';
        document.getElementById('SortMaM').style.backgroundColor = '';

        applyFiltersAndSorting();
    });

    document.getElementById('SortMaM').addEventListener('click', () => {
        filters.material = 'metal';

        document.getElementById('SortMaM').style.backgroundColor = 'darkgray';
        document.getElementById('SortMaP').style.backgroundColor = '';

        applyFiltersAndSorting();
    });

    document.getElementById('SortTyC').addEventListener('click', ()       => {
        filters.cup_type = 'cup';

        document.getElementById('SortTyC').style.backgroundColor = 'darkgray';
        document.getElementById('SortTyJ').style.backgroundColor = '';
        document.getElementById('SortTyPx').style.backgroundColor = '';

        applyFiltersAndSorting();
    });

    document.getElementById('SortTyJ').addEventListener('click', ()       => {
        filters.cup_type = 'jug';

        document.getElementById('SortTyJ').style.backgroundColor = 'darkgray';
        document.getElementById('SortTyC').style.backgroundColor = '';
        document.getElementById('SortTyPx').style.backgroundColor = '';

        applyFiltersAndSorting();
    });

    document.getElementById('SortTyPx').addEventListener('click', ()       => {
        filters.cup_type = 'pixel';

        document.getElementById('SortTyPx').style.backgroundColor = 'darkgray';
        document.getElementById('SortTyJ').style.backgroundColor = '';
        document.getElementById('SortTyC').style.backgroundColor = '';

        applyFiltersAndSorting();
    });



        document.getElementById('SortSpf').addEventListener('input', (e) => {
        filters.search = e.target.value.trim().toLowerCase();
        applyFiltersAndSorting();
    });


    document.getElementById('ResetFilters').addEventListener('click', () => {
        filters.material = null;
        filters.cup_type = null;
        filters.search = '';
        filters.collab = null;
        sortMode = null;
        document.getElementById('SortSpf').value = '';

        document.getElementById('SortAZ').style.backgroundColor = '';
        document.getElementById('SortZA').style.backgroundColor = '';
        document.getElementById('SortNO').style.backgroundColor = '';
        document.getElementById('SortON').style.backgroundColor = '';
        document.getElementById('SortCol').style.backgroundColor = '';
        document.getElementById('SortNCol').style.backgroundColor = '';
        document.getElementById('SortMaP').style.backgroundColor = '';
        document.getElementById('SortMaM').style.backgroundColor = '';
        document.getElementById('SortTyC').style.backgroundColor = '';
        document.getElementById('SortTyJ').style.backgroundColor = '';
        document.getElementById('SortTyPx').style.backgroundColor = '';

        applyFiltersAndSorting();
    });



}

document.addEventListener('DOMContentLoaded', async () => {
    await loadCups();
    bindButtons();
});