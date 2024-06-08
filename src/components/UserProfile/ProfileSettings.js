import React from 'react'

function ProfileSettings() {
  return (
    <div>
    {/* Settings Form */}
    <form>
      <div className="row mb-3">
        <label
          htmlFor="fullName"
          className="col-md-4 col-lg-3 col-form-label"
        >
          Email Notifications
        </label>
        <div className="col-md-8 col-lg-9">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="changesMade"
              defaultChecked=""
            />
            <label
              className="form-check-label"
              htmlFor="changesMade"
            >
              Changes made to your account
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="newProducts"
              defaultChecked=""
            />
            <label
              className="form-check-label"
              htmlFor="newProducts"
            >
              Information on new products and services
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="proOffers"
            />
            <label
              className="form-check-label"
              htmlFor="proOffers"
            >
              Marketing and promo offers
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="securityNotify"
              defaultChecked=""
              disabled=""
            />
            <label
              className="form-check-label"
              htmlFor="securityNotify"
            >
              Security alerts
            </label>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </form>
    {/* End settings Form */}
  </div>
  )
}

export default ProfileSettings