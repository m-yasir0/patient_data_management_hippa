import { fetchData } from '../../../helpers/fetch_helper'
import { LOGS_URL } from '../../../utils/app_constants'
import { LIST_LOGS } from '../types'

const setLogs = (logs, action) => ({
  type: action,
  payload: logs,
})

export const listLogs = () => {
  return async function (dispatch) {
    let res = await fetchData(`${LOGS_URL}`, 'get')
    res && dispatch(setLogs(res.data.logs, LIST_LOGS))
  }
}
