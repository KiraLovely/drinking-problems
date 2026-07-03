let ALL_MERCH_ITEMS = [];
let CURRENT_VIEW = [];

async function getImage(name) {
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
    const logo = await getImage('merchTopBanner');
    const fallBack = 'Sorry! Image was unable to load properly!';

    document.getElementById('merchBannerImg').src = logo || fallBack;
});

//--------------------------------------------------------------------------------------------------

async function loadMerch(){
    const { data, error } = await supabaseClient
        .from('merchItems')
        .select('*');

    if (error) {
        console.error('Error loading Merch Items:', error);
        return;
    }

    ALL_MERCH_ITEMS = data;
    CURRENT_VIEW = [...ALL_MERCH_ITEMS];

    renderMerchItems(CURRENT_VIEW);
}

function renderMerchItems(merchItems){
    const container = document.getElementById('merchContainer');
    container.innerHTML = '';

    merchItems.forEach(items => {
        const card = document.createElement('div');
        card.classList.add('merchItem-card');

        card.innerHTML = `
      <img src="${items.itemImage}" class="cup-preview" alt="${items.itemName}">
      <h4>${items.itemName}</h4>
      <p>Creator: ${items.creatorName ?? 'Gamersupps Original'}</p>
      <p>${items.isWhat ?? 'Unknown'}</p>
    `;

        container.appendChild(card);
    });
}

//--------------------------------------------------------------------------------------------------


const filters = {
    search: '',
    collab: null,
};

let sortMode = null;

function applyFiltersAndSorting(){
    if (!ALL_MERCH_ITEMS.length){
        console.warn('applyFiltersAndSorting called before data loaded');
        return;
    }

    let result = [...ALL_MERCH_ITEMS];

    if (sortMode === 'AZ') {
        result.sort((a, b) =>
            a.itemName
                .localeCompare(b.itemName)
        );
    }

    if (sortMode === 'ZA') {
        result.sort((a, b) =>
            b.itemName
                .localeCompare(a.itemName)
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

    if (filters.collab !== null) {
        result = result.filter(c =>
            c.collab_item === filters.collab
        );
    }

    if (filters.search) {
        result = result.filter(c =>
            c.itemName.toLowerCase().includes(filters.search)
        );
    }

    CURRENT_VIEW = result;
    renderMerchItems(CURRENT_VIEW);
}

function bindButtons(){
    document.getElementById('merchSortAZ').addEventListener('click', () => {
        sortMode = 'AZ';

        document.getElementById('merchSortAZ').style.backgroundColor = '#41126f';
        document.getElementById('merchSortZA').style.backgroundColor = '';

        applyFiltersAndSorting();
    })

    document.getElementById('merchSortZA').addEventListener('click', () => {
        sortMode = 'ZA';

        document.getElementById('merchSortZA').style.backgroundColor = '#41126f';
        document.getElementById('merchSortAZ').style.backgroundColor = '';

        applyFiltersAndSorting();
    })

    document.getElementById('merchSortNO').addEventListener('click', () => {
        sortMode = 'NEWEST';

        document.getElementById('merchSortNO').style.backgroundColor = '#41126f';
        document.getElementById('merchSortON').style.backgroundColor = '';

        applyFiltersAndSorting();
    })

    document.getElementById('merchSortON').addEventListener('click', () => {
        sortMode = 'OLDEST';

        document.getElementById('merchSortON').style.backgroundColor = '#41126f';
        document.getElementById('merchSortNO').style.backgroundColor = '';

        applyFiltersAndSorting();
    })

    document.getElementById('merchSortCol').addEventListener('click', () => {
        filters.collab = true;

        document.getElementById('merchSortCol').style.backgroundColor = '#41126f';
        document.getElementById('merchSortNCol').style.backgroundColor = '';

        applyFiltersAndSorting();
    });

    document.getElementById('merchSortNCol').addEventListener('click', () => {
        filters.collab = false;

        document.getElementById('merchSortNCol').style.backgroundColor = '#41126f';
        document.getElementById('merchSortCol').style.backgroundColor = '';

        applyFiltersAndSorting();
    });

    document.getElementById('merchSortSearch').addEventListener('input', (e) => {
        filters.search = e.target.value.trim().toLowerCase();
        applyFiltersAndSorting();
    });

    document.getElementById('merchResetFilters').addEventListener('click', () => {
        filters.collab = null;
        filters.search = '';
        sortMode = null;

        document.getElementById('merchSortAZ').style.backgroundColor = '';
        document.getElementById('merchSortZA').style.backgroundColor = '';
        document.getElementById('merchSortNO').style.backgroundColor = '';
        document.getElementById('merchSortON').style.backgroundColor = '';
        document.getElementById('merchSortCol').style.backgroundColor = '';
        document.getElementById('merchSortNCol').style.backgroundColor = '';


        applyFiltersAndSorting();
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadMerch();
    bindButtons();
});