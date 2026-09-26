import { act, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('portfolio workflow', () => {
  afterEach(() => vi.useRealTimers())

  it('copies the contact address only reporting success after the clipboard resolves', async () => {
    const user = userEvent.setup()
    const writeText = vi
      .spyOn(navigator.clipboard, 'writeText')
      .mockResolvedValue()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Copy email' }))
    expect(writeText).toHaveBeenCalledWith('ahsan97@hotmail.co.uk')
    expect(
      screen.getByRole('status', { name: 'Email copy status' }),
    ).toHaveTextContent('Email copied')
  })

  it('offers a useful fallback if clipboard access fails', async () => {
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(
      new Error('Denied'),
    )
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Copy email' }))
    expect(
      screen.getByText(
        'Could not copy. Select the email address to copy it manually.',
      ),
    ).toBeVisible()
    expect(screen.queryByText('Email copied')).not.toBeInTheDocument()
  })

  it('replays the profile demo once and cancels its timers on leaving', () => {
    vi.useFakeTimers()
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Re-run demo' }))
    expect(screen.getByRole('button', { name: 'Running…' })).toBeDisabled()
    expect(screen.getByText('0 passing')).toBeVisible()
    act(() => vi.advanceTimersByTime(3000))
    expect(screen.getByText('4 passing')).toBeVisible()
    expect(screen.getByRole('button', { name: 'Re-run demo' })).toBeEnabled()
    fireEvent.click(screen.getByRole('button', { name: 'Re-run demo' }))
    fireEvent.click(screen.getByRole('button', { name: /Skills/ }))
    expect(vi.getTimerCount()).toBe(0)
  })
  it('keeps manual exploration progress when switching stages and supports reset', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /Selected work/ }))
    const check = screen.getByRole('checkbox', { name: /Discover an event/ })
    await user.click(check)
    expect(screen.getByText('1 / 3 explored')).toBeVisible()
    await user.click(screen.getByRole('button', { name: /Biography/ }))
    await user.click(screen.getByRole('button', { name: /Selected work/ }))
    expect(
      screen.getByRole('checkbox', { name: /Discover an event/ }),
    ).toBeChecked()
    await user.click(
      screen.getByRole('checkbox', { name: /Try an unexpected path/ }),
    )
    await user.click(
      screen.getByRole('checkbox', { name: /Explore on a small screen/ }),
    )
    expect(screen.getByText('3 / 3 explored')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Reset checklist' }))
    expect(screen.getByText('0 / 3 explored')).toBeVisible()
    screen
      .getAllByRole('checkbox')
      .forEach((input) => expect(input).not.toBeChecked())
  })
  it('opens the biography and switches content and testing views in place', async () => {
    const user = userEvent.setup()
    render(<App />)
    const navigation = screen.getByRole('navigation', {
      name: 'Portfolio stages',
    })
    expect(
      screen.getByRole('heading', { name: "Hi, I'm Ahsan." }),
    ).toBeVisible()
    expect(
      screen.getByRole('region', { name: 'Profile test runner' }),
    ).toBeVisible()
    for (const [section, heading, companion] of [
      ['Skills', 'The toolkit.', 'Test design matrix'],
      ['Experience', "Where I've done it.", 'Career release history'],
      ['Selected work', 'Built. Tested. Shipped.', 'Exploratory session'],
    ]) {
      await user.click(
        within(navigation).getByRole('button', { name: new RegExp(section) }),
      )
      expect(screen.getByRole('heading', { name: heading })).toBeVisible()
      expect(screen.getByRole('region', { name: companion })).toBeVisible()
      expect(
        screen.queryByRole('region', { name: 'Profile test runner' }),
      ).not.toBeInTheDocument()
      expect(
        within(navigation).getAllByRole('button', { pressed: true }),
      ).toHaveLength(1)
    }
    expect(
      screen.getByRole('link', { name: /View FindComedy/ }),
    ).toHaveAttribute('href', 'https://github.com/AhsanZX97/FindComedy')
    await user.click(
      within(navigation).getByRole('button', { name: /Biography/ }),
    )
    expect(
      screen.queryByRole('heading', { name: 'Built. Tested. Shipped.' }),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: "Hi, I'm Ahsan." }),
    ).toBeVisible()
  })
})
