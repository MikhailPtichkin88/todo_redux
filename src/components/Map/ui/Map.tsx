import React from 'react'
import { Map, Placemark } from '@pbe/react-yandex-maps'

interface Point {
  coords: number[]
  name: string
}

interface MapProps {
  points: Point[]
}

export const YMap: React.FC<MapProps> = ({ points }) => {
  return (
    <div>
      <Map
        width={600}
        height={600}
        defaultState={{ center: [55.75, 37.57], zoom: 10 }}
        defaultOptions={{ mapAutoFocus: true, suppressMapOpenBlock: true }}
      >
        <Placemark defaultGeometry={[55.751574, 37.573856]} />
        <Placemark
          modules={['geoObject.addon.balloon']}
          defaultGeometry={[55.7, 37.5]}
          properties={{
            iconContent: '1',
            balloonContentBody:
              'This is balloon loaded by the Yandex.Maps API module system',
          }}
        />

        {/* <Placemark defaultGeometry={ [55.7, 37.5]} />
      <Polyline
      geometry={[
        [55.751574, 37.573856],
        [52.751574, 43.573856],
        [55.7, 37.5],
      ]}
      options={{
        strokeColor: "#000",
        strokeWidth: 4,
        strokeOpacity: 0.5,
      }}
    /> */}
      </Map>
    </div>
  )
}
