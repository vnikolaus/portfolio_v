class Utils {
    /**
     * @param {string} key 
     * @param {{ [k: string]: string | number }} item 
     * @returns {void}
     */
    static setStorage(key, item) {
        item = JSON.stringify(item)
        localStorage.setItem(key, item)
    }

    /**
     * @param {string} key 
     * @returns {{ [k: string]: string | number }}
     */
    static getStorage(key) {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : undefined
    }

    /**
     * @param {number | string} value 
     * @returns {string}
     */
    static formatCurrency(value) {
        if (typeof value === 'string') value = this.stringToNumber(value)
        return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    }

    /**
     * @param {string} value 
     * @returns {number}
     */
    static stringToNumber(value) {
        return +value.replace(/\./g, '').replace(',', '.')
    }

    /**
     * @param {string} id 
     * @param {string} color 
     * @returns {void}
     */
    static changeBackground(id, color) {
        switch (color) {
            case 'red':
                document.removeClass(`#${id}`,'badge-warning')
                document.removeClass(`#${id}`,'badge-success')
                document.removeClass(`#${id}`,'badge-secondary')
                document.addClass(`#${id}`,'badge-danger')
            break;
    
            case 'green':
                document.removeClass(`#${id}`,'badge-danger')
                document.removeClass(`#${id}`,'badge-warning')
                document.removeClass(`#${id}`,'badge-secondary')
                document.addClass(`#${id}`,'badge-success')
            break;

            case 'yellow':
                document.removeClass(`#${id}`,'badge-danger')
                document.removeClass(`#${id}`,'badge-success')
                document.removeClass(`#${id}`,'badge-secondary')
                document.addClass(`#${id}`,'badge-warning')
            break;

            case 'gray':
                document.removeClass(`#${id}`,'badge-danger')
                document.removeClass(`#${id}`,'badge-success')
                document.removeClass(`#${id}`,'badge-warning')
                document.addClass(`#${id}`,'badge-secondary')
            break;
        }
    }
}