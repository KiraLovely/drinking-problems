fetch('http://localhost/gamersupps-api/get_partners.php')
    .then(response => response.json())
    .then(partners => {
        const container = document.getElementById('partner-container');

        partners.forEach(partner => {
            const card = document.createElement('div');
            card.classList.add('partner-card');

            card.innerHTML = `
            <img src="${partner.avatar_url}" class="partner-avatar" alt="${partner.name}">
            <h3>${partner.name}</h3>
            <p><strong>Status:</strong> ${partner.status}</p>
            <p><strong>First appearance:</strong> ${partner.first_appearance}</p>
            <p><strong>Twitter:</strong> <a href="${partner.socials?.twitter}" target="_blank">${partner.socials?.twitter}</a></p>
          `;

            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error loading partners:', error);
    });