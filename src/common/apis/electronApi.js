import { remote } from 'electron'
function getAppPath () {
  return remote.app.getAppPath()
}
export default {
  getAppPath
}
