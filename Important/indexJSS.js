// --------- Images pull DB ---------

async function getImage(name) {
    const { data, error } = await supabaseClient
        .from('loreLeakageImages')
        .select('image_url')
        .eq('image_name', name)
        .single();

    if (error || !data) {
        console.error('Image load failed:', name, error);
        return null;
    }

    return data.image_url;
}

document.addEventListener('DOMContentLoaded', async () => {
    const logo = await getImage('loreLeakageLogo');
    const fallBack = 'Sorry! Image was unable to load properly!';

    document.getElementById('mainLogo').src = logo || fallBack;
});


// --------- Tiny moving image maker for landing-page background ---------

const images = [
    "Images/test/bg1.png",
    "Images/test/bg2.jpg",
    "Images/test/bg3.jpg",
    "Images/test/bg4.png",
    "Images/test/bg5.png",
    "Images/test/bg6.png"
];

const container = document.getElementById("bg-container");
const rect = container.getBoundingClientRect();
const count = 45; // number of images

for (let i = 0; i < count; i++) {
    const img = document.createElement("img");
    img.src = images[Math.floor(Math.random() * images.length)];
    img.className = "bg-image";

    img.style.setProperty("--x-start", `${Math.random() * rect.width}px`);
    img.style.setProperty("--y-start", `${Math.random() * rect.height}px`);
    img.style.setProperty("--x-end", `${Math.random() * rect.width}px`);
    img.style.setProperty("--y-end", `${Math.random() * rect.height}px`);

    const scale = 0.5 + Math.random() * 0.8;
    img.style.transform = `scale(${scale})`;
    img.style.animationDuration = `${40 + Math.random() * 60}s`;

    img.style.animationDuration = `${30 + Math.random() * 40}s`;

    container.appendChild(img);
}