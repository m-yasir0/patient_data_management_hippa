import axios from '../config/axios'
import { toast } from 'react-toastify'

export const fetchData = async (
  url,
  type,
  message = null,
  data = null,
  config = null,
) => {
  try {
    let res = await axios[type](url, data, config)
    message = message ? message : res.data.message ? res.data.message : ''
    if (type !== 'get') {
      toast.success(message)
    }
    return res
  } catch (e) {
    if (e.response?.status === 404) {
      window.location.replace('/404')
    } else {
      console.log(e)
      let error = Array.isArray(e.response?.data?.error?.messages)
        ? e.response?.data?.error?.messages[0]
        : e.response?.data?.error?.messages
        ? e.response?.data?.error?.messages
        : 'Server Error'

      toast.error(error)
    }
  }
}
