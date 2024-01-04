// async function fetchCategories() {
//     const req = await fetch(`https://api.corentin-beaudet.fr/ctg_sophie-bruel`);
//     const res = await req.json();
//     return res;
// }

// async function fetchFigures() {
//     const req = await fetch(`https://api.corentin-beaudet.fr/bd_sophie-bruel`);
//     const res = await req.json();
//     return res;
// }

const addCategories = async () => {
    // const categories = await fetchCategories();
    const containerFilter = document.querySelector('.container-filter');

    for (let category of categories) {
        const filter = document.createElement('button');
        filter.textContent = category.name;

        containerFilter.appendChild(filter);
    }

    return containerFilter.children;
}

const gallery = document.querySelector('.gallery');

const addFigures = async (figures, container, staticCount) => {
    for (let i = 0; i < figures.length; i++) {
        const newFigure = document.createElement('figure');
        newFigure.dataset.id = figures[i].id;

        newFigure.innerHTML = `            
            <img src="./assets/works/${staticCount[i] + 1}.png" alt="${figures[i].title}">
            <figcaption>${figures[i].title}</figcaption>
        `;

        container.appendChild(newFigure);
    }
}

async function filterFigures() {
    // const figures = await fetchFigures();
    const figures = works;
    let staticCount = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    addFigures(figures, gallery, staticCount);    

    const filters = await addCategories();

    for (let i = 0; i < filters.length; i++) {
        filters[i].addEventListener('click', () => {
            
            setFilterActif(filters, i);
            gallery.innerHTML = '';

            if (i === 0) {
                staticCount = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                addFigures(figures, gallery, staticCount);
                return;
            }

            staticCount = [];
            const newGallery = figures.filter((data) => {
                data.categoryId === i && staticCount.push(data.id - 1);
                return data.categoryId === i;
            });
            addFigures(newGallery, gallery, staticCount);
        });
    }
}

filterFigures();

function setFilterActif(buttons, idx) {
    for (let button of buttons) {
        button.className = '';
    }

    buttons[idx].className = 'actif';
}

const formContact = document.querySelector('#contact');

formContact.addEventListener('submit', (e) => {
    e.preventDefault();
});