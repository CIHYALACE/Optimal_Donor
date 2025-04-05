import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";
import { FaUser, FaCode, FaStar, FaEnvelope } from "react-icons/fa";
import { SlInfo } from "react-icons/sl";


export default function UserProfile() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center py-5 my-2"
      style={{
        background: "linear-gradient(135deg,rgb(25, 135, 84),rgb(20, 43, 77))",
      }}
    >
      <Card
        className="p-4 rounded shadow-lg text-center"
        style={{
          height:"90%",
          width: "580px",
          borderRadius: "20px",
          boxShadow: "0px 10px 30px inset rgba(0, 0, 0, 0.2)",
        }}
      >

        <div className="position-relative">
          <Card.Img
            variant="top"
            src="https://i.imgur.com/Qtrsrk5.jpg"
            className="rounded-top"
            style={{
              height: "140px",
              objectFit: "cover",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          />

          <div
            className="position-absolute top-100 start-50 translate-middle border border-4 border-white rounded-circle"
            style={{
              width: "120px",
              height: "120px",
              overflow: "hidden",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
            }}
          >
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEBUQEhAVFhUVGBcWFhcWGBcXFRUWFRUWFxcVFRgYHSggGBolGxcVIjEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGBAQGysfHyYtLSstLy0tLS0tLS0tLS0tLS0tLS0zLS0tLS0tLS0tLS0vLS0tLS0tLS0tLS0tLS0tLf/AABEIAP4AxwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUCAwYBB//EAD8QAAEDAgMFBQQHBwQDAAAAAAEAAhEDIQQSMQVBUWFxBhMigZEyUqHwBxRCscHR4SMzQ2JykrIVgsLxJDTS/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwQGBf/EACcRAQEAAgEEAgIBBQEAAAAAAAABAhESAyExUUGRE2EiFDKB4fAE/9oADAMBAAIRAxEAPwD6oiIiRAEWTdPn1QYkIvXH59f0XiAiIgIiICIiAiIgAIQvWr0n59f0RDFEREiIiAiIgIiICIiAiIgIiICIiAiIgIiICKLido0KZipWpsMTDntaY4wTK+c9p+31fvHNwshjDaoGtcH8QWuBMcxCjaZH05zwLkgdbLJfGsZ29xGIolrmsB95kgDiCDc/Nln2f7bYhvhDpLNWkTLfxI3feouWkzF9iRVmwdssxVPO2xHtDWOY5KzUy7Vs0IiKQREQEREBERAREQEREBERAREQEREBa8RWaxjnuMNaC49AJK2Lm/pFqObsyvl1IY3ydUYCPQlKR8i7adpRi8Q54a9rNGguJNrTBMNPIfFVmz6DyfA7NGrDZ0ctx6fctmxdgV8U85KUtFiTELqX/R7jiAWNaMolsuv0B+YWVsazGqihh2n9qyxbqwiCSLlruZErGm1jXNrMtBykcWky2ellbYXszjn1MopFrhGYza3z6Hkpbfo7xoMOIy8tfm5UbTqsOzG0qjajhRcQ7IQIggkPhoINo0nlK+wU3SAfnyXwbauGqYGsRLg9sHe2ebC03819s2DVc/C0XvMufTY4nX2mg3PG6vgpnE9ERXUEREBERAREQEREBERAReL1B4vURAREQFRdvKAds+qwyZNMWIaSe9ZZsiJnjqr1U3bGoPqlTQkGm7LMTFVhB4xMKL4TPKj7G7PFDDgAzmAdMQTOk84XW4R8rhqPaKjQhj8xMCGsEw3SXcFa7M7XYR7sgeQdwcCPK65Z527O2tOwY4DcsK1RRMRtKmxneOcAAJJVC3tlSqEilRrVI3hhDfJx1V7VJjpB+kLZIr0gYGYTc+q6bs+CMJhwdRRpA9RTaFU4vFNr0nFoINhlcIIJ4q92dTyUmUybtY2fTWOFj6K/TU60SURFqwEREGQC8cEDl4SgIiICIiAiIgIiICIiAiIgLke2bQHh1znYKZESLOeQ7kQSuuVB2uwtR9E5GuccpHhEuDrFpjhqFn1JvFp0bJl3cvX2BUqNz03ltxOUeIgcPJaB2LcWuqd9UzTLZBEC9jJvqLxuXQ9m9rNNNma0tBHQiVv27tymxkukU5hx0PKB1hc+9OvW0t+yxWwdOmTDiBLhrICo8P2LcHkF9XKQPDLMoNvGDM7jzurOn2rwQpU5q62AAJdfkLqzbtiHBrxAPsOGh5HgVM0juiv2eKTMuYuje4ibaSVYYAEjO5mV7oDpIJ8MxpuElU23MaSMrfeY3nL3tED1XRMJNyIndwWnTndl1b/HVZIiLdzCIiAiIgIiICIiAiIgIiICIiAiIgIi8QfHcLjn0cU7BOOV1N9RgcbwP4bo3ggB3mt+M7P4twipiG1GHQkkb+hBVp9LWxmBrceyRVEMcB9ttyHHm29+HQKk7K9p2up9zWGYcZuDvPxWGeOruOnp5y9qtMF2Rp5WxUa1zbyXuMmZmMoHxUxmy8SyrTz4tndAyWgG4beJJPJNm4nB0nuqF2YQIBO/XT51XIdpe0NWrWhszdrGNub7hxJgKklrXPPGeI6bY21jitpU6NMeFjjUef5aehP+7KPRfTFxn0bdnvqtJznwa1QNLz7ovDAeW87z0C7JdGEknZydS23u9REVlBERARF4g9REQEREBERAWTdPn0WKAoMnfPx/JYoiAiKNiMdTZq6/AXP6IJKKjxO3yAcjL7s2/wAh+a5Hb20sRUaQ6ocs+y3wtjgQNfOUFr272lRe0Ydjw6oxwc8CYaC02J0m4tqvmVbZPiL6Tsh0IiRfhwVzgmQ8g7/jaPyUl+BcDmH/AEsMrZlXRhJcY5OlgsUXZWuXddjezApO75/iqcTuB1gblv2Tgr3hdZgaIAUctrcZO6ZhKzaWYusIbuJjxRJjQCdVaNeHCQZHWePoVUl+WXco9UpvdAMweVlrh4YdTytUUGni3DUTzFipFPENdYG/A2Kuo3IiICIiAiIgIiICIiAiIgKDjdotp/iT7I6lb8bX7um5/DQczoqmg7M2951nfOsohsrVqjtXW4CwUV9BbtlthndnWmSzq3Vh5+Et8wVJqNQU1enY9PzVficHI0V5i2eFx5FYCmIHT8EHE43BOYcw3aH8DzU3ZuOpuGR5ynn+a6F2FF+aif6SyZyj55f9KuWMvlbHO4+EHDuIqABpI4gSPVdJ9ZaIEzxi56WUKlstg3D+39VYYbCNGgjyhVnTi961r0Fz3aRwH4lSw2PL5lGNA0COK0ZbeBaHiXfPBbnCy1NHiPl9yDOniXt0MjgfwU3DY1rzGh4H8OKr6rrho3/ALMW0tv8ANBbIsKNTM0O4/JWaJEREBERAREQEREHPdrsQ9raYYYIdnndLfZnlqtWzcWyozO0ReHM3seNWn7wd4K07R2iw4oh58BiiDua9pkO/uLgtT8IabjUZ7Qs9o+238xqPTeiFqHZagdueMp/qbLm/Av8Agt2JdDT0UB9ZrmZp0gnoLyOrc3xCU8TLhRJvPwYZPwy+qCdVbII8lpwzZpt6fcpLdOsph6ENgkCJ42udeCCP3a97tbXNgwvAgxDVtYFhKya5Bkjl4VlzQecFqBueq2OdooNSuAT1KCQ03PzYfrK9fUAHwHMrQyoAOt+v6KOyrn8f2dGc+LvPdy6oLjZNWQ5vAz6j9FYKk2O4iprAcCOpF7fH1V2QgIiIkREQEREBR8fiO7pOfvAt1Nh8SpCpNv4toc2kXAWLyJEwJAt6+iDj6FEOJFW7KpLHH3XT4SfX4q0wuIq03ChVu9vsOOlZg3E++OO9Z4CjTc17ZBD4JAIMO4jhZWD8Mx7Ax9y3Q/aHNEIhrU3Mc5hggw4b2E+8OEgeirdm4o/W2B1iKbgf6hLT/iFa19mNec4dlqAZS8XD2+7UafaHxHFcrh8WyntF1HOXOb4ib+H9mG5L3O4zwOp1Qd8H+ypNN4k3tM63uZuPUKoo4xr2y3ct7Kvi6hBMeZWregesXG8IMSbrY0qDiHEP5LdTrBBLC8c/otLqywdVQbarwud2zi8lRgJ9outxjKfIa3VrUr7yqnFYZlasHOLvA2fCL+M6DgfB9+iDeyqKsj7AvUcbTH2By5eXFS3PMC0T7I3hu9x+dStbaGUCWQB7FJu7+Z53lbBTIBe67zu+4cmhBKwz4iDBbbWN+ax+9dCKgcARvg/D59FzFOnlHPeeJVzsmpNOPdJ9Dcfj6IJyIiJEREBERAXHdvOxmGxkYlxLatIASBIqMDp7twPUgEaTv0XYqu7QGMNUPIf5NUXwnHzEHZGAotYB3TI/pC8xdZ9J7v8Ax89E3BpCXNsJBYL6g6Tqqtr67neCvTbAb4XAkjUzY8+Cm4V20GiR3NUaiHFro6OEfFc0ru4yd2ymRWbnw1SmeLHyD0DhdvmCuH7SvezHU3PZkIpEahzXZngy1w1AykXAPJd42oapDazHUaurDIOmsOaSHDi2fwK5r6Rdj1alJuKYCX0A4PYPtMdBLxvMRMcCeC1xyvyx6nSx+GOzceyZDhfVWv1nfK+W7Pxj5BEyu72RjRVYAbO3jjzWrmsX9HGA2BWYrKjqOdScDuVzAIB4oh5inE5SoFLEEOIKmYypAA37lWVB4pQWBxFlp+vAtJ4LFm5RKQDa+R3svBb6oN1fEAh19wPoQt2wQ55e5rSTmjoGiIJNhoT5rnscXUmVmG+Rrjzhvi+4Lu+zeHyUGN3m56m5PmZKrldL4Y7bqWy6huS0T1JHwH3ryrsl4uKrJ50yf+auWFaq5sq8q0mEfLu2m3MfgnsAZRqCo7K2GVJLvdyh5v0XS9ha20ak1MVhG0GFtpce8c6RB7s+wIn2jPXVXOCcDiTxDHHp4mCyt1bG7jPOaoiIrKiIiAiIgKt7Rf8Aq1Og/wAmqyUTa9MHD1J9wm8xDb7rqL4qcfMck/A0DTbWdhjVNgck5w29xBBN4sFuoYCg8H6vialF4uWuJcP9zH+IeRClbOqgNEWHImLzcTfcRB4K0qtZVGVwBHPjy4LkfQlV+GfWZFLE5XtN21WzE8zq09fUq+7vw6zwULCYNrAGNe4AaDMdOZJUh2HO57uV7eavKplZXzztZsh2HqZqVIGm8mCB7B1ykcNYjguepVajHh51ndK+tYzBPqNLXOkbrCx3HcqLE7Bcf4YP9Jg+jrfFa45z5c2XTu+yDTcMRQkcFv2Jic1ItPtMMHooFLC4ijU8NGpk4Estz9rqpmE2diRWNVtMMa9sOa4yTezgG6eqtzx9qfjy9NlUTDiteIA1Vg7YlRzcpqgc8m+d3i6LczYE2fVJ6AD7yVHOJ/FkqaJmFq2tTiHjcukodm6c/vH23eH8lYnYtEiC2fMx5qeURwrgNswXUqg/ixTPIyAZ/wBsru8A2GtHILa3ZWHgDuWQDI8IMHiJ3rc5gA8I03KmV21wx0zzQouMqw1U2K7Y4Sm806j8j+DpB9ClPatLENPd1AY3SJVLk1mFbuzsuq1nndlaPOSf+Kv1UdmaZFEuP23uPkPB/wASrZbYf2xzdS/yr1ERWUEREBERAXlRuZpad4I9RC9RBwlB9RzQGtu06anfrxMk+qnUKlU6+H743rzaJdQxLiB4XeMdHa/GfgrOji6bxqFxWd9PoS7xlY0a45qwo4iVW1ntAsVFdi43KZdIuO3RNcCjgOK5h21HaSoz9rnmVPKI4OrAZv3fPmsO+ZbRcg7adUmYNuK0Vto1R4j4REST9ycjg7d9dsC4AvrwWP8AqNAavbI4kL5ZtjbvGqfxPGGhc5W2hUPsNM8X/wDyPzVptS6fdMPtWmSQHB3RTDi59kdTv9F8M2VtetSIzDMJnMLOHlofgu92Z2xpOABcA70M8wVPJHGV3LX8Co+Kk+yQHcDpPOFR0+0FI3zDqPxC82oauJpZ8JWa2swyJJDHDe10XHI8U3taY6V+O7WUmONDHYc0xOX9qyaT/wClxlrh0Kp9pbGoVT32zstN7YJpt8NOoDuDdGu4EWO9b6Ha90uwmOw5a+INOoAWuB4E+FwUPA9nqwxI+pOHcvBdc/uDIzNvqPFI/RR57Ldp3fTNm4U0qTKZcXFoguO86nyUleQvV0uG3fcREQEREBERAREQVHaTAmpTDmiXMMwNS06xx3fFcaRUB8LX8/C5fSUWWfSmV23w69xx1p8176rN5B/mn4BbmVnjW67HtM0nB1oNwwkHeMsG3ovmGOc4tA7x7be01xH9w3qn4f2t/Ufp0f1niAsa21GNFwJ5wAVwrvrBEjEOdyLnX63UCphas5iL9ZUzoov/AKPUdLtPtiwOytcHH+QSB1Jt5BVNXGmtpXgnyPxv6KsxmA7zxAFr9/P9VH+qVm+0wnpcK/44p+armjsx+tjxnXqp9LBOAnJ1XNUsVVYZDnt9SPQqww/aSq3Vod0kfmFTLp5L49XH5W9SkHD2Ljl96iVMBPHz3clqf2ibvpEH+Ug/AheN28w/w3eeXTndV4ZL/kwvyDZJ1aQt+AxWJwz8zHkjeJMEfgq//XSXQylI0kujz0srPYFYYnEU6JGUPqBmYXN2uMx5KeGSOeK/2liKO0aMVXZajP3b4jKd7H8iY9JXT9g9hVKFJtarUJc9kZNwBIIJO8kAeqj4D6P2Mqh762ZoM5Q0tLuTjmNl2qvhhfNU6vUl7QREWrAREQEREBEhIQESEhB4vUhIQVHarGilhXuP2oZ/eYPwlfMsSC2QbhpLfS0Fd59INMuw7WDUvkDjlBt8Vwu0Wu7wVG/aADxzAEH0IHkgpazL2UjDUKzhIY4jjBI9VNZSbIzC0iem9dFSpjPGXfuJENkBuSLAZbzyRDmqOHJU5mHIvP6q2xOCa50h0EgT1i5XtLChty4O5CEEOkxrrGmD1AWvFYDC6OaAeQgqwq3FmrBrWOs5t0HNYjY+Gvln1VZiNiE+w4ATcGZjj0XZ1dlNJgNUbEbLMZWkxv56IOHrYTKYaN0HgT8/O9W/YhwZjaLyPCx+Y+fgnyzT5KRjtn5RcrPY2BdMiwvJO/cg+2IomycSatCnU3uaCeuh+IKlwiQBFmBb51nf5LxyDFEhIQESEQfGaT8S5pc11UgakOceHO+oWU4uY/bzIH8TUjMB1IvHBaaWNqNYabXQ05pED7bcrrxMEAWncDqFvdtrEEk95czJyskyGtO7g1vovQXG+o8tMprvayoU8W52XNWABh5JqRTEgEv4AZgT1XuJpYpr8odWcJIa4d5D8tyW8YvMcFpdtSsdXi4LT4WXByA7tfAy+oyhZnbOIv8AtTexs2/hy8OBUccv0nlj7v8A3+XjPrZAI78gxBHeEGTAgjWTbqtdaviGHK99Vp4OL2n0K3M23iG2a8DTRlMeyIb9nc3w9LaKLisU+o7M90m94A1c5x05ucfNWku+8iLlNdrWNTEVHe1UcY0lxMepWJe73j6lYorainK+3uc8T6lZd66IzOjqVgiaiOV9su8d7x9SvM54n1K8RNQ5X2y713vO9Sneu953qViiahyvtn37/fd/cU75/vu9SsETUTyvt6XHiV6Hu94+pWKJqI5X2nUWYnujVa9wptMfvIgkjdOkkeqk08HjHHKKjpuI728guB+1xY70Kqu8dGXMcp1EmD1GiybiHjR7hPBxHHnzPqVS43419NJnPnf2tPqWOBjO8E2vVi/hEe1/M31Wis3FNnM+oIbmPjNgSRx1kG26CoPfPmc7p6ndEf4t9BwXj6rjq4m0XJNuHRJjfnX0XOfG/tbOwGOBcJqeEEmKhMACToeR9DwXn1LG73PBkNg1YIJcGgEF1rlVYrPGj3azqdTqeth6LJ2JqGxqPPVx4zx43Uccv19J54/v7/021q9dpANV9wHCHuNnCRN7WRRSfnpYL1X4xncr7f/Z" // Replace with user's profile image
              alt="Profile"
              className="img-fluid rounded-circle"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
                    
                }}
            />
          </div>
        </div>

        <Card.Body className="mt-5">
        <Button variant="success" className="mt-3 btn btn-warning fw-bold">
            Edit Profile
          </Button>
          <h3 className="fw-bold mt-3">John Doe</h3>
          <p className="text-muted">
            <FaLocationDot className="me-2 text-success mb-1" />New York, USA
          </p>


          <div className="d-flex justify-content-between align-items-center mt-4 px-4">
            <div className="text-center">
              <h6 className="mb-1 text-muted">Donate</h6>
              <span className="fw-bold fs-5 text-success">200$</span>
            </div>

            <div className="text-center">
              <h6 className="mb-1 text-muted">Campaign</h6>
              <span className="fw-bold fs-5 text-success">5</span>
            </div>

            <div className="text-center">
              <h6 className="mb-1 text-muted">Raised</h6>
              <span className="fw-bold fs-5 text-success">+10k</span>
            </div>
          </div>

          <h4 className="fw-bold text-success mt-4">Bio</h4>
          <p className="text-center text-muted">
            Passionate about making a difference, I created this platform to
            connect people with causes that truly matter. Our mission is to
            bring communities together, empower those in need, and inspire 
            meaningful contributions. Every donation, big or small, helps 
            transform lives. Join us in making a lasting impact!
          </p>
          
        </Card.Body>
      </Card>
    </Container>
  );
}
