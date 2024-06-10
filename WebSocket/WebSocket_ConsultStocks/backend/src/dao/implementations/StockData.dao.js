/**
 * @typedef {{ [k: string]: string | number }} Output
 * @param {string} ticker 
 * @returns {Output}
 */
export async function stockDataDAO(ticker) {
    const url = new URL(process.env.URL_API_STOCK_DATA)
    url.searchParams.set('search', JSON.stringify({
            "Sector":"",
            "SubSector":"",
            "Segment":"",
            "my_range":"-20;100",
            "forecast": {
                "upsidedownside": {
                    "Item1":null,
                    "Item2":null
                },
                "estimatesnumber": {
                    "Item1":null,
                    "Item2":null
                },
                "revisedup":true,
                "reviseddown":true,
                "consensus":[]
            },"dy": {
                "Item1":null,
                "Item2":null
            },"p_l": {
                "Item1":null,
                "Item2":null
            },"peg_ratio": {
                "Item1":null,
                "Item2":null
            },"p_vp": {
                "Item1":null,
                "Item2":null
            },"p_ativo": {
                "Item1":null,
                "Item2":null
            },"margembruta": {
                "Item1":null,
                "Item2":null
            },"margemebit": {
                "Item1":null,
                "Item2":null
            },"margemliquida": {
                "Item1":null,
                "Item2":null
            },"p_ebit": {
                "Item1":null,
                "Item2":null
            },"ev_ebit": {
                "Item1":null,
                "Item2":null
            },"dividaliquidaebit": {
                "Item1":null,
                "Item2":null
            },"dividaliquidapatrimonioliquido": {
                "Item1":null,
                "Item2":null
            },"p_sr": {
                "Item1":null,
                "Item2":null
            },"p_capitalgiro": {
                "Item1":null,
                "Item2":null
            },"p_ativocirculante": {
                "Item1":null,
                "Item2":null
            },"roe": {
                "Item1":null,
                "Item2":null
            },"roic": {
                "Item1":null,
                "Item2":null
            },"roa": {
                "Item1":null,
                "Item2":null
            },"liquidezcorrente": {
                "Item1":null,
                "Item2":null
            },"pl_ativo": {
                "Item1":null,
                "Item2":null
            },"passivo_ativo": {
                "Item1":null,
                "Item2":null
            },"giroativos": {
                "Item1":null,
                "Item2":null
            },"receitas_cagr5": {
                "Item1":null,
                "Item2":null
            },"lucros_cagr5": {
                "Item1":null,
                "Item2":null
            },"liquidezmediadiaria": {
                "Item1":null,
                "Item2":null
            },"vpa": {
                "Item1":null,
                "Item2":null
            },"lpa": {
                "Item1":null,
                "Item2":null
            },"valormercado": {
                "Item1":null,
                "Item2":null
            }
    }))
    url.searchParams.set('CategoryType', 1)
    const res = await fetch(url.href)
    const data = await res.text()
    const arr = data.split(/\n/)
    const title = arr.shift().split(';')
    const output = {}
    for (const row of arr) {
        if (row.startsWith(ticker.toUpperCase())) {
            const r = row.split(';')
            r.forEach((el, i) => Reflect.set(output, title[i].trim(), el))
            break
        }
    }
    return output
}