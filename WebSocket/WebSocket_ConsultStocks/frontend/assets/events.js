$(document).ready(() => {
    loadPrototypes()
})

$(document).on('keypress', (e) => {
    if (e.key === 'Enter') emitNewSearch()
})

$(document).on('click', '#search_button', emitNewSearch)

$(document).on('click', '#clear_search_button', () => document.setAttr('.stock-information', 'hidden', true))

$(document).on('click', '.years_price', graphicActions('change_hp_graphic'))

$(document).on('click', '.years_dividend', graphicActions('change_dv_graphic'))

/**
 * @param {string} command 
 * @returns {void}
 */
function graphicActions(command) {
    return (e) => {
        const ticker = document.getValue('search_input')
        const option = e.target.value
        SOCKET_CLIENT.emit(command, { ticker, option })
    }
}

/**
 * @returns {void}
 */
function emitNewSearch() {
    const ticker = document.getValue('search_input')
    if (!ticker) {
        document.setAttr('.stock-information', 'hidden', true)
        return alert('Pesquise alguma ação')
    } 
    SOCKET_CLIENT.emit('new_search', ticker)
}