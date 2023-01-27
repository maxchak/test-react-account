import { Dispatch, FC, SetStateAction } from "react";
import { default as PG } from "react-bootstrap/Pagination";

interface PaginationProps {
  pagesNumber: number;
  currentPage: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pagination: FC<PaginationProps> = ({
  pagesNumber,
  currentPage,
  setPage,
}) => {
  // Array of pages numbers
  const pages = Array.from(Array(pagesNumber).keys()).map((i) => i + 1);

  if (!pagesNumber) {
    return <></>;
  }

  return (
    <PG className="justify-content-center flex-wrap">
      <PG.First onClick={() => setPage(1)} disabled={currentPage === 1} />
      <PG.Prev
        onClick={() => setPage((prev) => prev - 1)}
        disabled={currentPage === 1}
      />
      {pages.map((i) => (
        <PG.Item key={i} active={i === currentPage} onClick={() => setPage(i)}>
          {i}
        </PG.Item>
      ))}
      <PG.Next
        onClick={() => setPage((prev) => prev + 1)}
        disabled={currentPage === pages.length}
      />
      <PG.Last
        onClick={() => setPage(pages.length)}
        disabled={currentPage === pages.length}
      />
    </PG>
  );
};

export default Pagination;
