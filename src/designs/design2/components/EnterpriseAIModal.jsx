import { Badge, Button, Card, Col, Modal, Row } from "react-bootstrap";
import { FiArrowRight, FiBarChart2, FiCpu, FiGitMerge, FiX, FiZap } from "react-icons/fi";

const enterpriseSolutions = [
  { title: "Agentic AI & Automation", text: "Build AI agents and intelligent workflows to automate complex enterprise processes and operations.", icon: FiZap },
  { title: "Enterprise Knowledge & Copilots", text: "Develop AI-powered knowledge systems, copilots and assistants that leverage organizational data and documents.", icon: FiCpu },
  { title: "AI Analytics & Decision Intelligence", text: "Deliver AI-powered analytics, forecasting and decision-support solutions for smarter business decisions.", icon: FiBarChart2 },
  { title: "Custom AI Solutions & Integration", text: "Develop and integrate tailored AI applications with existing ERP, CRM, databases and enterprise systems.", icon: FiGitMerge },
];

export function EnterpriseAIModal({
  show,
  onHide,
  eyebrow = "ENTERPRISE AI",
  title = "Intelligence built around your enterprise.",
  subtitle = "Four connected capabilities for smarter, automated and data-driven organizations.",
  solutions = enterpriseSolutions,
}) {
  return <Modal show={show} onHide={onHide} centered size="xl" dialogClassName="enterprise-ai-dialog" contentClassName="enterprise-ai-modal" backdropClassName="super-agent-backdrop">
    <Modal.Header className="enterprise-ai-header">
      <div><span>{eyebrow}</span><Modal.Title>{title}</Modal.Title><p>{subtitle}</p></div>
      <Button variant="link" onClick={onHide} aria-label="Close Enterprise AI"><FiX /></Button>
    </Modal.Header>
    <Modal.Body className="enterprise-ai-body">
      <Row className="g-3">
        {solutions.map(({ title, text, icon: Icon }, index) => <Col md={6} key={title}>
          <Card className="enterprise-solution-card h-100">
            <Card.Body><div className="enterprise-card-top"><span><Icon /></span><Badge>{String(index + 1).padStart(2,"0")}</Badge></div><Card.Title>{title}</Card.Title><Card.Text>{text}</Card.Text></Card.Body>
            <Card.Footer><Button variant="link">Explore capability <FiArrowRight /></Button></Card.Footer>
          </Card>
        </Col>)}
      </Row>
    </Modal.Body>
  </Modal>;
}
