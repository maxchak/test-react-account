import { useEffect, useMemo, useState } from "react";
import FormLabel from "react-bootstrap/FormLabel";
import FormSelect from "react-bootstrap/FormSelect";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Layout from "../components/Layout";
import Pagination from "../components/UI/Pagination";

const MainPage = () => {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Симуляция загрузки данных с сервера
  const getTotalItems = async () => {
    return 48;
  };

  useEffect(() => {
    document.title = "Главная";

    getTotalItems().then((totalItems) => {
      setTotalItems(totalItems);
    });
  }, []);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);

  // useEffect(() => {
  // Логика при переключении страницы
  // Загрузка данных, изменение url и т.п.
  // }, [page]);

  return (
    <Layout>
      <h1 className="h3 mb-4">Постраничная навигация</h1>
      <Row>
        <p className="mb-0 h6">Всего пунктов: {totalItems}</p>
        <Col className="my-2" xs={12} md={8} lg={3}>
          <FormLabel htmlFor="inputPassword5">
            Количество пунктов на странице
          </FormLabel>
          <FormSelect
            onChange={(e) => {
              setItemsPerPage(+e.target.value);
              setPage(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </FormSelect>
        </Col>
        <p className="mt-5">
          Информация по пунктам {(page - 1) * itemsPerPage + 1} -{" "}
          {Math.min(itemsPerPage * page, totalItems)}
        </p>
        <Pagination
          pagesNumber={totalPages}
          setPage={setPage}
          currentPage={page}
        />
      </Row>
    </Layout>
  );
};

export default MainPage;
