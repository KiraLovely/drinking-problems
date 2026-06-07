async function loadPartners() {
    const { data: partners, error } = await supabaseClient
        .from('partner')
        .select('*');

    if (error) {
        console.error('Error loading partners:', error);
        return;
    }

    const container = document.getElementById('partner-container');
    container.innerHTML = '';

    // Makes the partner cards clickable, redirecting to partner article page
    partners.forEach(partner => {
        const card = document.createElement('div');
        card.classList.add('partner-card');
        card.addEventListener('click', () => {
            const creatorName = encodeURIComponent(partner.creator_name);
            window.location.href = `GG_partnerArticle.html?creator=${creatorName}`
        });


        card.innerHTML = `
            <img src="${partner.creator_avatar}" class="partner-avatar" alt="${partner.creator_name}">
            <p title="Creator name - Creator status/title"><strong>${partner.creator_name} - ${partner.partner_title}</strong></p>
            <p title="Gamersupps partner code"><strong>${partner.creator_code ?? 'Unknown'}</strong></p>
            <p title="Date the creator joind GG"><strong>${partner.first_appearance ?? 'Unknown'}</strong></p>
            <div class="creator_socials">
                <a class="creator-twitter" href="${partner.creator_twitter}" target="_blank">
                <img class='partnerSocialsIcon' alt="Twitter Logo" src="../Images/X_Logo.png">
                </a>
                <a class="creator-twitch" href="${partner.creator_twitch}" target="_blank">
                <img class='partnerSocialsIcon' alt="Twitter Logo" src="../Images/twitch.png">
                </a>
                <a class="creator-youtube" href="${partner.creator_youtube}" target="_blank">
                <img class='partnerSocialsIcon' alt="Twitter Logo" src="../Images/youtube.png">
            </div>
            </a>
        `

        // Makes it so the avatar and socials from the card aren't redirecting to the partner article page
        const creatorAvatar = card.querySelector('.partner-avatar');
        creatorAvatar.addEventListener('click', (event) => {
            event.stopPropagation();
            console.log('Avatar was clicked');
        });

        const creatorSocials = card.querySelector('.creator_socials');
        creatorSocials.addEventListener('click', (event) => {
           event.stopPropagation();
           console.log('Checked out Socials');
        });

        // WOMP WOMP SFX :3
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