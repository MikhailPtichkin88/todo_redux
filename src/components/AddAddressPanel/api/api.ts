import axios from 'axios'
import { GeoObjectCollection } from '../types/types'
import { $api } from '@/shared/api/api'
import { IAddressItem } from '../types/types'

export const addressApi = {
  getAddress: (address: string) => {
    const params = {
      apikey: '1a9f479f-713f-473f-9535-3c141bfcc846',
      geocode: address,
      lang: 'ru_RU',
      format: 'json',
      results: 5,
    }
    return axios.get<{ response: GeoObjectCollection }>(
      'https://geocode-maps.yandex.ru/1.x/',
      { params }
    )
  },
  addNewAddress: (newAddress: Omit<IAddressItem, 'id'>) => {
    return $api.post<IAddressItem[]>('/address_list', newAddress)
  },
}
