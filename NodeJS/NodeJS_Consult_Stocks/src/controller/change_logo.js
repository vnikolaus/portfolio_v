async function changeLogo(symbol) {
    if(symbol === 'SANB4') symbol = 'SANB11'
    let logo = document.querySelector('.logo');

    logo.hidden = false;
    logo.setAttribute('src', `../src/components/img/${symbol}.svg`);
}

export default changeLogo;