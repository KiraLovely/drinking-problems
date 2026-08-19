async function loadArticle() {
    const params = new URLSearchParams(window.location.search);

    const type = params.get('type');
    const slug = params.get('slug');

    const TABLES = {
        partner: 'partner',
        cup: 'waifuCups',
        merch: 'merchItems',
        accessory: 'accessories',
        vcard: 'vcardProducts'
    };

    const table = TABLES[type];

    if (!table) {
        console.error('Unknown article type:', type);
        return;
    }

    const {data, error} = await supabaseClient
        .from(table)
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !data) {
        console.error('Article not found:', error);
        return;
    }

    renderArticle(data, type);

    if(type === 'partner'){
        await loadCreatorItems(data.creator_name);
    }
}

void loadArticle();

//------------------------------------------------------------
function renderPartner(item) {
    let ownerInfo = '';

    if (item.partner_title === 'Partial Owner') {
        ownerInfo = '<p>This is a Partial Owner of Gamersupps!</p>';
    }
    else if (item.partner_title === 'Owner') {
        ownerInfo = '<p>This is the Owner of Gamersupps!</p>';
    }

    return `
        <div id="itemPreview">
            <img src="${item.creator_avatar}" alt="${item.creator_name}">
            <h1>${item.creator_name}</h1>
        </div>
        
        <div id="itemBasicText">
            <p>
                Creator-status:
                <strong>${item.partner_title}</strong>
            </p>
    
            <p>
                Code:
                <strong>${item.creator_code}</strong>
            </p>
    
            <div class="creator-profile">
                <a target="_blank" href = "${item.creator_twitter}">
                Twitter
                </a>
    
                <div class="partialOwnersInfo">
                    ${ownerInfo}
                </div>
            </div> 
        </div>
        <div id="itemExtraText"></div>
    `;
}

async function loadCreatorItems(creatorName){

    const{data: cups} = await supabaseClient
        .from('waifuCups')
        .select('*')
        .eq('partner_name', creatorName);

    const{data: merch} = await supabaseClient
        .from('merchItems')
        .select('*')
        .eq('creatorName', creatorName);

    const{data: accessories} = await supabaseClient
        .from('accessories')
        .select('*')
        .eq('creatorName', creatorName);

    const{data: vcards} = await supabaseClient
        .from('vcardProducts')
        .select('*')
        .eq('creatorName', creatorName);

    const items = [
        ...cups.map(item => ({
            ...item,
            image: item.cup_preview_image,
            name: item.cup_name,
            type: 'cup'
        })),
        ...merch.map(item => ({
            ...item,
            image: item.itemImage,
            name: item.itemName,
            type: 'merch'
        })),
        ...accessories.map(item => ({
            ...item,
            image: item.itemImage,
            name: item.itemName,
            type: 'accessory'
        })),
        ...vcards.map(item => ({
            ...item,
            image: item.itemImage,
            name: item.itemName,
            type: 'vcard'
        }))
    ];
    function renderPartnerItems(items) {
        const containerItem = document.getElementById('creatorProductArea');

        containerItem.innerHTML = items.map(item => `
            <div class="partnerItem">
            <img class="partnerItemPreview" alt="test" src=${item.image}>
            <p>${item.name}</p>
            </div>
        `).join('');
    }


    renderPartnerItems(items);
}


function renderCup(item) {
    return `
       <img src="${item.cup_preview_image}" alt="${item.cup_name}">
        <h1>${item.cup_name}</h1>
        <div>${item.article_text ?? ''}</div>
    `;
}

function renderMerch(item) {
    return `
       <img src="${item.itemImage}" alt="${item.item_name}">
        <h1>${item.item_name}</h1>
        <div>${item.article_text ?? ''}</div>
    `;
}

function renderAccessory(item) {
    return `
        <img src="${item.itemImage}" alt="${item.item_name}">
        <h1>${item.item_name}</h1>
        <div>${item.article_text ?? ''}</div>
    `;
}

function renderVCard(item) {
    return `
        <img src="${item.cardImage}" alt="${item.card_name}">
        <h1>${item.card_name}</h1>
        <div>${item.article_text ?? ''}</div>
    `;
}

//-----------------------------------------------------------
function renderArticle(item, type) {
    const container = document.getElementById('article_content');

    switch (type) {

        case 'partner':
            container.innerHTML = renderPartner(item);
            break;

        case 'cup':
            container.innerHTML = renderCup(item);
            break;

        case 'merch':
            container.innerHTML = renderMerch(item);
            break;

        case 'accessory':
            container.innerHTML = renderAccessory(item);
            break;

        case 'vcard':
            container.innerHTML = renderVCard(item);
            break;

        default:
            container.innerHTML = '<h1>Unknown article type</h1>';
    }
}