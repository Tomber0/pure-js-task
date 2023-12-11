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
