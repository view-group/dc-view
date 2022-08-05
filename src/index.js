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
import Select from "./components/select/select.vue";
import OptionGroup from "./components/select/option-group.vue";
import Option from "./components/select/option.vue";
import DatePicker from "./components/date-picker/date-picker.vue"
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
components[`${prefix}select`] = Select;
components[`${prefix}option-group`] = OptionGroup;
components[`${prefix}option`] = Option;
components[`${prefix}date-picker`] = DatePicker;

import clickOut from "./directives/click-out"
const directive = {
    "click-out": clickOut
}
const install = Vue => {
    for(let item in components) {
        Vue.component(item, components[item])
    }
    for(let item in directive) {
        console.log(item, directive[item])
        Vue.directive(item, directive[item])
    }
}
export default {
    install
};