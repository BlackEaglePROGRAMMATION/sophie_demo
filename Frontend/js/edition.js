const banner = document.querySelector('.banner');
const btnOpen_modal = document.querySelector('.btnOpen-modal');
const containerFilter = document.querySelector('.container-filter');

const modal = document.querySelector('.sect-modal');
const container_modal = document.querySelector('.sect-modal .container');

const btnClose_modal = document.querySelector('.sect-modal .fa-xmark');
const btnReturn_modal = document.querySelector('.sect-modal .fa-arrow-left');

const title_modal = document.querySelector('.sect-modal h3');

const btn_pageOne = document.querySelector('.btn-pageOne');
const btn_pageTwo = document.querySelector('.btn-pageTwo');

const token = sessionStorage.getItem('token');

function modeEdition() {
    if (!token) {
        return;
    }

    const btn_login = document.querySelector('.btn-login');
    const btn_logout = document.querySelector('.btn-logout');

    btn_login.style.display = 'none';
    btn_logout.style.display = 'flex';

    btn_logout.addEventListener('click', () => {
        sessionStorage.removeItem('token');    
        location.reload();    
    });

    banner.style.display = 'flex';
    btnOpen_modal.style.display = 'flex';
    containerFilter.style.display = 'none';

    btnOpen_modal.addEventListener('click', () => {
        modal.style.display = 'flex';
        addFirstPage();
    });

    btn_pageOne.addEventListener('click', () => {
        container_modal.classList.add('second-page');
        container_modal.classList.remove('first-page');
        addSecondPage();
    });

    btn_pageTwo.addEventListener('click', () => {
        // addNewProject();
    });

    btnReturn_modal.addEventListener('click', () => {
        addFirstPage();
    });

    btnClose_modal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

modeEdition();


const addFiguresEdit = async () => {
    // const figures = await fetchFigures();
    const figures = works;

    container_modal.innerHTML = '';

    for (let i = 0; i < figures.length; i++) {
        const newFigure = document.createElement('figure');
        newFigure.dataset.id = figures.id;

        newFigure.innerHTML = `
            <i class="fas fa-trash-can" data-id='${figures.id}'></i>
            <img class='figure' src="./assets/works/${i + 1}.png" alt="${figures.name}">            
        `;

        container_modal.appendChild(newFigure);
    }

    // gestionDeleteProject();
}

function addFirstPage() {
    btn_pageOne.style.display = 'flex';
    btn_pageTwo.style.display = 'none';

    btnReturn_modal.style.display = 'none';
    title_modal.textContent = 'Galerie photo';

    container_modal.classList.add('first-page');
    container_modal.classList.remove('second-page');

    addFiguresEdit();
}

async function addSecondPage() {
    // const categories = await fetchCategories();

    btnReturn_modal.style.display = 'flex';
    title_modal.textContent = 'Ajout photo';

    btn_pageOne.style.display = 'none';
    btn_pageTwo.style.display = 'flex';

    container_modal.innerHTML = `
        <div class='container-inputImg'>
            <i class='fas fa-image'></i>
            <label>+ Ajouter une photo</label>
            <p>jpg, png : 4mo max</p>
            <input type='file'>
        </div>

        <label class='title'>Titre</label>
        <input class='input-title' type='text'>

        <label class='categories'>Catégorie</label>
        <select>
            ${categories.map((category) => `<option value="${category.id}">${category.name}</option>`)}
        </select>
    `;

    gestionPreview();
}

const gestionPreview = () => {
    const container_input = document.querySelector('.container-inputImg');
    const input_img = document.querySelector('.container-inputImg input');
    const image = document.createElement('img');

    input_img.addEventListener('change', () => {
        if (!input_img.files[0]) {
            return;
        }

        const data_img = input_img.files[0];

        const preview = new FileReader();
        preview.readAsDataURL(data_img);

        preview.onload = () => {
            image.src = preview.result;
            container_input.appendChild(image);
        };
    });
}

const addNewProject = () => {
    const image = document.querySelector('input[type=file]');
    const name = document.querySelector('.input-title').value;
    const category = document.querySelector('.modal select').value;

    if (!image.files[0] || name === '') {
        return;
    }

    const formData = new FormData();

    formData.append('name', name);
    formData.append('category', category);
    formData.append('image', image.files[0]);

    fetch("https://api.corentin-beaudet.fr/db_sophie-bruel", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
    });
}

const gestionDeleteProject = () => {
    const all_btnDelete = document.querySelectorAll('.fa-trash-can');

    for (let button of all_btnDelete) {
        button.addEventListener('click', () => {
            fetch(`https://api.corentin-beaudet.fr/db_sophie-bruel/${button.dataset.id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
        });
    }
}