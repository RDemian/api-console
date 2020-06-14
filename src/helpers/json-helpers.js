
export const isValidJson = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        console.error(e.message);
        return false;
    }
}

export const jsonFormating = (string) => {
    const stringArr = string.replace(/[{}]/gi, '').trim().split(',');
    const resultString = stringArr.reduce((prev, curr, index) => {
        const isLats = index === (stringArr.length -1);
        return `${prev} <div>&nbsp;&nbsp;&nbsp;&nbsp;${curr.replace(':', ':&nbsp;&nbsp;')}${!isLats ? ',':''}</div>`
    }, '');

    return `<div>{</div>${resultString}<div>}</div>`
}

export const clearHTMLTags = (text = '') => {
    return text.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, '');
}
