import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <div style={{ background: 'linear-gradient(135deg, #f5f0e7 0%, #e8f0e8 100%)', minHeight: '100vh' }}>
      <div className="hero-section" style={{ padding: '60px 0' }}>
        <Container>
          <h1 className="text-center text-white mb-3">🌸 About Flower Paradise 🌸</h1>
          <p className="text-center text-white lead">Discover the beauty and magic of flowers</p>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="mb-4 shadow-sm">
              <Card.Body className="p-4">
                <h3 className="text-success mb-3">🌸 Our Mission</h3>
                <p className="lead">
                  At Flower Paradise, we believe that flowers have the power to brighten lives, 
                  express emotions, and connect people. Our mission is to share the beauty and 
                  meaning of flowers with flower lovers around the world.
                </p>
              </Card.Body>
            </Card>

            <Card className="mb-4 shadow-sm">
              <Card.Body className="p-4">
                <h3 className="text-success mb-3">🌱 Flower Care Tips</h3>
                <Row>
                  <Col md={4}>
                    <h5>💧 Watering</h5>
                    <p>Water early morning for best results</p>
                  </Col>
                  <Col md={4}>
                    <h5>☀️ Sunlight</h5>
                    <p>Different flowers need different sunlight</p>
                  </Col>
                  <Col md={4}>
                    <h5>🌱 Soil</h5>
                    <p>Use well-draining organic soil</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <h3 className="text-success mb-3">🌺 Flowers by Season</h3>
                <Row>
                  <Col sm={6} md={3}>
                    <div className="text-center p-2">
                      <div className="display-6">🌸</div>
                      <h6>Spring</h6>
                      <small>Tulips, Daffodils</small>
                    </div>
                  </Col>
                  <Col sm={6} md={3}>
                    <div className="text-center p-2">
                      <div className="display-6">🌻</div>
                      <h6>Summer</h6>
                      <small>Sunflowers, Roses</small>
                    </div>
                  </Col>
                  <Col sm={6} md={3}>
                    <div className="text-center p-2">
                      <div className="display-6">🍂</div>
                      <h6>Fall</h6>
                      <small>Chrysanthemums</small>
                    </div>
                  </Col>
                  <Col sm={6} md={3}>
                    <div className="text-center p-2">
                      <div className="display-6">❄️</div>
                      <h6>Winter</h6>
                      <small>Poinsettias</small>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;