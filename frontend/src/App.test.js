import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => { // eslint-disable-line
  let container=render(<App />)
  const linkElement = container.getByTestId('github-oauth-link')
  expect(linkElement).toBeInTheDocument() // eslint-disable-line
})
