import { createApi } from '@reduxjs/toolkit/query/react'

import { $api } from './api'
export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: (data) => {
    console.log(data)
    return $api({ ...data, data: data?.body ?? {} })
  },
  endpoints: () => ({}),
})
