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
         partialOwners.innerHTML = '<p>This is a Partial Owner of Gamersupps</p>'
        }else{
            consol.log = 'Creator is Partner only';
        }
    }

    renderCreator(data);
}

async function loadCreatorItems(){
    const creatorName = getCreatorFromURL();


    const{data, error} = await supabaseClient
        .from('waifuCups')
        .select('*')
        .eq('partner_name', creatorName);


    if (error || !data || data.length === 0) {
        console.error("This creator doesn't have any GG Items", error);
        return;
    }
    function renderItems(items) {
        const containerItem = document.getElementById('creatorProductArea');

        containerItem.innerHTML = items.map(item => `
            <img width="50%" alt="test" src="${item.cup_preview_image}">
        `).join('');
    }


    renderItems(data);
}

loadCreator();
setTimeout(loadCreatorItems, 500);