function getCreatorFromURL(){
    const params = new URLSearchParams(window.location.search);
    return params.get('creator');
}

async function loadCreator(){
    const creatorName = getCreatorFromURL();

    const{data, error} = await supabaseClient
    .from('partner')
        .select('*')
        .eq('creator_name', creatorName)
        .single();

    if(error || !data){
        console.error('Creator not found:', error);
        return;
    }

    function renderCreator(partner){
        const container = document.getElementById('creatorContainer');
        const avatarContainer = document.getElementById('creatorAvatarContainer')

        avatarContainer.innerHTML = `
            <img src="${partner.creator_avatar}"
                class="creator-avatar-large"
                width="60%"
                alt="${partner.creator_name}'s Profile/Avatar">
                
            <h1>${partner.creator_name}</h1>
            <p>Creator-status: <strong>${partner.partner_title}</strong></p>
            <p>Code: <strong>${partner.creator_code}</strong></p>
        `

        container.innerHTML = `
        <div class="creator-profile">
            <a href="${partner.creator_twitter}">Twitter</a>
            <div class="partialOwnersInfo"></div>
        </div>
        `
        const partialOwners = container.querySelector('.partialOwnersInfo');

        if(partner.partner_title === 'Partial Owner'){
         partialOwners.innerHTML = '<p>This is a Partial Owner of Gamersupps!</p>'
        }else if(partner.partner_title === 'Owner'){
            partialOwners.innerHTML = '<p>This is the Owner of Gamersupps!</p>'
        }else{
            console.log('Creator is Partner only');
        }
    }

    renderCreator(data);
}

async function loadCreatorItems(){
    const creatorName = getCreatorFromURL();


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
            type: 'cup'
        })),
        ...merch.map(item => ({
            ...item,
            image: item.itemImage,
            type: 'merch'
        })),
        ...accessories.map(item => ({
            ...item,
            image: item.itemImage,
            type: 'accessory'
        })),
        ...vcards.map(item => ({
            ...item,
            image: item.itemImage,
            type: 'vcard'
        }))
    ];
    function renderItems(items) {
        const containerItem = document.getElementById('creatorProductArea');

        containerItem.innerHTML = items.map(item => `
            <img alt="test" src=${item.image}>
        `).join('');
    }


    renderItems(items);
}

void loadCreator();
setTimeout(loadCreatorItems, 500);