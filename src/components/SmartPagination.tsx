import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"

interface SmartPaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

// Inside SmartPagination.tsx
export function SmartPagination({ totalItems, pageSize, currentPage, onPageChange }: SmartPaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize) || 1; // Default to 1 if 0 items
  const maxVisibleButtons = 5;

  // 1. Determine the actual number of buttons to show
  // If totalPages is 3, we only want 3 buttons, not 5.
  const actualButtonsToShow = Math.min(totalPages, maxVisibleButtons);

  // 2. Calculate the sliding window
  let startPage = Math.max(1, currentPage - Math.floor(actualButtonsToShow / 2));
  let endPage = startPage + actualButtonsToShow - 1;

  // 3. Adjust if endPage exceeds totalPages
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - actualButtonsToShow + 1);
  }

  // 4. Final safety check for startPage
  if (startPage < 1) startPage = 1;

  const pages = Array.from(
    { length: endPage - startPage + 1 }, 
    (_, i) => startPage + i
  );

  // Don't hide the pagination if there is 1 page (as per your request to show button "1")
  // Only hide if totalItems is 0 and you don't want to show anything.
  if (totalItems === 0) return null;

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            // Visual feedback for disabled state
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {/* Dynamic Page Buttons */}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
              className="cursor-pointer"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}