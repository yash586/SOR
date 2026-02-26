import { useRef } from "react";
import { RegisterPayload } from "../types/RegisterPayload";
import { Link } from "react-router-dom";

interface RegisterFormProps {
  onSubmit: (payload: RegisterPayload) => {};
  isLoading: boolean;
  error: string | null;
}

function RegisterForm({onSubmit, isLoading, error} : RegisterFormProps) {

    const firstName = useRef<HTMLInputElement>(null);
    const lastName = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({firstName: firstName.current?.value ?? "", 
                lastName: lastName.current?.value ?? "",
                email: email.current?.value ?? "",
                password: password.current?.value ?? ""
              });
    };

    return (
        <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card" style={{ borderRadius: "1rem" }}>
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                        alt="register form"
                        className="img-fluid h-100"
                        style={{ borderRadius: "1rem 0 0 1rem", objectFit: "cover" }}
                      />
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">
                        <form onSubmit={handleSubmit}>
                          <div className="d-flex align-items-center mb-3 pb-1">
                            <i
                              className="fas fa-cubes fa-2x me-3"
                              style={{ color: "#ff6219" }}
                            />
                            <span className="h1 fw-bold mb-0">Logo</span>
                          </div>
                          <h5
                            className="fw-normal mb-3 pb-3"
                            style={{ letterSpacing: 1 }}
                          >
                            Create your account
                          </h5>

                          {/* First Name & Last Name side by side */}
                          <div className="row mb-4">
                            <div className="col">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  id="firstName"
                                  className="form-control form-control-lg"
                                  ref={firstName}
                                />
                                <label className="form-label" htmlFor="firstName">
                                  First Name
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  id="lastName"
                                  className="form-control form-control-lg"
                                  ref={lastName}
                                />
                                <label className="form-label" htmlFor="lastName">
                                  Last Name
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Email */}
                          <div className="form-outline mb-4">
                            <input
                              type="email"
                              id="email"
                              className="form-control form-control-lg"
                              ref={email}
                            />
                            <label className="form-label" htmlFor="email">
                              Email address
                            </label>
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              id="password"
                              className="form-control form-control-lg"
                              ref={password}
                            />
                            <label className="form-label" htmlFor="password">
                              Password
                            </label>
                          </div>
                          { error && 
                            (<div className="alert alert-danger" role="alert">
                                {error}
                              </div>)
                          }
                          <div className="pt-1 mb-4">
                            <button
                              className="btn btn-dark btn-lg btn-block w-100"
                              type="submit"
                              disabled={isLoading}
                            >
                              {isLoading ? "Creating a new account..." : "Register"}
                            </button>
                          </div>

                          <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                            Already have an account?
                            <Link to="/login" style={{ color: "#393f81" }}>
                            Login here
                          </Link>
                          </p>
                          <a href="#!" className="small text-muted">
                            Terms of use.
                          </a>
                          <a href="#!" className="small text-muted">
                            Privacy policy
                          </a>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
};

export default RegisterForm;
