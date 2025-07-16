// ✅ Base API URL
const API_BASE = "http://127.0.0.1:8000";

// ✅ Retrieve token from localStorage
let token = localStorage.getItem("token");

// ✅ Redirect if not logged in on /book page
if (window.location.pathname === "/book" && !token) {
  alert("⚠️ Please login first.");
  window.location.href = "/";
}

// ✅ Login Function
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const response = await fetch(`${API_BASE}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData,
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("token", data.access_token);
    window.location.href = "/book";
  } else {
    alert(data.detail || "Login failed");
  }
}

// ✅ Register Function (no email)
async function register(event) {
  event.preventDefault(); // prevent form reload

  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  const response = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (response.ok) {
    alert("✅ Registration successful! Redirecting to login...");
    window.location.href = "/";
  } else {
    alert(data.detail || "Registration failed");
  }
}

// ✅ Logout
function logout() {
  localStorage.removeItem("token");
  alert("👋 Logged out!");
  window.location.href = "/";
}

// ✅ Create Booking
async function createBooking() {
  const booking = {
    room_id: parseInt(document.getElementById("room_id").value),
    booked_by: document.getElementById("booked_by").value,
    start_time: document.getElementById("start_time").value,
    end_time: document.getElementById("end_time").value,
  };

  const res = await fetch(`${API_BASE}/bookings/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
  });

  const data = await res.json();

  if (res.ok) {
    alert("✅ Booking created!");
    location.reload();
  } else {
    alert(data.detail || "Booking failed");
  }
}

// ✅ Load All Bookings
async function loadBookings() {
  const res = await fetch(`${API_BASE}/bookings/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    const bookings = await res.json();
    const list = document.getElementById("booking-list");
    list.innerHTML = "";
    bookings.forEach((b) => {
      const li = document.createElement("li");
      li.innerHTML = `
        📌 Room ${b.room_id} booked by <strong>${b.booked_by}</strong><br>
        🕐 ${b.start_time} → ${b.end_time}
        <br>
        <button onclick="editBooking(${b.id})">Edit</button>
        <button onclick="deleteBooking(${b.id})">Delete</button>
      `;
      list.appendChild(li);
    });
  } else {
    alert("⚠️ Failed to load bookings.");
  }
}

// ✅ Delete Booking
async function deleteBooking(id) {
  const res = await fetch(`${API_BASE}/bookings/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    alert("🗑️ Booking deleted");
    location.reload();
  } else {
    alert("❌ Deletion failed");
  }
}

// ✅ Edit Booking
function editBooking(id) {
  const roomId = prompt("New Room ID:");
  const bookedBy = prompt("New Booked By:");
  const startTime = prompt("New Start Time (YYYY-MM-DDTHH:MM):");
  const endTime = prompt("New End Time (YYYY-MM-DDTHH:MM):");

  const updated = {
    room_id: parseInt(roomId),
    booked_by: bookedBy,
    start_time: startTime,
    end_time: endTime,
  };

  fetch(`${API_BASE}/bookings/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updated),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.id) {
        alert("✏️ Booking updated!");
        location.reload();
      } else {
        alert(data.detail || "Update failed");
      }
    })
    .catch(() => {
      alert("Update failed");
    });
}

// ✅ Load bookings on /book page
if (window.location.pathname === "/book") {
  window.onload = loadBookings;
}





