export function oneOf(value, validList) {
    return validList.includes(value)
}
export function getStyle (element, styleName) {
    if (!element || !styleName) return null;
    if (styleName === 'float') {
        styleName = 'cssFloat';
    }
    try {
        const computed = document.defaultView.getComputedStyle(element, '');
        return element.style[styleName] || computed ? computed[styleName] : null;
    } catch(e) {
        return element.style[styleName];
    }
}