import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function ProductModal({
  show,
  onHide,
  product,
  onSave,
}) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        price: product.price || "",
        category: product.category || "",
        description: product.description || "",
      });
    } else {
      setFormData({
        title: "",
        price: "",
        category: "",
        description: "",
      });
    }
    setError("");
  }, [product, show]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.price) {
      setError("Title and Price are required");
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price)) {
      setError("Price must be a number");
      return;
    }

    onSave({
      ...formData,
      price,
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {product ? "Edit Product" : "Add Product"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancel
            </Button>
            <Button type="submit">
              {product ? "Update" : "Create"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
