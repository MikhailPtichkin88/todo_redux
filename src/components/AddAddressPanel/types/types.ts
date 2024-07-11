export interface IAddressOption {
  value: string
  label: string
}

export interface IAddressItem {
  address: string
  coordinates: [number, number]
  id: string
}

export interface GeoObjectCollection {
  GeoObjectCollection: {
    metaDataProperty: {
      GeocoderResponseMetaData: {
        request: string
        results: string
        found: string
      }
    }
    featureMember: GeoObject[]
  }
}

export interface GeoObject {
  GeoObject: {
    Point: {
      pos: string
    }
    metaDataProperty: {
      GeocoderMetaData: {
        precision: string
        text: string
        kind: string
        Address: {
          country_code: string
          formatted: string
          postal_code: string
          Components: {
            kind: string
            name: string
          }[]
        }
        AddressDetails: {
          Country: {
            AddressLine: string
            CountryNameCode: string
            CountryName: string
            AdministrativeArea: {
              AdministrativeAreaName: string
              Locality: {
                LocalityName: string
                Thoroughfare: {
                  ThoroughfareName: string
                  Premise: {
                    PremiseNumber: string
                    PostalCode: {
                      PostalCodeNumber: string
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    name: string
    description: string
    boundedBy: {
      Envelope: {
        lowerCorner: string
        upperCorner: string
      }
    }
  }
}
