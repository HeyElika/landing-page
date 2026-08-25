import accessCard from './products/access-card'
import payLater from './products/pay-later'
import cashLoan from './products/cash-loan'

/**
 * Every page in this project. Add a product by importing its file and pushing
 * it into this array. The first entry is what `/` renders.
 */
export const pages = [accessCard, payLater, cashLoan]

export const defaultPage = pages[0]

export function getPage(slug) {
  return pages.find((p) => p.slug === slug)
}
