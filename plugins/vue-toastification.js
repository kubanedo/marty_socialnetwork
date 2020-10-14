import Vue from "vue";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import "~/assets/custom-vue-toastify.scss";
import UICloseBtn from "~/components/ui/UICloseBtn";

const options = {
    position: 'bottom-left',
    container: document.body,
    closeButton: UICloseBtn
};


Vue.use(Toast, options);