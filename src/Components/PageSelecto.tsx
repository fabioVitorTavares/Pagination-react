import { CSSProperties } from "react";

type PageSelectorProps = {
  props: {
    totalPages: number;
    page: number;
    setPage: Function;
  };
};

export default function PageSelector({ props }: PageSelectorProps) {
  const { totalPages, page, setPage } = props;

  function fillArray(size: number) {
    const array = new Array<number>(size);
    for (let i = 1; i <= size; i++) {
      array[i] = i;
    }
    return array;
  }

  function f() {}

  const pagesNumbers = fillArray(totalPages);

  function handleClickPage(page: number) {
    setPage(page);
  }

  type css = {
    numberOfPage: CSSProperties;
    selector: CSSProperties;
    selected: CSSProperties;
  };

  const style: css = {
    numberOfPage: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      height: "50px",
      width: "50px",
    },
    selector: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      gap: "20px",
    },
    selected: {
      fontWeight: "bold",
      fontSize: "22px",
    },
  };

  const paginationLessThan11 = pagesNumbers.map((numberOfPage) => {
    return (
      <div
        style={
          numberOfPage === page
            ? { ...style.numberOfPage, ...style.selected }
            : { ...style.numberOfPage }
        }
        key={numberOfPage}
        onClick={() => handleClickPage(numberOfPage)}
      >
        {numberOfPage}
      </div>
    );
  });

  const paginationGreaterThan10 = (
    <>
      {pagesNumbers.map((numberOfPage, index) => {
        return index < 11 ? (
          <div
            style={
              numberOfPage === page
                ? { ...style.numberOfPage, ...style.selected }
                : { ...style.numberOfPage }
            }
            key={numberOfPage}
            onClick={() => handleClickPage(numberOfPage)}
          >
            {numberOfPage}
          </div>
        ) : null;
      })}
    </>
  );

  return (
    <div style={style.selector}>
      {pagesNumbers.length < 11
        ? paginationLessThan11
        : paginationGreaterThan10}
    </div>
  );
}
