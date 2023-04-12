import { CSSProperties, useEffect, useState } from "react";
import PageSelector from "./Components/PageSelecto";

type Iten = {
  id: string;
  description: string;
};

export function App() {
  const [data, setData] = useState<Iten[]>();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  async function loadData<Void>(page: number) {
    const response = await fetch(
      `http://127.0.0.1:8080/getItens?page=${page - 1}&size=10`
    );
    const dataJson = await response.json();
    setData(dataJson.content);
    setTotalPages(dataJson.totalPages);
  }

  useEffect(() => {
    loadData(page);
  }, [page]);

  return (
    <div className="App">
      <h1>Data</h1>
      <button onClick={() => loadData(0)}>Load</button>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data?.map((iten) => {
          return (
            <div
              key={iten.id}
              style={{ display: "flex", flexDirection: "row", gap: "40px" }}
            >
              <p>{iten.description}</p>
            </div>
          );
        })}
      </div>
      <PageSelector props={{ totalPages, page, setPage }} />
    </div>
  );
}
