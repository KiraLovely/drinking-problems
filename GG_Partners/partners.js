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
            <h3>${partner.creator_name}</h3>
            <p><strong>Title:</strong> ${partner.partner_title}</p>
            <p><strong>First appearance:</strong> ${partner.first_appearance}</p>
            <p><strong>Code:</strong>${partner.creator_code}</p>
            <p><strong>Twitter:</strong> 
                <a href="${partner.creator_twitter}" target="_blank">${partner.twitter}</a>
            </p>
        `;

        container.appendChild(card);
    });
}

loadPartners();