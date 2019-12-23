const fn = (module.exports = {})

const addEllipses = pagination => {
  pagination = pagination.filter(page => !isNaN(parseInt(page, 10)))
  const minPage = Math.min(...pagination)
  const maxPage = Math.max(...pagination)

  return [...Array(maxPage).keys()].map(index => {
    let pageNumber = index + 1
    let inBounds = pageNumber > maxPage || pageNumber < minPage

    if (inBounds) {
      return undefined
    }

    if (pagination.includes(pageNumber)) {
      return pageNumber
    }

    return '...'
  })
}

const removeDuplicates = pagination => {
  let previous
  return pagination.filter(page => {
    let isDuplicate = page === previous
    previous = page
    return !isDuplicate
  })
}

fn.getPaginationPages = function(pageCount, currentPage) {
  pageCount = parseInt(pageCount, 10)
  pageCount = isNaN(pageCount) ? 0 : pageCount

  currentPage = parseInt(currentPage, 10)
  if (isNaN(currentPage) || currentPage < 1) {
    currentPage = 1
  }

  // If there is only one page (or no pages), don't show any pagination.
  if (pageCount <= 1) {
    return []
  }

  // Always show the first and last pages.
  const firstPage = 1

  // Always show the page before and the page after the current page, assuming that page exists.
  let nextPage = currentPage + 1
  nextPage = nextPage >= pageCount ? pageCount : nextPage
  let previousPage = currentPage - 1
  previousPage = previousPage > firstPage ? previousPage : firstPage

  // @todo Never show more than five page numbers.

  let pagination = [firstPage, previousPage, currentPage, nextPage, pageCount]

  // If the current page is the first page, show the next two pages, or if it is the last page, show the previous two pages(assuming those pages exist).
  if (currentPage === firstPage) {
    pagination.push(currentPage + 2)
  }

  if (currentPage === pageCount) {
    pagination.push(currentPage - 2)
  }

  pagination = removeDuplicates(pagination)
    .map(page => {
      const outOfBounds = page > pageCount || page < firstPage
      return outOfBounds ? undefined : page
    })
    .sort()
    .filter(page => page !== undefined)

  pagination = addEllipses(pagination, firstPage, pageCount)
  pagination = removeDuplicates(pagination)

  return pagination
}
