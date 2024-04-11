const express = require("express");

const app = express();
const fs = require("fs");
const path = require("path");

const directoryPath = "./myDirectory";
// Check if the directory exists
if (!fs.existsSync(directoryPath)) {
  // If it doesn't exist, create the directory
  fs.mkdirSync(directoryPath);

  console.log(`Directory '${directoryPath}' created.`);
} else {
  console.log(`Directory '${directoryPath}' already exists.`);
}


//Api for creating the file
app.post("/createfile", (req, res) => {
  //getting current date and time
  const currentTime = new Date();
  const year = currentTime.getFullYear().toString();
  const month = (currentTime.getMonth() + 1).toString().padStart(2, "0");
  const date = currentTime.getDate().toString().padStart(2, "0");
  const hrs = currentTime.getHours().toString().padStart(2, "0");
  const mins = currentTime.getMinutes().toString().padStart(2, "0");
  const secs = currentTime.getSeconds().toString().padStart(2, "0");

  //coverting the date and time
  const dateTimeForFileName = `${year}-${month}-${date}-${hrs}-${mins}-${secs}.txt`;

  let filepath = path.join(directoryPath, dateTimeForFileName);
  fs.writeFile(filepath, currentTime.toISOString(), { flag: "w+" }, (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send("success");
});

app.get("/getfile", (req, res) => {
  fs.readFile('./myDirectory/2024-04-11-20-48-54.txt', "utf-8", (err, data) => {
    if(err)
    {
      console.log(err)
    }
    res.send(data);
  });
});

app.listen(4000, () => {
  console.log("connected to the server");
});
