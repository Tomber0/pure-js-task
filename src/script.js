const images = [];
let termsAccepted = false;
let termsShowed = false;
let resolveTerms = null;
const apiUrl = `http://localhost:8080`;

function acceptTerms() {
    resolveTerms();
}

const acceptTermsOfUse = async (termsOfUse) => {
    const termsContainer = document.getElementById('terms');
    termsOfUse.map((term, index) => {
        let container = document.createElement('div');
        let header = document.createElement('h3');
        header.innerHTML = term.title;
        let text = document.createElement('p');
        if (term.text) {
            text.innerHTML = term.text;
        }
        else {
            text.innerHTML = term.content;
        }
        container.appendChild(header);
        container.appendChild(text);
        termsContainer.append(container);
    });
    return new Promise((resolve, reject) => {
        resolveTerms = resolve;
    });
};

const renderImageToCanvas = async (imageUrl) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            resolve(canvas);
        };
        img.onerror = (error) => {
            reject(error);
        };
    });
};

const saveCanvasAsImage = (canvas, imageName) => {
    const link = document.createElement('a');
    link.download = imageName;
    link.href = canvas.toDataURL('image/png');
    link.click();
};

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching:', error);
    }
}


const setupImageGallery = async () => {
    document.getElementById('acceptButton').onclick = acceptTerms;
    const fetchedData = await fetchData(apiUrl + '/static/json/JSON_DATA.json');
    await acceptTermsOfUse(fetchedData.terms_of_use.paragraphs);
    document.getElementById('termsOfUseContainer').style.display = `none`;
    document.getElementById('mainContentContainer').style.display = `block`;
    for (let image of fetchedData.images) {
        const canvas = await renderImageToCanvas(apiUrl + image.image_url);
        document.body.appendChild(canvas);
        const saveButton = document.createElement('button');
        saveButton.innerText = 'Save Image';
        saveButton.addEventListener('click', () => {
            saveCanvasAsImage(canvas, 'image.png');
        });
        document.body.appendChild(saveButton);
    }
};
setupImageGallery();