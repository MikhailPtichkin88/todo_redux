import { createApi } from '@reduxjs/toolkit/query/react'

import { $api } from './api'
export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: (data) => {
    return $api({ ...data, data: data?.body ?? {} })
  },
  endpoints: () => ({}),
})
