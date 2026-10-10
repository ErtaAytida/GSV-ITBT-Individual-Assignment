document.addEventListener("DOMContentLoaded", function () {

  // Shipment tracking data
  const shipments = {
  SBC1025: {
    origin: "Delhi",
    destination: "Mumbai",
    status: "In Transit",
    location: "Mumbai Air Cargo Terminal",
    eta: "Today, 8:30 PM"
  },

  SBC2048: {
    origin: "Hyderabad",
    destination: "Bengaluru",
    status: "Delivered",
    location: "Bengaluru",
    eta: "Delivered"
  },

  SBC3012: {
    origin: "Delhi",
    destination: "Chennai",
    status: "Delayed",
    location: "Delhi Cargo Terminal",
    eta: "Tomorrow, 11:00 AM"
  },

  SBC4176: {
    origin: "Bengaluru",
    destination: "Pune",
    status: "Out for Delivery",
    location: "Pune Distribution Hub",
    eta: "Today, 6:00 PM"
  },

  SBC5289: {
    origin: "Hyderabad",
    destination: "Mumbai",
    status: "Cancelled",
    location: "Hyderabad Cargo Terminal",
    eta: "Shipment Cancelled"
  }
};


  // ==========================
  // QUICK TRACKING
  // ==========================

  const quickTrackForm = document.getElementById("quickTrackForm");

  if (quickTrackForm) {

    quickTrackForm.addEventListener("submit", function (event) {

      event.preventDefault();

      const input = document.getElementById("quickAwb");
      const result = document.getElementById("quickResult");

      const id = input.value.trim().toUpperCase();

      if (shipments[id]) {

        const shipment = shipments[id];

        result.innerHTML =
          "<strong>" + id + "</strong> · " +
          shipment.status +
          " · " +
          shipment.location +
          "<br><small>ETA: " +
          shipment.eta +
          "</small>";

      } else {

        result.textContent =
          "Shipment not found. Try SBC1025.";

      }

    });

  }


  // ==========================
  // MAIN SHIPMENT TRACKING
  // ==========================

  const trackingForm = document.getElementById("trackingForm");

  if (trackingForm) {

    trackingForm.addEventListener("submit", function (event) {

      event.preventDefault();

      const input = document.getElementById("awb");
      const result = document.getElementById("trackingResult");

      const id = input.value.trim().toUpperCase();

      if (!shipments[id]) {

        result.innerHTML =
          '<div class="result-empty">' +
          "Shipment " +
          id +
          " was not found. Try SBC1025, SBC2048, SBC3012, SBC4176 or SBC5289." +
          "</div>";

        return;
      }

      const shipment = shipments[id];

      result.innerHTML =

        '<div class="result-grid">' +

        '<div class="result-item">' +
        "<span>Shipment ID</span>" +
        "<strong>" + id + "</strong>" +
        "</div>" +

        '<div class="result-item">' +
        "<span>Status</span>" +
        '<strong class="status">' +
        shipment.status +
        "</strong>" +
        "</div>" +

        '<div class="result-item">' +
        "<span>Origin → Destination</span>" +
        "<strong>" +
        shipment.origin +
        " → " +
        shipment.destination +
        "</strong>" +
        "</div>" +

        '<div class="result-item">' +
        "<span>Current Location</span>" +
        "<strong>" +
        shipment.location +
        "</strong>" +
        "</div>" +

        "</div>" +

        '<div class="tracking-progress">' +

        '<div class="progress-label">' +
        "<span>Shipment progress</span>" +
        "<strong>" +
        shipment.progress +
        "%</strong>" +
        "</div>" +

        '<div class="progress-track">' +
        '<span style="width:' +
        shipment.progress +
        '%"></span>' +
        "</div>" +

        "<small>Expected delivery: " +
        shipment.eta +
        "</small>" +

        "</div>";

    });

  }


  // ==========================
  // DEMO SHIPMENT BUTTONS
  // ==========================

  const demoButtons =
    document.querySelectorAll(".demo-ids button");

  demoButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const id = button.dataset.id;

      const input =
        document.getElementById("awb");

      const result =
        document.getElementById("trackingResult");

      if (input && result) {

        input.value = id;

        const shipment = shipments[id];

        result.innerHTML =

          '<div class="result-grid">' +

          '<div class="result-item">' +
          "<span>Shipment ID</span>" +
          "<strong>" +
          id +
          "</strong>" +
          "</div>" +

          '<div class="result-item">' +
          "<span>Status</span>" +
          '<strong class="status">' +
          shipment.status +
          "</strong>" +
          "</div>" +

          '<div class="result-item">' +
          "<span>Origin → Destination</span>" +
          "<strong>" +
          shipment.origin +
          " → " +
          shipment.destination +
          "</strong>" +
          "</div>" +

          '<div class="result-item">' +
          "<span>Current Location</span>" +
          "<strong>" +
          shipment.location +
          "</strong>" +
          "</div>" +

          "</div>";

        document
          .getElementById("tracking")
          .scrollIntoView({
            behavior: "smooth"
          });

      }

    });

  });


  // ==========================
  // FREIGHT ESTIMATE CALCULATOR
  // ==========================

  const quoteForm =
    document.getElementById("quoteForm");

  if (quoteForm) {

    quoteForm.addEventListener("submit", function (event) {

      event.preventDefault();

      const origin =
        document.getElementById("origin").value;

      const destination =
        document.getElementById("destination").value;

      const weight =
        Number(
          document.getElementById("weight").value
        );

      const service =
        document.getElementById("priority").value;

      const result =
        document.getElementById("quoteResult");


      if (!origin || !destination || weight <= 0) {

        result.textContent =
          "Please complete all fields.";

        return;

      }


      if (origin === destination) {

        result.textContent =
          "Please select different origin and destination airports.";

        return;

      }


      const rate =
        service === "express"
          ? 220
          : 150;

      const minimum =
        service === "express"
          ? 900
          : 650;

      const estimate =
        Math.max(
          weight * rate,
          minimum
        );


      result.innerHTML =
        "Estimated starting charge: " +
        "<strong>₹" +
        estimate.toLocaleString("en-IN") +
        "</strong>" +
        "<br>" +
        "<small>" +
        (service === "express"
          ? "Express Cargo"
          : "Standard Air Freight") +
        " · " +
        weight +
        " kg · " +
        origin +
        " → " +
        destination +
        "</small>" +
        "<br>" +
        "<small>This is a classroom estimate, not a commercial quotation.</small>";

    });

  }


  // ==========================
  // ENQUIRY FORM
  // ==========================

  const enquiryForm =
    document.getElementById("enquiryForm");

  if (enquiryForm) {

    enquiryForm.addEventListener("submit", function (event) {

      event.preventDefault();

      const name =
        document
          .getElementById("customerName")
          .value
          .trim();

      const message =
        document.getElementById("enquiryMessage");

      message.textContent =
        "Thank you, " +
        name +
        ". Your cargo enquiry has been received. Our team will contact you shortly.";

      enquiryForm.reset();

    });

  }

});