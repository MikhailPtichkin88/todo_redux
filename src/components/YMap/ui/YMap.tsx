import React from 'react'
import { Map, Placemark, Polyline } from '@pbe/react-yandex-maps'
import { IAddressItem } from '@/modules/MapAddressList'

interface MapProps {
  addressList: IAddressItem[]
}

export const YMap: React.FC<MapProps> = ({ addressList = [] }) => {
  return (
    <div>
      <Map
        defaultState={{ center: [55.75, 37.57], zoom: 10 }}
        defaultOptions={{ mapAutoFocus: true, suppressMapOpenBlock: true }}
      >
        {addressList?.map(({ coordinates, address, id }, index) => (
          <Placemark
            modules={['geoObject.addon.balloon']}
            properties={{
              iconContent: index + 1,
              balloonContentBody: address,
            }}
            key={id}
            defaultGeometry={coordinates.map(String)}
          />
        ))}

        <Polyline
          geometry={addressList?.map((address) => address.coordinates)}
          options={{
            strokeColor: '#000',
            strokeWidth: 4,
            strokeOpacity: 0.5,
          }}
        />
      </Map>
    </div>
  )
}
