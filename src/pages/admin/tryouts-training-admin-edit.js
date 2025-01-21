import React, { useState } from 'react';
import './tryouts-training.css'; // Your custom styles
import './tryouts-training-admin-edit.css'; // Your custom admin styles
import './style.css'; // Existing styles

// Main TryoutsTraining Component
const TryoutsTraining = () => {
    const [tableCounter, setTableCounter] = useState(3); // Assuming there are already 2 tables
    const [originalTableState, setOriginalTableState] = useState(null);  // To store the original table state

    const addNewTable = () => {
        const tableName = document.getElementById('newTableName').value;
        const coachName = document.getElementById('newCoachName').value;

        if (tableName && coachName) {
            setTableCounter(prev => prev + 1);
            // Logic to dynamically add the new table
            // Similar to HTML structure you provided, but converted to JSX
        } else {
            alert('Please enter both table name and coach name.');
        }
    };

    const editTryout = (tableId) => {
        const table = document.getElementById(tableId);
        const rows = table.querySelectorAll('tbody tr'); // Select all rows in the table body
        setOriginalTableState(table.innerHTML);  // Save the original table state

        // Perform operations similar to your HTML JS code here
    };

    const confirmAdd = (tableId) => {
        // Logic for confirming addition of a new row
    };

    const addRow = (tableId) => {
        // Logic for adding a new row
    };

    const cancelAdd = (tableId) => {
        // Logic for canceling addition of a new row
    };

    return (
        <div>
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

            <section className="main-contents">
                <h1>TRYOUTS/TRAINING</h1>
                <h2>TRYOUTS & TRANING SCHEDULE</h2>
            </section>

            <section className="tryouts-container">
                <div className="header-with-button">
                    <input type="text" id="newTableName" placeholder="Enter Table Name" />
                    <input type="text" id="newCoachName" placeholder="Enter Coach Name" />
                </div>
                <button className="add-button" onClick={addNewTable}>Add New Table</button>
            </section>

            {/* Table 1 - Example */}
            <section className="tryouts-container">
                <div className="header-with-button">
                    <h2>Javelin Try-outs</h2>
                    <p>Coach: John Doe</p>
                </div>

                {/* Edit, Confirm and Cancel Buttons */}
                <div>
                    <button className="edit-button" onClick={() => editTryout('table1')}>Edit</button>
                    <button id="confirmButton-table1" className="confirm-button" style={{ display: 'none' }} onClick={() => confirmAdd('table1')}>Confirm</button>
                    <button id="cancelButton-table1" className="cancel-button" style={{ display: 'none' }} onClick={() => cancelAdd('table1')}>Cancel</button>
                </div>
                <button className="add-button" onClick={() => addRow('table1')}>Add</button>
                <button id="confirmAddButton-table1" className="confirm-add-button" style={{ display: 'none' }} onClick={() => confirmAdd('table1')}>Confirm Add</button>
                <button id="cancelAddButton-table1" className="cancel-add-button" style={{ display: 'none' }} onClick={() => cancelAdd('table1')}>Cancel Add</button>

                <table id="table1">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>College/Department</th>
                            <th>Course/Year/Section</th>
                            <th>Time & Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Jane Smith</td>
                            <td>CEIT</td>
                            <td>BSCS 3-2</td>
                            <td>10:00am-12:00pm, January 10, 2025</td>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>CEIT</td>
                            <td>BSCS 3-2</td>
                            <td>1:00pm-3:00pm, January 10, 2025</td>
                        </tr>
                        <tr>
                            <td>Emily Johnson</td>
                            <td>CEIT</td>
                            <td>BSCS 3-2</td>
                            <td>3:00pm-5:00pm, January 10, 2025</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Additional Tables can be similarly added based on the above template */}

        </div>
    );
};

export default TryoutsTraining;
