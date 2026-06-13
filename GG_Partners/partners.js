let ALL_PARTNERS = [];
let CURRENT_VIEW = [];

async function loadPartners() {
    const {data, error} = await supabaseClient
        .from('partner')
        .select('*');

    if (error) {
        console.error('Error loading partners:', error);
        return;
    }
    ALL_PARTNERS = data;

    ALL_PARTNERS.sort((a, b) =>
        a.creator_name
            .localeCompare(b.creator_name)
    );

    ALL_PARTNERS.sort((a, b) =>
        a.partner_title
            .localeCompare(b.partner_title)
    );

    CURRENT_VIEW = [...ALL_PARTNERS];

    renderPartners(CURRENT_VIEW);
}

    function renderPartners(partners) {
        const container = document.getElementById('partner-container');
        container.innerHTML = '';

        partners.forEach(partner => {
            const card = document.createElement('div');
            card.classList.add('partner-card');
            // Makes the partner cards clickable, redirecting to partner article page
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

                if (partner.creator_name === 'Shylily') {
                    wompException.style.cursor = 'pointer';

                    wompException.addEventListener('click', () => {
                        const womp = new Audio('../Images/shylily-cute-womp-womp.mp3');
                        womp.play().catch(err => {
                            console.warn("Did not want to womp", err);
                        });
                    });
                }

            container.appendChild(card);
        });
    }


const filters = {
    search: ''
};

function applyFiltersAndSorting() {
    if (!ALL_PARTNERS.length) {
        console.warn('applyFiltersAndSorting called before data loaded');
        return;
    }

    let result = [...ALL_PARTNERS];


    if (filters.search) {
        result = result.filter(c =>
            c.creator_name.toLowerCase().includes(filters.search)
        );
    }

    CURRENT_VIEW = result;
    renderPartners(CURRENT_VIEW);

}

function bindButtons() {
    document.getElementById('partnerSearch').addEventListener('input', (e) => {
        filters.search = e.target.value.trim().toLowerCase();
        applyFiltersAndSorting();
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadPartners();
    bindButtons();
});
