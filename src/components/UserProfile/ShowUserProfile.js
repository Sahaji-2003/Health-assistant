import React from 'react'
import { Link } from 'react-router-dom'
import ProfileEdit from './ProfileEdit'
import ProfileSettings from './ProfileSettings'
import ChangePassword from './ChangePassword'

function ShowUserProfile() {
  return (
    <>
  
    {/* End Page Title */}
    <section className="section profile">
      <div className="row">
        <div className="col-xl-4">
          <div className="card">
            <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
              <img
                src="assets/img/Profile/Profile-img.png"
                alt="Profile"
                className="rounded-circle"
              />
              <h2>Mehvish Sheikh </h2>
              <h3>User Id 1</h3>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card">
            <div className="card-body pt-3">
              {/* Bordered Tabs */}
              <ul className="nav nav-tabs nav-tabs-bordered">
                <li className="nav-item">
                  <button
                    className="nav-link active"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-overview"
                  >
                    Overview
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-edit"
                  >
                    Edit Profile
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-settings"
                  >
                    Settings
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-change-password"
                  >
                    Change Password
                  </button>
                </li>
              </ul>
              <div className="tab-content pt-2">
                <div
                  className="tab-pane fade show active profile-overview"
                  id="profile-overview"
                >
                  <h5 className="card-title">Profile Details</h5>
                  <div className="row">
                    <div className="col-lg-3 col-md-4 label ">Full Name</div>
                    <div className="col-lg-9 col-md-8">Mehvish Sheikh</div>
                  </div>
    
                 

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label">Country</div>
                    <div className="col-lg-9 col-md-8">India</div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 col-md-4 label">Address</div>
                    <div className="col-lg-9 col-md-8">
                      Nagpur India
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 col-md-4 label">Phone</div>
                    <div className="col-lg-9 col-md-8">
                      (+91) 934562789
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 col-md-4 label">Email</div>
                    <div className="col-lg-9 col-md-8">
                      k.anderson@example.com
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade profile-edit pt-3"
                  id="profile-edit"
                >
                  {/* Profile Edit Form */}
                  <ProfileEdit/>
                  {/* End Profile Edit Form */}
                </div>
                <div className="tab-pane fade pt-3" id="profile-settings">
                  {/* Settings Form */}
                  <ProfileSettings/>
                  {/* End settings Form */}
                </div>
                <div
                  className="tab-pane fade pt-3"
                  id="profile-change-password"
                >
                  {/* Change Password Form */}
                  <ChangePassword/>
                  {/* End Change Password Form */}
                </div>
              </div>
              {/* End Bordered Tabs */}
            </div>
          </div>
        </div>
      </div>
    </section>
 
  {/* End #main */}
</>

  )
}

export default ShowUserProfile