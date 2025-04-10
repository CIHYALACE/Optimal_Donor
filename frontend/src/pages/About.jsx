import { Container, Row, Col, Card } from 'react-bootstrap';

const teamMembers = [
  {
    id: '1',
    name: 'John Rodriguez',
    title: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300',
    bio: 'John has over 15 years of experience in the nonprofit sector and founded Optimal Donor to make fundraising more accessible to everyone.'
  },
  {
    id: '2',
    name: 'Maria Chen',
    title: 'Chief Operations Officer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300',
    bio: 'Maria leads our operations team, ensuring campaigns run smoothly and funds reach their intended recipients safely and quickly.'
  },
  {
    id: '3',
    name: 'David Washington',
    title: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=300',
    bio: 'David oversees our technical infrastructure and development, with a focus on creating a secure and user-friendly platform.'
  },
  {
    id: '4',
    name: 'Priya Sharma',
    title: 'Community Outreach Director',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300',
    bio: 'Priya builds relationships with communities and organizations to help spread awareness about fundraising opportunities.'
  }
];

const AboutPage = () => {
  return (
    <Container className="py-5">
      {/* About Section */}
      <section className="mb-5">
        <h1 className="mb-4 perfect-font">About Optimal Donor</h1>
        <Row>
          <Col lg={6} className="mb-4 mb-lg-0">
            <p className="lead">
              Optimal Donor is a community-powered platform where people can
              raise money for their personal needs, community projects, and
              charitable causes.
            </p>
            <p>
              Founded in 2023, our mission is to empower individuals and
              communities by providing the tools and resources they need to
              bring their ideas to life and overcome financial challenges.
            </p>
            <p>
              We believe that everyone should have access to the support they
              need, whether it's for medical expenses, educational
              opportunities, community improvements, or creative projects.
            </p>
            <p>
              Our platform is designed to be intuitive and accessible, making it
              easy for anyone to create a campaign and start raising funds. We
              also provide personalized support to help our users maximize their
              fundraising potential.
            </p>
          </Col>
          <Col lg={6}>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000"
              alt="Team collaborating"
              className="img-fluid rounded shadow"
            />
          </Col>
        </Row>
      </section>

      {/* Values Section */}
      <section className="mb-5 py-5 bg-light rounded">
        <Container>
          <h2 className="text-center perfect-font mb-5">Our Values</h2>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <div className="display-4 mb-3">🤝</div>
              <h3>Community</h3>
              <p>
                We believe in the power of community to support each other in
                times of need.
              </p>
            </Col>
            <Col md={3} className="mb-4">
              <div className="display-4 mb-3">🔒</div>
              <h3>Trust</h3>
              <p>
                We maintain the highest standards of trust and transparency on
                our platform.
              </p>
            </Col>
            <Col md={3} className="mb-4">
              <div className="display-4 mb-3">❤️</div>
              <h3>Compassion</h3>
              <p>We approach every campaign with empathy and understanding.</p>
            </Col>
            <Col md={3} className="mb-4">
              <div className="display-4 mb-3">🚀</div>
              <h3>Innovation</h3>
              <p>
                We're constantly improving our platform to better serve our
                users' needs.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="mb-5">
        <h2 className="text-center perfect-font mb-5">Our Team</h2>
        <Row>
          {teamMembers.map((member) => (
            <Col md={6} lg={3} key={member.id} className="mb-4">
              <Card className="h-100 shadow-sm text-center">
                <div className="pt-3">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-circle mb-3"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <div className="text-muted mb-3">{member.title}</div>
                  <Card.Text>{member.bio}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Impact Section */}
      <section className="mb-5 py-5 bg-success text-white rounded">
        <Container className="text-center">
          <h2 className="mb-4 perfect-font ">Our Impact</h2>
          <Row className="justify-content-center">
            <Col md={4} className="mb-4 mb-md-0">
              <div className="display-3 fw-bold mb-2">$2.5M</div>
              <p className="lead">Raised for campaigns</p>
            </Col>
            <Col md={4} className="mb-4 mb-md-0">
              <div className="display-3 fw-bold mb-2">500+</div>
              <p className="lead">Successful campaigns</p>
            </Col>
            <Col md={4}>
              <div className="display-3 fw-bold mb-2">10,000+</div>
              <p className="lead">Donors worldwide</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section>
        <h2 className="text-center perfect-font mb-5">Get In Touch</h2>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <p>
                    Have questions or need assistance? Contact our support team.
                  </p>
                </div>
                <div className="d-flex justify-content-center gap-3">
                  <a
                    href="mailto:support@Optimal Donor.com"
                    className="btn btn-success"
                  >
                    Email Us
                  </a>
                  <a
                    href="tel:+18005551234"
                    className="btn btn-outline-primary"
                  >
                    Call Us
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default AboutPage;