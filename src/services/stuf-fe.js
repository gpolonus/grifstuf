
import * as rawStufs from '../pages/stuf'
import mo from '../utils/mo'

export default mo(() => {
  delete rawStufs.index
  return rawStufs
})
