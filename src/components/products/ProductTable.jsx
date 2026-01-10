import React, { useMemo, useState } from "react";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa"; // small icons for actions

export default function ProductTable({ products, onEdit, onDelete }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Get unique categories for filter
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesTitle = p.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter
        ? p.category === categoryFilter
        : true;
      return matchesTitle && matchesCategory;
    });
  }, [products, searchQuery, categoryFilter]);

  return (
    <>
      <Row className="mb-3 justify-content-end">
        <Col xs={12} sm="auto" className="mb-2 mb-sm-0">
          <Form.Control
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ minWidth: "200px", width: "100%" }}
          />
        </Col>

        <Col xs={12} sm="auto" className="d-flex gap-2">
          <Form.Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ minWidth: "150px", flex: "1 1 auto" }}
          >
            <option value="">All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>

          <Button
            variant="secondary"
            onClick={() => {
              setSearchQuery("");
              setCategoryFilter("");
            }}
          >
            Reset
          </Button>
        </Col>
      </Row>

      <Table striped hover responsive className="mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <tr key={product.id || index}>
                <td>{index + 1}</td>
                <td className="text-truncate" style={{ maxWidth: "200px" }}>
                  {product.title}
                </td>
                <td>${product.price?.toFixed(2)}</td>
                <td>{product.category || "N/A"}</td>
                <td className="text-center">
                  <div className="d-flex justify-content-center gap-2 flex-nowrap">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => onEdit(product)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onDelete && onDelete(product.id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}
