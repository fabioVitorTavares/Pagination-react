import { CSSProperties, memo } from "react";

type PageSelectorProps = {
  props: {
    totalPages: number;
    setPage: Function;
  };
};

function PageSelector({ props }: PageSelectorProps) {
  const { totalPages, setPage } = props;

  function fillArray(size: number) {
    const array = new Array<number>(size);
    for (let i = 1; i <= size; i++) {
      array[i] = i;
    }
    return array;
  }

  function f() {
    
  }

  const pagesNumbers = fillArray(totalPages);

  function handleClickPage(page: number) {
    setPage(page);
  }

  type css = {
    page: CSSProperties;
    selector: CSSProperties;
  };

  const style: css = {
    page: { cursor: "pointer" },
    selector: { display: "flex", flexDirection: "row", gap: "40px" },
  };

  return (
    <div style={style.selector}>
      {pagesNumbers.map((page) => {
        return (
          <span
            style={style.page}
            key={page}
            onClick={() => handleClickPage(page)}
          >
            {page}
          </span>
        );
      })}
    </div>
  );
}

export default memo(PageSelector);

