import { remote } from 'electron'
function getAppPath () {
  return remote.app.getPath('userData')
}
export default {
  getAppPath
}
