import React from 'react'

function ProfileEdit() {
  return (
    <div>
        {/* Profile Edit Form */}
                  <form>
                    <div className="row mb-3">
                      <label
                        htmlFor="profileImage"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Profile Image
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <img src="assets/img/Profile/Profile-img.png" alt="Profile" />
                        <div className="pt-2">
                          <a
                            href="#"
                            className="btn btn-primary btn-sm"
                            title="Upload new profile image"
                          >
                            <i className="bi bi-upload" />
                          </a>
                          <a
                            href="#"
                            className="btn btn-danger btn-sm"
                            title="Remove my profile image"
                          >
                            <i className="bi bi-trash" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="fullName"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Full Name
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="fullName"
                          type="text"
                          className="form-control"
                          id="fullName"
                          defaultValue="User 1 name "
                        />
                      </div>
                    </div>
                   
                    <div className="row mb-3">
                      <label
                        htmlFor="company"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Organization
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="company"
                          type="text"
                          className="form-control"
                          id="company"
                          defaultValue="College "
                        />
                      </div>
                    </div>
                
                    <div className="row mb-3">
                      <label
                        htmlFor="Country"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Country
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="country"
                          type="text"
                          className="form-control"
                          id="Country"
                          defaultValue="India"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="Address"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Address
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="address"
                          type="text"
                          className="form-control"
                          id="Address"
                          defaultValue="Katol Road Nagpur "
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="Phone"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Phone
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="phone"
                          type="text"
                          className="form-control"
                          id="Phone"
                          defaultValue="(+91) 943997272"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="Email"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Email
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="email"
                          type="email"
                          className="form-control"
                          id="Email"
                          defaultValue="sigma123@gmail.com"
                        />
                      </div>
                    </div>
                
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </form>
                  {/* End Profile Edit Form */}
                </div>
  )
}

export default ProfileEdit