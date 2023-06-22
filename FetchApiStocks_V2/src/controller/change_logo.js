async function changeLogo(symbol) {
    let logo = document.querySelector('.logo');

    logo.hidden = false;
    logo.setAttribute('src', `../src/components/img/${symbol}.svg`);
}

export default changeLogo;