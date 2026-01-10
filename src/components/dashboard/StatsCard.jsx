import { Card } from "react-bootstrap";

export default function StatsCard({ title, value }) {
  return (
    <Card className="text-center">
      <Card.Body>
        <h5>{title}</h5>
        <h2>{value}</h2>
      </Card.Body>
    </Card>
  );
}
