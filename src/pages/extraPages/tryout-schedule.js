import React, { useState } from "react";
import styles from "./tryout-schedule.module.css"; // Importing the CSS Module

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
            {/* Tryout Schedule Form */}
            <div className={styles.registrationContainer}>
                <div className={styles.registrationBox}>
                    <div className={styles.formTitle}>
                        <h2>TRYOUT SCHEDULE</h2>
                    </div>
                    <form id="schedule-form">
                        <div className={styles.formContent}>
                            <div className={styles.timeSelectionBox}>
                                <label htmlFor="select-time" className={styles.timeSelectionBox}>
                                    Select Time
                                </label>
                                <select
                                    id="select-time"
                                    name="select-time"
                                    required
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className={styles.selectTime}
                                >
                                    <option value="time1">10:00 AM</option>
                                    <option value="time2">2:00 PM</option>
                                    <option value="time3">4:00 PM</option>
                                </select>
                            </div>
                            <div className={styles.medicalUploadBox}>
                                <label htmlFor="medicalUpload" className={styles.medicalTitle}>
                                    Medical Certificate:
                                </label>
                                <label htmlFor="medicalUpload" className={styles.uploadBtn}>
                                    Attach File
                                </label>
                                <input type="file" id="medicalUpload" accept=".pdf,.jpg,.png" style={{ display: "none" }} />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="select-date" className={styles.selectDateGroup}>Select Date</label>
                            <input
                                type="date"
                                id="select-date"
                                name="select-date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className={styles.selectDate}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="calendar">Calendar</label>
                            <table className={styles.scheduleTable} id="editable-table">
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

                        <div className={styles.buttons}>
                            <button type="button" className={styles.confirmBtn} onClick={handleConfirm}>Confirm</button>
                            <button type="button" className={styles.cancelBtn} onClick={handleCancelForm}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Confirmation Modal */}
            <div id="confirmation-modal" className={styles.confirmationModal} style={{ display: "none" }}>
                <div className={styles.confirmationBox}>
                    <h3>Are you sure you want to proceed with this information?</h3>
                    <div className={styles.modalButtons}>
                        <button className={styles.confirmBooking} onClick={handleConfirmBooking}>Confirm Booking</button>
                        <button className={styles.cancelBooking} onClick={handleCancelBooking}>Cancel Booking</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TryoutSchedule;
