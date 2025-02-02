import React, { useState } from "react";
import "./style.css"; // Existing styles
import "./tryout-schedule-admin.css"; // Registration page styles

const TryoutScheduleAdmin = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isDropdownEditMode, setIsDropdownEditMode] = useState(false);
    const [selectedCoach, setSelectedCoach] = useState("coach1");

    const handleScheduleToggle = () => {
        setIsEditMode(!isEditMode);
    };

    const handleDropdownToggle = () => {
        setIsDropdownEditMode(!isDropdownEditMode);
    };

    const handleCoachChange = (e) => {
        setSelectedCoach(e.target.value);
    };

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="logo">
                    <img src="./pics/logo.png" alt="Logo" />
                </div>
                <div className="search-bar">
                    <i className="fas fa-search"></i>
                    <input type="text" id="searchInput" placeholder="Search" />
                </div>
                <ul className="nav-links">
                    <li><a href="/">HOME</a></li>
                    <li><a href="#">ABOUT</a></li>
                    <li><a href="#">TRYOUTS/TRANING</a></li>
                    <li><a href="#">EVENTS</a></li>
                    <li><a href="#">COLLEGES</a></li>
                    <li><a href="#">CONTACT US</a></li>
                    <li><a href="/login">LOGIN</a></li>
                </ul>
                <div className="notifications">
                    <i className="fas fa-bell"></i>
                </div>
                <div className="profile">
                    <a href="/profile"><i className="fas fa-user-circle"></i></a>
                </div>
            </nav>

            {/* Tryout Schedule Section */}
            <section className="coach-section">
                <div className="registration-box">
                    <div className="form-title">
                        <h2>TRYOUT SCHEDULE</h2>
                    </div>

                    {/* Coach Selection */}
                    <div className="coach-selection-box">
                        <label htmlFor="coachSelect" className="select-coach-title">Select Coach:</label>
                        <select
                            id="coachSelect"
                            value={selectedCoach}
                            onChange={handleCoachChange}
                            disabled={isDropdownEditMode}
                        >
                            <option value="coach1">Coach 1</option>
                            <option value="coach2">Coach 2</option>
                            <option value="coach3">Coach 3</option>
                            <option value="coach4">Coach 4</option>
                        </select>
                    </div>

                    {/* Medical Certificate Upload */}
                    <div className="medical-upload-box">
                        <label htmlFor="medicalUpload" className="medical-title">Medical Certificate:</label>
                        <label htmlFor="medicalUpload" className="upload-btn">Attach File</label>
                        <input type="file" id="medicalUpload" accept=".pdf,.jpg,.png" style={{ display: 'none' }} />
                    </div>

                    {/* Edit Button for Coach Selection */}
                    <div className="edit-button-container1">
                        <button className="edit-btn" onClick={handleDropdownToggle}>
                            Edit Coach Selection
                        </button>
                    </div>

                    {/* Date Selection */}
                    <div className="form-group select-date-group">
                        <label htmlFor="select-date">Select Date</label>
                        <input type="date" id="select-date" name="select-date" required />
                    </div>

                    {/* Schedule Table */}
                    <table className="schedule-table" id="editable-table">
                        <thead>
                            <tr>
                                <th>Coach</th>
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Coach 1</td>
                                <td>9 AM - 12 PM</td>
                                <td>Off</td>
                                <td>9 AM - 12 PM</td>
                                <td>Off</td>
                                <td>9 AM - 12 PM</td>
                            </tr>
                            <tr>
                                <td>Coach 2</td>
                                <td>10 AM - 1 PM</td>
                                <td>Off</td>
                                <td>10 AM - 1 PM</td>
                                <td>Off</td>
                                <td>10 AM - 1 PM</td>
                            </tr>
                            <tr>
                                <td>Coach 3</td>
                                <td>Off</td>
                                <td>8 AM - 11 AM</td>
                                <td>Off</td>
                                <td>8 AM - 11 AM</td>
                                <td>Off</td>
                            </tr>
                            <tr>
                                <td>Coach 4</td>
                                <td>Off</td>
                                <td>9 AM - 12 PM</td>
                                <td>Off</td>
                                <td>9 AM - 12 PM</td>
                                <td>Off</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Edit Button */}
                    <div className="edit-button-container">
                        <button className="edit-btn" onClick={handleScheduleToggle}>Edit</button>
                    </div>

                    {/* Action Buttons */}
                    <div className="buttons">
                        <button type="button" className="confirm-btn">Confirm</button>
                        <button type="button" className="cancel-btn">Cancel</button>
                    </div>
                </div>
            </section>

            {/* Confirmation Modal */}
            <div className="box-container"></div>
            <div id="confirmation-modal" className="confirmation-modal">
                <div className="confirmation-box">
                    <h3>Are you sure you want to proceed with this information?</h3>
                    <div className="modal-buttons">
                        <button className="confirm-booking">Confirm Booking</button>
                        <button className="cancel-booking">Cancel Booking</button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="footer-bar">
                <div className="email-contact">
                    <i className="fa fa-envelope"></i> email1@periodt.com
                </div>
                <div className="email-contact">
                    <i className="fa fa-envelope"></i> email2@periodt.com
                </div>
            </div>
        </div>
    );
};

export default TryoutScheduleAdmin;
