import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import ProductTable from "../components/products/ProductTable";
import ProductModal from "../components/products/ProductModal";
import { useProducts } from "../hooks/useProducts";

import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/products.api";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function Products() {
  const { products, setProducts } = useProducts();
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleSave = async (data) => {
    try {
      if (selected) {
        // EDIT
        const res = await updateProduct(selected.id, data);

        setProducts((prev) =>
          prev.map((p) => (p.id === selected.id ? res.data : p))
        );
      } else {
        // CREATE
        const res = await createProduct(data);
        setProducts((prev) => [res.data, ...prev]);
      }

      setShow(false);
      setSelected(null);
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  return (
    <DashboardLayout>
      {/* ===== Page Header + Stats ===== */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Body className="d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <h3 className="mb-1">Products</h3>
                <small className="text-muted">
                  Manage your product catalog
                </small>
              </div>

              <Button
                variant="primary"
                onClick={() => {
                  setSelected(null);
                  setShow(true);
                }}
              >
                + Add Product
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* ===== Stats Cards ===== */}
      <Row className="mb-4">
        {[
          { label: "Total Products", value: products.length },
          {
            label: "Total Sales",
            value: `$${products
              .reduce((sum, p) => sum + p.price * (p.rating?.count || 1), 0)
              .toLocaleString()}`,
          },
          {
            label: "Average Rating",
            value: (
              products.reduce((sum, p) => sum + (p.rating?.rate || 0), 0) /
              (products.length || 1)
            ).toFixed(1),
          },
          {
            label: "Categories",
            value: new Set(products.map((p) => p.category)).size,
          },
        ].map((stat, idx) => {
          const variants = ["primary", "success", "warning", "info"];
          const variant = variants[idx % variants.length];

          return (
            <Col md={3} sm={6} key={idx} className="mb-3">
              <Card
                className={`border-0 shadow-sm h-100 border-start border-4 border-${variant}`}
                bg="light"
              >
                <Card.Body>
                  <small className="text-muted">{stat.label}</small>
                  <h4 className={`fw-bold mt-2 text-${variant}`}>
                    {stat.value}
                  </h4>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      {/* Products Table */}
      <Row>
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Body>
              {products.length ? (
                <ProductTable
                  products={products}
                  onEdit={(p) => {
                    setSelected(p);
                    setShow(true);
                  }}
                  onDelete={handleDelete}
                />
              ) : (
                <p className="text-center text-muted mb-0">
                  No products found. Click “Add Product” to create one.
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ProductModal
        show={show}
        onHide={() => setShow(false)}
        product={selected}
        onSave={handleSave}
      />
    </DashboardLayout>
  );
}
