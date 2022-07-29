import { prefix } from "./src/config"
import "./src/styles/index.scss";



import DcToltip from "./src/components/tooltip/tooltip.vue";
import DcMenu from "./src/components/menu/menu.vue";
import DcSubMenu from "./src/components/menu/sub-menu.vue";
import DcMenuItem from "./src/components/menu/menu-item.vue";
import DcTransition from "./src/components/transition/transition.vue";
// import DcForm from "./src/components/form/form.vue";
// import DcFormItem from "./src/components/form/form-item.vue";
// import Input from "./src/components/input/input.vue";
// import Ellipsis from "./src/components/ellipsis/ellipsis.vue"
const components = {
    "dc-tooltip": DcToltip,
    "dc-menu": DcMenu,
    "dc-sub-menu": DcSubMenu,
    "dc-menu-item": DcMenuItem,
    "dc-transition": DcTransition,
    // "dc-form": DcForm,
    // "dc-form-item": DcFormItem,
}
// components[`${prefix}ellipsis`] = Ellipsis;
const install = Vue => {
    for(let item in components) {
        Vue.component(item, components[item])
    }
}
export default {
    install
};