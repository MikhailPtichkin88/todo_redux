declare module '*.module.scss' {
  const styles: { [className: string]: string }
  export default styles
}

declare module '*.svg' {
  import { FC, SVGProps } from 'react'
  const content: FC<SVGProps<SVGElement>>
  export default content
}

declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module '*.gif'

declare const __ENV__: 'development' | 'production'
declare const __API__: string
declare const __IS_DEV__: boolean
