import { MdOutlineNavigateBefore } from 'react-icons/md';
import { MdOutlineNavigateNext } from 'react-icons/md';
import './ResultPages.scss';

interface Props {
  numberOfPages: number;
  currentPage: number;
  handlePageClick: Function;
}

const ResultPages = ({
  numberOfPages,
  currentPage,
  handlePageClick,
}: Props) => {
  return (
    <div className='recipes-pages'>
      <MdOutlineNavigateBefore
        className={`arrow ${currentPage === 1 ? 'inactive' : ''}`}
        onClick={() => handlePageClick('prev')}
      />
      <span className={`first ${currentPage === 1 ? 'current-page' : ''}`}>
        {currentPage === 1 && currentPage}
        {currentPage !== 1 && currentPage !== numberOfPages && currentPage - 1}
        {currentPage === numberOfPages && currentPage - 2}
      </span>

      {numberOfPages > 1 && (
        <span
          className={`second ${
            currentPage !== 1 && currentPage + 1 <= numberOfPages
              ? 'current-page'
              : ''
          }`}
        >
          {currentPage === 1 && currentPage + 1}
          {currentPage !== 1 && currentPage + 1 < numberOfPages && currentPage}
          {currentPage !== 1 &&
            currentPage + 1 === numberOfPages &&
            currentPage}
          {currentPage !== 1 &&
            currentPage === numberOfPages &&
            currentPage - 1}
        </span>
      )}

      {numberOfPages > 2 && (
        <span
          className={`third ${
            currentPage === numberOfPages ? 'current-page' : ''
          }`}
        >
          {currentPage === numberOfPages && currentPage}
          {currentPage !== 1 &&
            currentPage + 1 <= numberOfPages &&
            currentPage + 1}
          {currentPage === 1 &&
            currentPage + 2 <= numberOfPages &&
            currentPage + 2}
        </span>
      )}

      <MdOutlineNavigateNext
        className={`arrow ${currentPage === numberOfPages ? 'inactive' : ''}`}
        onClick={() => handlePageClick('next')}
      />
    </div>
  );
};

export default ResultPages;
