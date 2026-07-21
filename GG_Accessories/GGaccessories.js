let ALL_ACCESSORIES_ITEMS = [];
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
    const logo = await getImage('accessoriesTopBanner');
    const fallBack = 'Sorry! Image was unable to load properly!';

    document.getElementById('accessoriesBannerImg').src = logo || fallBack;
});

//--------------------------------------------------------------------------------------------------

async function loadAccessories(){
    const { data, error } = await supabaseClient
        .from('accessories')
        .select('*');

    if (error) {
        console.error('Error loading Accessories:', error);
        return;
    }

    ALL_ACCESSORIES_ITEMS = data;
    CURRENT_VIEW = [...ALL_ACCESSORIES_ITEMS];

    renderAccessories(CURRENT_VIEW);
}

function renderAccessories(accessories){
    const container = document.getElementById('accessoriesContainer');
    container.innerHTML = '';

    accessories.forEach(items => {
        const card = document.createElement('div');
        card.classList.add('accessoireItem-card');

        card.innerHTML = `
      <img src="${items.itemImage}" class="accessoireItem-preview" alt="${items.itemName}">
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
    accessoireType: null,
};

let sortMode = null;

function applyFiltersAndSorting(){
    if (!ALL_ACCESSORIES_ITEMS.length){
        console.warn('applyFiltersAndSorting called before data loaded');
        return;
    }

    let result = [...ALL_ACCESSORIES_ITEMS];

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

    if (filters.accessoireType) {
        result = result.filter(item =>
            item.isWhat === filters.accessoireType
        );
    }

    if (filters.search) {
        result = result.filter(c =>
            c.itemName.toLowerCase().includes(filters.search)
        );
    }

    CURRENT_VIEW = result;
    renderAccessories(CURRENT_VIEW);
}

function bindButtons(){
    document.getElementById('accessoriesSortAZ').addEventListener('click', () => {
        sortMode = 'AZ';

        document.getElementById('accessoriesSortAZ').style.backgroundColor = '#41126f';
        document.getElementById('accessoriesSortZA').style.backgroundColor = '';

        applyFiltersAndSorting();
    })

    document.getElementById('accessoriesSortZA').addEventListener('click', () => {
        sortMode = 'ZA';

        document.getElementById('accessoriesSortZA').style.backgroundColor = '#41126f';
        document.getElementById('accessoriesSortAZ').style.backgroundColor = '';

        applyFiltersAndSorting();
    })

    document.getElementById('accessoriesSortNO').addEventListener('click', () => {
        sortMode = 'NEWEST';

        document.getElementById('accessoriesSortNO').style.backgroundColor = '#41126f';
        document.getElementById('accessoriesSortON').style.backgroundColor = '';

        applyFiltersAndSorting();
    })

    document.getElementById('accessoriesSortON').addEventListener('click', () => {
        sortMode = 'OLDEST';

        document.getElementById('accessoriesSortON').style.backgroundColor = '#41126f';
        document.getElementById('accessoriesSortNO').style.backgroundColor = '';

        applyFiltersAndSorting();
    })

    document.getElementById('accessoriesSortCol').addEventListener('click', () => {
        filters.collab = true;

        document.getElementById('accessoriesSortCol').style.backgroundColor = '#41126f';
        document.getElementById('accessoriesSortNCol').style.backgroundColor = '';

        applyFiltersAndSorting();
    });

    document.getElementById('accessoriesSortNCol').addEventListener('click', () => {
        filters.collab = false;

        document.getElementById('accessoriesSortNCol').style.backgroundColor = '#41126f';
        document.getElementById('accessoriesSortCol').style.backgroundColor = '';

        applyFiltersAndSorting();
    });

    document.getElementById('accessoriesIsWhatSelection').addEventListener('change', (e) => {
        const value = e.target.value;

        filters.accessoireType = value || null;

        applyFiltersAndSorting();
    })

    document.getElementById('accessoriesSortSearch').addEventListener('input', (e) => {
        filters.search = e.target.value.trim().toLowerCase();
        applyFiltersAndSorting();
    });

    document.getElementById('accessoriesResetFilters').addEventListener('click', () => {
        filters.collab = null;
        filters.search = '';
        filters.accessoireType = null;
        sortMode = null;

        document.getElementById('accessoriesSortAZ').style.backgroundColor = '';
        document.getElementById('accessoriesSortZA').style.backgroundColor = '';
        document.getElementById('accessoriesSortNO').style.backgroundColor = '';
        document.getElementById('accessoriesSortON').style.backgroundColor = '';
        document.getElementById('accessoriesSortCol').style.backgroundColor = '';
        document.getElementById('accessoriesSortNCol').style.backgroundColor = '';


        applyFiltersAndSorting();
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadAccessories();
    bindButtons();
});