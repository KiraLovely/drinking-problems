const params = new URLSearchParams(window.location.search);

const type = params.get('type');
const slug = params.get('slug');


let query;

if (type === 'partner') {
    query = supabaseClient.from('partner');
} else if (type === 'cup') {
    query = supabaseClient.from('waifuCups');
} else if (type === 'merch') {
    query = supabaseClient.from('merchItems');
}

const { data } = await query
    .select('*')
    .eq('slug', slug)
    .single();

function renderArticle(item, type) {
    const container = document.getElementById('article_content');

    if (type === 'partner') {
        container.innerHTML = `
            ${item.creator_avatar}
            <h1>${item.creator_name}</h1>
            <p>${item.partner_title}</p>
            <div>${item.article_text}</div>
        `;
    }

    if (type === 'cup') {
        container.innerHTML = `
            ${item.cup_preview_image}
            <h1>${item.cup_name}</h1>
            <div>${item.article_text}</div>
        `;
    }

    if (type === 'merch') {
        container.innerHTML = `
            <h1>${item.name}</h1>
            <div>${item.article_text}</div>
        `;
    }
}

renderArticle(data, type);