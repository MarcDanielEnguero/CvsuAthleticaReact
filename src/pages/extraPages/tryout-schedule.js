import React, { useState } from "react";
import "./style.css"; // Your existing CSS
import "./tryout-schedule.css"; // Your specific schedule CSS

const TryoutSchedule = () => {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    const handleConfirm = () => {
        if (time && date) {
            document.getElementById("confirmation-modal").style.display = "flex";
        } else {
            alert("Please fill in both time and date!");
        }
    };

    const handleCancelBooking = () => {
        document.getElementById("confirmation-modal").style.display = "none";
    };

    const handleConfirmBooking = () => {
        alert("Booking Confirmed!");
        document.getElementById("confirmation-modal").style.display = "none";
    };

    const handleCancelForm = () => {
        window.location.href = "register.html"; // Optional: Redirect to the registration page
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

            {/* Tryout Schedule Form */}
            <div className="registration-container">
                <div className="registration-box">
                    <div className="form-title">
                        <h2>TRYOUT SCHEDULE</h2>
                    </div>
                    <form id="schedule-form">
                        <div className="form-content">
                            <div className="time-selection-box">
                                <label htmlFor="select-time" className="time-selection-box">Select Time</label>
                                <select
                                    id="select-time"
                                    name="select-time"
                                    required
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                >
                                    <option value="time1">10:00 AM</option>
                                    <option value="time2">2:00 PM</option>
                                    <option value="time3">4:00 PM</option>
                                </select>
                            </div>
                            <div className="medical-upload-box">
                                <label htmlFor="medicalUpload" className="medical-title">Medical Certificate:</label>
                                <label htmlFor="medicalUpload" className="upload-btn">Attach File</label>
                                <input type="file" id="medicalUpload" accept=".pdf,.jpg,.png" style={{ display: "none" }} />
                            </div>
                        </div>
                        <div className="form-group select-date-group">
                            <label htmlFor="select-date">Select Date</label>
                            <input
                                type="date"
                                id="select-date"
                                name="select-date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="calendar">Calendar</label>
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
                        </div>

                        <div className="buttons">
                            <button type="button" className="confirm-btn" onClick={handleConfirm}>Confirm</button>
                            <button type="button" className="cancel-btn" onClick={handleCancelForm}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Confirmation Modal */}
            <div id="confirmation-modal" className="confirmation-modal" style={{ display: "none" }}>
                <div className="confirmation-box">
                    <h3>Are you sure you want to proceed with this information?</h3>
                    <div className="modal-buttons">
                        <button className="confirm-booking" onClick={handleConfirmBooking}>Confirm Booking</button>
                        <button className="cancel-booking" onClick={handleCancelBooking}>Cancel Booking</button>
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

export default TryoutSchedule;
