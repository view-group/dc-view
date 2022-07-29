import "./styles/index.scss";
import { prefix } from "./config"

import DcToltip from "./components/tooltip/tooltip.vue";
import DcMenu from "./components/menu/menu.vue";
import DcSubMenu from "./components/menu/sub-menu.vue";
import DcMenuItem from "./components/menu/menu-item.vue";
import DcTransition from "./components/transition/transition.vue";
import Form from "./components/form/form.vue";
import FormItem from "./components/form/form-item.vue";
import Input from "./components/input/input.vue";
import Ellipsis from "./components/ellipsis/ellipsis.vue";
const components = {
    "dc-tooltip": DcToltip,
    "dc-menu": DcMenu,
    "dc-sub-menu": DcSubMenu,
    "dc-menu-item": DcMenuItem,
    "dc-transition": DcTransition,
    // "dc-form": DcForm,
    // "dc-form-item": DcFormItem,
}
components[`${prefix}input`] = Input;
components[`${prefix}ellipsis`] = Ellipsis;
components[`${prefix}form`] = Form;
components[`${prefix}form-item`] = FormItem;
const install = Vue => {
    for(let item in components) {
        Vue.component(item, components[item])
    }
}
export default {
    install
};