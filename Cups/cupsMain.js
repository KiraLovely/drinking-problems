const supabaseUrl = 'https://qxidlnuurcfuqcsvwryb.supabase.co';
const supabaseKey = 'sb_publishable_5WbTkW9HL-1tvaEsg1-WRQ_InP2IoLa';

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

async function loadCups() {
    const { data: Cup, error } = await supabaseClient
        .from('waifuCups') //Table Name
        .select('*');

    if (error) {
        console.error('Error loading Cups:', error);
        return;
    }
    const container = document.getElementById('plastic_container');
    container.innerHTML = '';

    Cup.forEach(Cup => {
        const card = document.createElement('div');
        card.classList.add('cup-card');

        card.innerHTML = `
            <img src="${Cup.cup_preview_image}" class="cup-preview" alt="${Cup.cup_name}">
            <h3>${Cup.cup_name}</h3>
            <p><strong>Creator name:</strong> ${Cup.partner_name}</p>
            <p><strong>Artist: </strong>${Cup.artist_name}</p>
        `;

        container.appendChild(card);
    });


}

loadCups();