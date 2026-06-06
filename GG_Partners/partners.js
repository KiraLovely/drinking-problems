async function loadPartners() {
    const { data: partners, error } = await supabaseClient
        .from('partner') //Table Name
        .select('*');

    if (error) {
        console.error('Error loading partners:', error);
        return;
    }

    const container = document.getElementById('partner-container');
    container.innerHTML = '';

    partners.forEach(partner => {
        const card = document.createElement('div');
        card.classList.add('partner-card');

        card.innerHTML = `
            <img src="${partner.creator_avatar}" class="partner-avatar" alt="${partner.creator_name}">
            <p title="Creator name - Creator status/title"><strong>${partner.creator_name} - ${partner.partner_title}</strong></p>
            <p title="Gamersupps partner code"><strong>${partner.creator_code ?? 'Unknown'}</strong></p>
            <p title="Date the creator joind GG"><strong>${partner.first_appearance ?? 'Unknown'}</strong></p>
            <div id="creator_socials">
                <a id="creator_twitter" href="${partner.creator_twitter}" target="_blank">
                <img class='partnerSocialsIcon' alt="Twitter Logo" src="../Images/X_Logo.png">
                </a>
                <a id="creator_twitch" href="${partner.creator_twitch}" target="_blank">
                <img class='partnerSocialsIcon' alt="Twitter Logo" src="../Images/twitch.png">
                </a>
                <a id="creator_youtube" href="${partner.creator_youtube}" target="_blank">
                <img class='partnerSocialsIcon' alt="Twitter Logo" src="../Images/youtube.png">
                </a>
            </div>
        `

        // WOMP WOMP SFX
        const wompException = card.querySelector('.partner-avatar');

        if(partner.creator_name === 'Shylily'){
            wompException.style.cursor = 'pointer';

            wompException.addEventListener('click', () => {
                const womp = new Audio('../Images/shylily-cute-womp-womp.mp3');
                womp.play();
            });
        }

        container.appendChild(card);
    });
}

loadPartners();