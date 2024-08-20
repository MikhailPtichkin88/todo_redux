import { render } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { DeepPartial } from '../types/types'
import { IStateSchema, StoreProvider } from '@/providers/StoreProvider'
import '@/index.css'

export interface componentRenderOptions {
  route?: string
  initialState?: DeepPartial<IStateSchema>
}
interface IProps {
  children: ReactNode
  options?: componentRenderOptions
}
export const TestProvider = (props: IProps) => {
  const { children, options = {} } = props
  const { route = '/', initialState } = options

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider initialState={initialState}>
        <div className={`app`}>{children}</div>
      </StoreProvider>
    </MemoryRouter>
  )
}

export function componentRender(
  component: ReactNode,
  options: componentRenderOptions = {}
) {
  return render(<TestProvider options={options}>{component}</TestProvider>)
}
