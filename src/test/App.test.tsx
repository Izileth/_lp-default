import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App', () => {
  it('renders InvestSim title', () => {
    render(<App />)
    expect(screen.getAllByText(/InvestSim/i)[0]).toBeInTheDocument()
  })

  it('renders simulator main heading', () => {
    render(<App />)
    expect(screen.getByText(/Quanto seu dinheiro pode render/i)).toBeInTheDocument()
  })
})
