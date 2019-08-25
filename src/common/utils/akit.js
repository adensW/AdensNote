
class Akit {
    CURSORMOVETYPE={
      HEAD: 0,
      TAIL: 1,
      FOREARD_LINE: 3,
      NEXT_LINE: 4,
      CUSTOM: 5
    }
    isNull = str => str === null;
    ensureHTTP= str => (/^https?:\/\//.test(str) && str) || `http://${str}`;
    isFunction= obj => typeof obj === 'function' && typeof obj.nodeType !== 'number';
    ElementType = str => {
      let matched = /<([a-zA-Z0-9]*) */g.exec(str)
      if (!this.isNull(matched)) {
        return matched[1]
      }
      return null
    }
    dateFormatter = (date, formatter) => {
      date = (date ? new Date(date) : new Date())
      const Y = date.getFullYear() + ''
      const M = date.getMonth() + 1
      const D = date.getDate()
      const H = date.getHours()
      const m = date.getMinutes()
      const s = date.getSeconds()
      return formatter.replace(/YYYY|yyyy/g, Y)
        .replace(/YY|yy/g, Y.substr(2, 2))
        .replace(/MM/g, (M < 10 ? '0' : '') + M)
        .replace(/DD/g, (D < 10 ? '0' : '') + D)
        .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
        .replace(/mm/g, (m < 10 ? '0' : '') + m)
        .replace(/ss/g, (s < 10 ? '0' : '') + s)
    }
    cursorSelection = () => window.getSelection();

    cursorNode=() => this.cursorSelection().anchorNode;

    cursorMove=function (node, offset) {
      if (!node.nodeType) {
        console.log(10)
        this.cursorSelection().collapse(this.cursorNode(), node)
      } else {
        this.cursorSelection().collapse(node, offset)
      }
    }
}
export default new Akit()
