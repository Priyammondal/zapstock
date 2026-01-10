import { Card, Row, Col } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import DashboardLayout from "../components/layout/DashboardLayout";

// ---- Mock Data ----
const stats = [
  { label: "Total Products", value: 128 },
  { label: "Total Sales", value: "$12,450" },
  { label: "Orders", value: 342 },
  { label: "Categories", value: 8 },
];

const salesData = [
  { month: "Jan", sales: 400 },
  { month: "Feb", sales: 600 },
  { month: "Mar", sales: 800 },
  { month: "Apr", sales: 700 },
  { month: "May", sales: 1000 },
];

const categoryData = [
  { name: "Electronics", value: 45 },
  { name: "Fashion", value: 30 },
  { name: "Home", value: 15 },
  { name: "Others", value: 10 },
];

const recentOrders = [
  { id: "#ORD-101", customer: "John Doe", amount: "$120", status: "Completed" },
  { id: "#ORD-102", customer: "Jane Smith", amount: "$90", status: "Pending" },
  {
    id: "#ORD-103",
    customer: "Alex Brown",
    amount: "$240",
    status: "Cancelled",
  },
];

const topProducts = [
  { name: "iPhone 15", sales: 120 },
  { name: "Nike Shoes", sales: 98 },
  { name: "Smart Watch", sales: 76 },
];

const COLORS = ["#0d6efd", "#198754", "#ffc107", "#6c757d"];

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* ===== Stats Cards ===== */}
      <Row className="mb-4">
        {stats.map((stat, idx) => {
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

      {/* ===== Charts ===== */}
      <Row>
        {/* Bar Chart */}
        <Col md={8} className="mb-4">
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <h5 className="mb-3">Monthly Sales</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#0d6efd" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Pie Chart */}
        <Col md={4} className="mb-4">
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <h5 className="mb-3">Product Categories</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {categoryData.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="mb-3">Recent Orders</h5>
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, idx) => (
                    <tr key={idx}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.amount}</td>
                      <td>
                        <span
                          className={`badge bg-${
                            order.status === "Completed"
                              ? "success"
                              : order.status === "Pending"
                              ? "warning"
                              : "danger"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body>
              <h6>Monthly Target</h6>
              <p className="mb-2 text-muted">$12,450 / $15,000</p>
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  style={{ width: "83%" }}
                />
              </div>
            </Card.Body>
          </Card>

          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="mb-3">Top Products</h6>
              <ul className="list-group list-group-flush">
                {topProducts.map((item, idx) => (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between"
                  >
                    {item.name}
                    <span className="fw-bold">{item.sales}</span>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
