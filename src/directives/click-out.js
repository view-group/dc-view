function mounted(el, { value }) {
        el.handler = e => !el.contains(e.target) && typeof value == "function" && value();
        setTimeout(() => document.addEventListener("click", el.handler), 0);
}

function unmounted(el) {
        document.removeEventListener("click", el.handler);
}

export default {
        mounted, unmounted
}