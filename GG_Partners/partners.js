const supabaseUrl = 'https://qxidlnuurcfuqcsvwryb.supabase.co';
const supabaseKey = 'sb_publishable_5WbTkW9HL-1tvaEsg1-WRQ_InP2IoLa';

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

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
            <p title="Creator name - Creator status/title"><strong>${partner.creator_name}</strong> - ${partner.partner_title}</p>
            <p title="Gamersupps partner code"><strong>${partner.creator_code}</strong></p>
            <p title="Date the creator joind GG">${partner.first_appearance}</p>
            <div id="creator_socials">
                <a id="creator_twitter" href="${partner.creator_twitter}" target="_blank"><strong>Twitter</strong></a>
                <a id="creator_twitch" href="${partner.creator_twitch}" target="_blank"><strong>Twitch</strong></a>
                <a id="creator_youtube" href="${partner.creator_youtube}" target="_blank"><strong>Youtube</strong></a>
            </div>
        `;

        container.appendChild(card);
    });
}

loadPartners();