import React, { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import ProductSearch from "../components/ProductSearch";
import { Button, Container } from "react-bootstrap";
import SearchModal from "../components/SearchModal";

export default function Products() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const fetchData = async () => {
    try {
      const fetchUrl = user?.isAdmin
        ? `${process.env.REACT_APP_API_URL}/products/all`
        : `${process.env.REACT_APP_API_URL}/products/`;

      const response = await fetch(fetchUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      setError(error.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (searchCriteria) => {
    const filtered = products.filter((product) => {
      const isInRange =
        (searchCriteria.minPrice === "" ||
          product.price >= searchCriteria.minPrice) &&
        (searchCriteria.maxPrice === "" ||
          product.price <= searchCriteria.maxPrice);

      const containsName =
        searchCriteria.productName === "" ||
        product.name
          .toLowerCase()
          .includes(searchCriteria.productName.toLowerCase());

      return isInRange && containsName;
    });

    setFilteredProducts(filtered);
  };

  const handleShowSearchModal = () => {
    setShowSearchModal(true);
  };

  const handleHideSearchModal = () => {
    setShowSearchModal(false);
  };

  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "50vh" }}
      >
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Container>
        <Button variant="primary" onClick={handleShowSearchModal}>
          Search <i className="bi bi-search mx-1"></i>
        </Button>
      </Container>

      <SearchModal
        show={showSearchModal}
        onHide={handleHideSearchModal}
        onSearch={handleSearch}
      />

      {user?.isAdmin ? (
        <AdminView
          productsData={
            filteredProducts.length > 0 ? filteredProducts : products
          }
          fetchData={fetchData}
        />
      ) : (
        <UserView
          productsData={
            filteredProducts.length > 0 ? filteredProducts : products
          }
        />
      )}
    </>
  );
}
