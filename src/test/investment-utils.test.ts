import { describe, it, expect } from 'vitest'
import { getIRRate, calcInvestment, buildChartData } from '../lib/investment-utils'
import type { InvestmentType } from '../types/investment'

describe('investment-utils', () => {
  describe('getIRRate', () => {
    it('returns 22.5% for 6 months', () => {
      expect(getIRRate(6)).toBe(0.225)
    })
    it('returns 20% for 12 months', () => {
      expect(getIRRate(12)).toBe(0.2)
    })
    it('returns 17.5% for 24 months', () => {
      expect(getIRRate(24)).toBe(0.175)
    })
    it('returns 15% for more than 24 months', () => {
      expect(getIRRate(36)).toBe(0.15)
    })
  })

  describe('calcInvestment', () => {
    const params = {
      inicial: 1000,
      aporte: 100,
      meses: 12,
      taxaAnual: 12,
      tipo: 'CDB' as InvestmentType
    }

    it('calculates gross value correctly', () => {
      const result = calcInvestment(params)
      expect(result.bruto).toBeGreaterThan(2200)
    })

    it('calculates IR correctly for CDB', () => {
      const result = calcInvestment(params)
      expect(result.ir).toBeGreaterThan(0)
    })

    it('has zero IR for LCI/LCA', () => {
      const result = calcInvestment({ ...params, tipo: 'LCI' })
      expect(result.ir).toBe(0)
    })
  })

  describe('buildChartData', () => {
    it('returns array of points starting with initial value', () => {
      const data = buildChartData(1000, 100, 12, 12)
      expect(data[0]).toEqual({ m: 0, v: 1000 })
      expect(data[data.length - 1].m).toBe(12)
    })
  })
})
