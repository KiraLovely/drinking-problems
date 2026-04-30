const supabaseUrl = 'https://qxidlnuurcfuqcsvwryb.supabase.co';
const supabaseKey = 'sb_publishable_5WbTkW9HL-1tvaEsg1-WRQ_InP2IoLa';

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

async function loadWaifuCups() {
    const { data: waifuCup, error } = await supabaseClient
        .from('waifuCups') //Table Name
        .select('*');

    if (error) {
        console.error('Error loading Cups:', error);
        return;
    }

    const container = document.getElementById('waifucup-container');
    container.innerHTML = '';

    waifuCup.forEach(waifuCup => {
        const card = document.createElement('div');
        card.classList.add('waifuCup-card');

        card.innerHTML = `
            <img src="${waifuCup.cup_preview_image}" class="waifucup-preview" alt="${waifuCup.cup_name}">
            <h3>${waifuCup.cup_name}</h3>
            <p><strong>Partner/Creator Name:</strong> ${waifuCup.partner_name}</p>
            <p><strong>Artist: </strong>${waifuCup.artist_name}</p>
        `;

        container.appendChild(card);
    });
}

loadWaifuCups();