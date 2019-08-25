import debounce from './debounce.js'
import throttle from './throttle.js'
class _ {
    debounce = debounce;
    throttle=throttle;
}
export default new _()
