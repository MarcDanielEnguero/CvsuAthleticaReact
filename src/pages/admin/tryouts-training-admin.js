import React, { useState } from 'react';
import './style.css';  // Existing styles
import './tryouts-training.css'; // New page styles
import './tryouts-training-admin.css'; // Admin page styles
import './font-awesome.min.css'; // For Font Awesome icons

const TryoutsTraining = () => {
  const [isEditModeTable1, setIsEditModeTable1] = useState(false);
  const [isEditModeTable2, setIsEditModeTable2] = useState(false);
  const [originalDataTable1, setOriginalDataTable1] = useState([]);
  const [originalDataTable2, setOriginalDataTable2] = useState([]);

  const editTryout = () => {
    const table = document.querySelector('#table1');
    const rows = table.querySelectorAll('tbody tr');

    if (!isEditModeTable1) {
      const originalData = Array.from(rows).map((row) => ({
        name: row.children[0].innerText,
        college: row.children[1].innerText,
        course: row.children[2].innerText,
        timeDate: row.children[3].innerText,
        status: row.children[4].innerText,
      }));
      setOriginalDataTable1(originalData);

      rows.forEach((row) => {
        const actionCell = document.createElement('td');
        actionCell.classList.add('action-cell');

        const cancelButton = document.createElement('button');
        cancelButton.innerText = 'X';
        cancelButton.classList.add('cancel-booking-btn');

        const confirmButton = document.createElement('button');
        confirmButton.innerText = '✔';
        confirmButton.classList.add('confirm-booking-btn');

        actionCell.appendChild(cancelButton);
        actionCell.appendChild(confirmButton);
        row.appendChild(actionCell);

        cancelButton.addEventListener('click', () => {
          const statusCell = row.children[4];
          statusCell.innerText = 'Canceled';
        });

        confirmButton.addEventListener('click', () => {
          const statusCell = row.children[4];
          statusCell.innerText = 'Confirmed';
        });
      });

      setIsEditModeTable1(true);
    }
  };

  const editTryout1 = () => {
    const table = document.querySelector('#table2');
    const rows = table.querySelectorAll('tbody tr');

    if (!isEditModeTable2) {
      const originalData = Array.from(rows).map((row) => ({
        name: row.children[0].innerText,
        college: row.children[1].innerText,
        course: row.children[2].innerText,
        timeDate: row.children[3].innerText,
        status: row.children[4].innerText,
      }));
      setOriginalDataTable2(originalData);

      rows.forEach((row) => {
        const actionCell = document.createElement('td');
        actionCell.classList.add('action-cell');

        const cancelButton = document.createElement('button');
        cancelButton.innerText = 'X';
        cancelButton.classList.add('cancel-booking-btn');

        const confirmButton = document.createElement('button');
        confirmButton.innerText = '✔';
        confirmButton.classList.add('confirm-booking-btn');

        actionCell.appendChild(cancelButton);
        actionCell.appendChild(confirmButton);
        row.appendChild(actionCell);

        cancelButton.addEventListener('click', () => {
          const statusCell = row.children[4];
          statusCell.innerText = 'Canceled';
        });

        confirmButton.addEventListener('click', () => {
          const statusCell = row.children[4];
          statusCell.innerText = 'Confirmed';
        });
      });

      setIsEditModeTable2(true);
    }
  };

  const confirmChanges = (tableId, isEditMode, originalData, confirmBtn, cancelBtn) => {
    const rows = document.querySelectorAll(`${tableId} tbody tr`);
    rows.forEach((row) => {
      const actionCell = row.querySelector('.action-cell');
      if (actionCell) actionCell.remove();
    });

    confirmBtn.style.display = 'none';
    cancelBtn.style.display = 'none';

    if (tableId === '#table1') {
      setIsEditModeTable1(false);
    } else if (tableId === '#table2') {
      setIsEditModeTable2(false);
    }
  };

  const cancelChanges = (tableId, originalData, cancelBtn, confirmBtn) => {
    const rows = document.querySelectorAll(`${tableId} tbody tr`);
    rows.forEach((row, index) => {
      row.children[0].innerText = originalData[index].name;
      row.children[1].innerText = originalData[index].college;
      row.children[2].innerText = originalData[index].course;
      row.children[3].innerText = originalData[index].timeDate;
      row.children[4].innerText = originalData[index].status;

      const actionCell = row.querySelector('.action-cell');
      if (actionCell) actionCell.remove();
    });

    confirmBtn.style.display = 'none';
    cancelBtn.style.display = 'none';

    if (tableId === '#table1') {
      setIsEditModeTable1(false);
    } else if (tableId === '#table2') {
      setIsEditModeTable2(false);
    }
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

      {/* Main Content */}
      <section className="main-contents">
        <h1>TRYOUTS/TRAINING</h1>
        <h2>TRYOUTS & TRANING SCHEDULE</h2>
      </section>

      {/* Table 1 - Javelin Try-outs */}
      <section className="tryouts-container">
        <div className="header-with-button">
          <h2>Javelin Try-outs</h2>
          <p>Coach: John Doe</p>
        </div>
        <button className="edit-button" onClick={editTryout}>Edit</button>
        <button
          className="confirm-changes-btn"
          id="confirmChangesBtn1"
          onClick={() => confirmChanges('#table1', isEditModeTable1, originalDataTable1, document.querySelector('#confirmChangesBtn1'), document.querySelector('#cancelChangesBtn1'))}
          style={{ display: isEditModeTable1 ? 'inline-block' : 'none' }}
        >
          Confirm Changes
        </button>
        <button
          className="cancel-changes-btn"
          id="cancelChangesBtn1"
          onClick={() => cancelChanges('#table1', originalDataTable1, document.querySelector('#cancelChangesBtn1'), document.querySelector('#confirmChangesBtn1'))}
          style={{ display: isEditModeTable1 ? 'inline-block' : 'none' }}
        >
          Cancel Changes
        </button>

        <table id="table1">
          <thead>
            <tr>
              <th>Name</th>
              <th>College/Department</th>
              <th>Course/Year/Section</th>
              <th>Time & Date</th>
              <th>Status</th>
              <th>Cancel Booking</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jane Smith</td>
              <td>CEIT</td>
              <td>BSCS 3-2</td>
              <td>10:00am-12:00pm, January 10, 2025</td>
              <td>Confirmed</td>
            </tr>
            <tr>
              <td>John Doe</td>
              <td>Business</td>
              <td>BSBA 2-1</td>
              <td>1:00pm-3:00pm, January 12, 2025</td>
              <td>Pending</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default TryoutsTraining;
