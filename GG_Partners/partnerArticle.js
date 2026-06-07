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
        `

        container.innerHTML = `
        <div class="creator-profile">
            <h2>Code: ${partner.creator_code}</h2>
        </div>
        `
    }

    renderCreator(data);
}

loadCreator();