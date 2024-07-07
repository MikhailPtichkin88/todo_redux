import { componentRender } from '@/shared/tests/componentRender'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { ProfileAvatar } from './ProfileAvatar'

describe('ProfileAvatar', () => {
  it('should not have link to profile when user not inited', async () => {
    componentRender(
      <>
        <ProfileAvatar
          inited={false}
          avatarLink={'https://example.com/image.jpg'}
        />
      </>
    )

    expect(screen.queryByTestId('ProfileAvatar')).toBeNull()

    const imgElement = screen.getByRole('img')
    expect(imgElement).toBeInTheDocument()
  })
})
