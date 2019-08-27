import Icon from './icon/Icon';


const AUIs={
    Icon
}
const AdensUI={}
AdensUI.install = function (Vue) {
    Object.keys(AUIs).forEach(key => {
        Vue.component(key, AUIs[key]);
    });
}
export default AdensUI;