const localStorageMock = (() => {
  const store: { [key: string]: string } = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
  }
})()

interface IArgs {
  key: string
  value: string | number | object
}

export const createMockLocalStorage = ({ key, value }: IArgs) => {
  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
  })
  localStorage.setItem(key, JSON.stringify(value))
}

export const deleteMockLocalStorage = () => {
  if (global?.localStorage) {
    Object?.defineProperty(global, 'localStorage', {})
  }
}
