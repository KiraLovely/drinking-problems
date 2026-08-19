let ALL_VCARD_ITEMS = [];
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
    const logo = await getImage('vcardTopBanner');
    const fallBack = 'Sorry! Image was unable to load properly!';

    document.getElementById('vcardMainBanner').src = logo || fallBack;
});

//--------------------------------------------------------------------------------------------------

async function loadVCardItems(){
    const { data, error } = await supabaseClient
        .from('vcardProducts')
        .select('*');

    if (error) {
        console.error('Error loading VCard Items:', error);
        return;
    }

    ALL_VCARD_ITEMS = data;
    CURRENT_VIEW = [...ALL_VCARD_ITEMS];

    renderVCardItems(CURRENT_VIEW);
}

function renderVCardItems(vcardItems){
    const container = document.getElementById('vcardContainer');
    container.innerHTML = '';

    vcardItems.forEach(items => {
        const card = document.createElement('div');
        card.classList.add('vcardItem-card');
        card.style.cursor = 'pointer'
        // Makes the cards clickable, redirecting to article page
        card.addEventListener('click', () => {
            window.location.href =
                `../archiveArticle.html?type=vcard&slug=${items.slug}`;
        });

        card.innerHTML = `
      <img src="${items.itemImage}" class="vcardItem-preview" alt="${items.itemName}">
      <h4>${items.itemName}</h4>
      <p>Creator: ${items.creatorName ?? 'Gamersupps Original'}</p>
      <p>${items.isWhichAccessorie ?? items.isWhichMerch ?? 'Error Card'}</p>
    `;

        container.appendChild(card);
    });
}

//--------------------------------------------------------------------------------------------------


const filters = {
    search: '',
    collab: null,
    isWhichAccessorie: null,
    isWhichMerch: null,
    isWhichSet: null,
    isCard: null,
};

let sortMode = null;

function normalizeVCardName(name) {
    if (!name) return '';

    return name
        .replace(/^vcard/i, '')
        .trim();
}

function applyFiltersAndSorting(){
    if (!ALL_VCARD_ITEMS.length){
        console.warn('applyFiltersAndSorting called before data loaded');
        return;
    }

    let result = [...ALL_VCARD_ITEMS];

    if (sortMode === 'AZ') {
        result.sort((a, b) =>
            normalizeVCardName(a.itemName)
                .localeCompare(normalizeVCardName(b.itemName))
        );
    }

    if (sortMode === 'ZA') {
        result.sort((a, b) =>
                normalizeVCardName(b.itemName)
                .localeCompare(normalizeVCardName(a.itemName))
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

    if (filters.vcardAccessories) {
        result = result.filter(item =>
            item.isWhichAccessorie === filters.vcardAccessories
        );
    }

    if (filters.vcardMerch) {
        result = result.filter(item =>
            item.isWhichMerch === filters.vcardMerch
        );
    }

    if (filters.vcardSet) {
        result = result.filter(item =>
            item.isWhatSet === filters.vcardSet
        );
    }

    if (filters.isCard !== null) {
        result = result.filter(c =>
            c.isCard === filters.isCard
        );
    }

    if (filters.search) {
        result = result.filter(c =>
            c.itemName.toLowerCase().includes(filters.search)
        );
    }

    CURRENT_VIEW = result;
    renderVCardItems(CURRENT_VIEW);
}

function bindButtons(){
    document.getElementById('vcardSortAZ').addEventListener('click', () => {
        sortMode = 'AZ';

        document.getElementById('vcardSortAZ').style.backgroundColor = '#41126f';
        document.getElementById('vcardSortZA').style.backgroundColor = '';

        applyFiltersAndSorting();
    })

    document.getElementById('vcardSortZA').addEventListener('click', () => {
        sortMode = 'ZA';

        document.getElementById('vcardSortZA').style.backgroundColor = '#41126f';
        document.getElementById('vcardSortAZ').style.backgroundColor = '';

        applyFiltersAndSorting();
    })

    document.getElementById('vcardSortNO').addEventListener('click', () => {
        sortMode = 'NEWEST';

        document.getElementById('vcardSortNO').style.backgroundColor = '#41126f';
        document.getElementById('vcardSortON').style.backgroundColor = '';

        applyFiltersAndSorting();
    })

    document.getElementById('vcardSortON').addEventListener('click', () => {
        sortMode = 'OLDEST';

        document.getElementById('vcardSortON').style.backgroundColor = '#41126f';
        document.getElementById('vcardSortNO').style.backgroundColor = '';

        applyFiltersAndSorting();
    })

    document.getElementById('vcardSortEC').addEventListener('click', () => {
        filters.isCard = true;

        document.getElementById('vcardSortEC').style.backgroundColor = '#41126f';

        applyFiltersAndSorting();
    });

    document.getElementById('vcardAccessories').addEventListener('change', (e) => {
        const value = e.target.value;

        filters.vcardAccessories = value || null;

        applyFiltersAndSorting();
    })

    document.getElementById('vcardMerch').addEventListener('change', (e) => {
        const value = e.target.value;

        filters.vcardMerch = value || null;

        applyFiltersAndSorting();
    })

    document.getElementById('vcardSet').addEventListener('change', (e) => {
        const value = e.target.value;

        filters.vcardSet = value || null;

        applyFiltersAndSorting();
    })

    document.getElementById('vcardSearch').addEventListener('input', (e) => {
        filters.search = e.target.value.trim().toLowerCase();
        applyFiltersAndSorting();
    });

    document.getElementById('ResetFilters').addEventListener('click', () => {
        filters.collab = null;
        filters.search = '';
        filters.vcardAccessories = null;
        filters.vcardMerch = null;
        filters.vcardSet = null;
        filters.isCard = null;
        sortMode = null;

        document.getElementById('vcardSortAZ').style.backgroundColor = '';
        document.getElementById('vcardSortZA').style.backgroundColor = '';
        document.getElementById('vcardSortNO').style.backgroundColor = '';
        document.getElementById('vcardSortON').style.backgroundColor = '';
        document.getElementById('vcardSortEC').style.backgroundColor = '';


        applyFiltersAndSorting();
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadVCardItems();
    bindButtons();
});