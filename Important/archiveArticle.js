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

    if (type === 'partner') {
        await loadCreatorItems(data.creator_name);
    }
}

void loadArticle();

//------------------------------------------------------------
function renderPartner(item) {
    let ownerInfo = '';

    if (item.partner_title === 'Partial Owner') {
        ownerInfo =
            'From different sources, it is stated that ' +
            item.creator_name + ' apparently owns about ' +
            item.equityShares_percentage +
            ' of shares of Gamersupps. Percentages are not yet confirmed by Gamersupps.';
    } else if (item.partner_title === 'Owner') {
        ownerInfo =
            'From different sources, it is stated that he owns about 70% of the companies-shares. This is not yet confirmed by Gamersupps.' +
            '<br>JSchlatt is not one of the original founders of GG. He acquired all his shares in May 2022.';
    } else if (item.partner_title === 'Partner' && item.equityShares_percentage !== '') {
        ownerInfo =
            'This creator was a partial Owner until' +
            item.equitySharesSellingDate + '. From different sources, it is stated that ' +
            item.creator_name + ' apparently had owned about ' +
            item.equityShares_percentage + ' of shares of Gamersupps. Percentages were not confirmed by Gamersupps.';
    }

    return `
        <div id="itemPreview">
            <img style="border-radius: 6%" height="350rem" src="${item.creator_avatar}" alt="${item.creator_name}">
            <h2>
                <strong>Code:</strong>
                ${item.creator_code}
            </h2>
        </div>
        
        <div id="itemBasicText">
            <h1>${item.creator_name}</h1>
            <p>
                <strong>First-appearance:</strong>
                ${item.first_appearance}
            </p>
            <p>
                <strong>Creator-status:</strong>
                ${item.partner_title}
            </p>
            
            <div class="partialOwnersInfo">
                    ${ownerInfo}
            </div>
            <hr>
                
            <div class="creatorSocials"> 
                <a target="_blank" href = "${item.creator_twitter}">
                Twitter
                </a>
                <a target="_blank" href = "${item.creator_youtube}">
                YouTube
                </a>
                <a target="_blank" href = "${item.creator_twitch}">
                Twitch
                </a>
            </div> 
        </div>
        
        <div id="itemExtraText">${item.extraInfo}</div>
    `;
}

async function loadCreatorItems(creatorName) {

    const {data: cups} = await supabaseClient
        .from('waifuCups')
        .select('*')
        .eq('partner_name', creatorName);

    const {data: merch} = await supabaseClient
        .from('merchItems')
        .select('*')
        .eq('creatorName', creatorName);

    const {data: accessories} = await supabaseClient
        .from('accessories')
        .select('*')
        .eq('creatorName', creatorName);

    const {data: vcards} = await supabaseClient
        .from('vcardProducts')
        .select('*')
        .eq('creatorName', creatorName);

    const items = [
        ...cups.map(item => ({
            ...item,
            image: item.cup_preview_image,
            name: item.cup_name,
            url: item.slug,
            type: 'cup',
        })),
        ...merch.map(item => ({
            ...item,
            image: item.itemImage,
            name: item.itemName,
            url: item.slug,
            type: 'merch',
        })),
        ...accessories.map(item => ({
            ...item,
            image: item.itemImage,
            name: item.itemName,
            url: item.slug,
            type: 'accessory',
        })),
        ...vcards.map(item => ({
            ...item,
            image: item.itemImage,
            name: item.itemName,
            url: item.slug,
            type: 'vcard',
        }))
    ];

    function renderPartnerItems(items) {
        const containerItem = document.getElementById('creatorProductArea');

        containerItem.innerHTML = items.map(item => `
            <div class="partnerItem"
                 onclick="window.location.href='../archiveArticle.html?type=${item.type}&slug=${item.url}'"
                 style="cursor: pointer">
                 
            <img class="partnerItemPreview" alt="test" src=${item.image}>
            <p>${item.name}</p>
            </div>
        `).join('');
    }


    renderPartnerItems(items);
}


function renderCup(item) {
    let collabCreatorInfo = '';

    let finalDate = '';
    let cupDate = item.release_date;
    let preOrderWindow = Temporal.PlainDate.from(cupDate);
    preOrderWindow = preOrderWindow.add({ days: 14});

    if (item.collab_cup === true) {
        collabCreatorInfo = '<strong>Collaborating Creator(s):</strong> ' +  item.partner_name;
    } else {
        collabCreatorInfo = '<strong>Gamersupps Original Creation</strong>';
    }

    if (item.isPreOrder === true){
        finalDate = `<strong>Estimated pre-order window:</strong> ${item.release_date} until ${preOrderWindow}`;
    }else {
        finalDate = '<strong>Release date: </strong>' + item.release_date;
    }

    return `
        <div id="itemPreview">
            <img height="400rem" src="${item.cup_preview_image}" alt="${item.cup_name}">
        </div>
        
        <div id="itemBasicText">
            <h1>${item.cup_name}</h1>
            <p>${collabCreatorInfo}</p>
            <p><strong>Cup-art Artist(s):</strong> ${item.artist_name}</p>
            <p>${finalDate}</p>
        </div>
        
        <div id="itemExtraText">${item.article_text ?? ''}</div>
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
        <img src="${item.itemImage}" alt="${item.itemName}">
        <h1>${item.itemName}</h1>
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