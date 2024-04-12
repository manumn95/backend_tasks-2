const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//to generate the random id for the booking
const { v4: uuidv4 } = require("uuid");
const port = 4000;
app.use(bodyParser.json());

//variables to store booking and room details
const bookingDetails = [];
const roomDetails = [];

//api to create a room
app.post("/createRoom", (req, res) => {
  const {
    roomNumber,
    number_of_Seats_Available,
    amenities,
    price_for_an_hour,
  } = req.body;

  const isRoom = roomDetails.some((room) => room.roomNumber === roomNumber);

  if (isRoom) {
    return res.status(400).json({ message: "Room Already exist" });
  }
  roomDetails.push({
    roomNumber,
    number_of_Seats_Available,
    amenities,
    price_for_an_hour,
    roomId: uuidv4(),
  });
  res.send(roomDetails);
});

//Api to book a room

app.post("/roombooking", (req, res) => {
  const { roomNumber, customer_name, date, start_time, end_time } = req.body;
  const isRoom = bookingDetails.some(
    (booking) => booking.roomNumber === roomNumber && booking.date === date
  );
  if (isRoom) {
    return res.status(400).json({ message: "Room Already exist" });
  }
  bookingDetails.push({
    roomNumber,
    customer_name,
    date,
    start_time,
    end_time,
    bookingId: uuidv4(),
  });
  res.send(bookingDetails);
});

//api to list all the rooms with booke ddata

app.get("/allrooms/:roomNo", (req, res) => {
  const room_no = req.params.roomNo;
  const cusName = bookingDetails.filter(
    (booking) => booking.roomNumber === room_no
  );
  console.log(cusName);
  cusName.map((name) => {
    res.send(name);
  });
});

//get all the customer name with booked data
app.get("/allcustomer", (req, res) => {
  const customer = bookingDetails.map((data) => {
    return {
      customerName: data.customer_name,
      bookingId: data.bookingId,
      roomNo: data.roomNumber,
      date: data.date,
      startTime: data.start_time,
      endTime: data.end_time,
    };
  });
  res.send(customer);
});

//api to show the history of booking under the same person

app.get("/history/:customername", (req, res) => {
const cus_name = req.params.customername;

const history=bookingDetails.filter((history)=>history.customer_name === cus_name)
  res.send(history);
});

app.listen(port, () => {
  console.log(`Listening to the http://localhost${port}`);
});
