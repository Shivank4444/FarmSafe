import React, { useEffect, useState } from 'react';

const Allnote = () => {
  const [notes, setNotes] = useState([]); // State for storing fetched listings

  // Function to fetch all listings
  const fetchAllListings = async () => {
    try {
      const response = await fetch('https://agri-server-vfai.onrender.com/api/notes/fetchalllistings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  // Fetch notes on component mount
  useEffect(() => {
    fetchAllListings();
  }, []);

  // Function to send SMS using the Twilio backend
  const sendMessage = async (phone) => {
    try {
      const response = await fetch('https://agri-server-vfai.onrender.com/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });
      if (response.ok) {
        alert(`Message sent to ${phone}`);
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message');
    }
  };

  return (
    <div className="note-container">
      <h1>All Listings</h1>
      <table className="note-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Crop</th>
            <th>Phone</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Action</th> {/* New column for the Send Message button */}
          </tr>
        </thead>
        <tbody>
          {notes.length > 0 ? (
            notes.map((note) => (
              <tr key={note.id}>
                <td>{note.name}</td>
                <td>{note.crop}</td>
                <td>{note.Phone}</td>
                <td>{note.Qty}</td>
                <td>{note.Price}</td>
                <td>
                  <button onClick={() => sendMessage("+917668193033")}>Interested</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No notes available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Inline CSS styling */}
      <style jsx="true">{`
        .note-container {
          margin: 20px;
        }

        h1 {
          text-align: center;
          font-size: 2.5em;
          margin-bottom: 20px;
          color: white;
        }

        .note-table {
          justify-content: center;
          width: 100%;
          border-collapse: collapse;
          // margin: 25px 0;
          font-size: 1.2em;
          min-width: 800px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        }

        .note-table thead tr {
          background-color: #0000;
          color: #ffffff;
          text-align: left;
        }

        .note-table th,
        .note-table td {
        color:"black";
          padding: 12px 15px;
          border-bottom: 1px solid #dddddd;
        }

        .note-table tbody tr {
          border-bottom: 1px solid #dddddd;
        }

        .note-table tbody tr:nth-of-type(even) {
        }

        .note-table tbody tr:last-of-type {
          border-bottom: 2px solid #009879;
        }

        .note-table tbody tr:hover {
          background-color: #0000;
          cursor: pointer;
        }

        .note-table td {
          text-align: center;
        }

        button {
          background-color: #009879;
          color: white;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
        }

        button:hover {
          background-color: #007a63;
        }
      `}</style>
    </div>
  );
};

export default Allnote;
