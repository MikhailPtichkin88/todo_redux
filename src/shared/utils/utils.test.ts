import { cn } from './utils'

describe('useStore', () => {
  it('should initialize count with 0', () => {
    const result = cn(['mb-10', 'flex'])
    expect(result).toBe('mb-10 flex')
  })
})
