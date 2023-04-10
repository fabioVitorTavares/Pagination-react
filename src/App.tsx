import { CSSProperties, useEffect, useState } from "react";

type Iten = {
  id: string;
  description: string;
};

type css = {
  page: CSSProperties;
};

const style: css = {
  page: { cursor: "pointer"},
};

export function App() {
  const [data, setData] = useState<Iten[]>();
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number[]>([]);

  function fillArray(size: number) {
    const array = new Array<number>(size);
    for (let i = 0; i < size; i++) {
      array[i] = i;
    }
    return array;
  }

  async function loadData<Void>(page: number) {
    console.log("Data");
    const response = await fetch(
      `http://127.0.0.1:8080/getItens?page=${page}&size=10`
    );
    const dataJson = await response.json();
    setData(dataJson.content);
    setTotalPages(fillArray(dataJson.totalPages));
    console.log(page, dataJson.pageable.pageNumber);
  }

  useEffect(() => {
    loadData(0);
  }, []);

  function handleClickPage(page: number) {
    setPage(page);
    loadData(page);
  }

  return (
    <div className="App">
      <h1>Data</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data?.map((iten) => {
          return (
            <div
              key={iten.id}
              style={{ display: "flex", flexDirection: "row", gap: "40px" }}
            >
              <p>{iten.id}</p>
              <p>{iten.description}</p>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "40px" }}>
        {totalPages.map((page) => {
          return (
            <a
              style={style.page}
              key={page}
              onClick={() => handleClickPage(page)}
            >
              {page}
            </a>
          );
        })}
      </div>
    </div>
  );
}
