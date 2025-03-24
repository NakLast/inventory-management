const axios = require("axios");

const GOOGLE_SCRIPT_PATH = "https://script.google.com/macros/s/";
const google_script_URL = `${GOOGLE_SCRIPT_PATH}${process.env.GOOGLE_DEPLOYMENT_ID}/`;

exports.getUser = async () => {
  const response = await axios.get(`${google_script_URL}exec?action=readData`);
  return response.data;
};
exports.addUser = async (username, password) => {
  const response = await axios.post(
    `${google_script_URL}exec?action=addUser`,
    username,
    password
  );
  return response.data;
};

exports.addInventory = async (productData) => {
  const response = await axios.post(
    `${google_script_URL}exec?action=addInventory`,
    productData
  );
  return response.data;
};

exports.getInventory = async () => {
  const response = await axios.get(
    `${google_script_URL}exec?action=readInventory`
  );
  return response.data;
};
exports.getInventoryById = async (id) => {
  const response = await axios.get(
    `${google_script_URL}exec?action=readRecordInventory&id=${id}`
  );
  return response.data;
};
exports.updateRecordInvetory = async (updateRecordInventory) => {
  const response = await axios.post(
    `${google_script_URL}exec?action=updateRecordInventory`,
    updateRecordInventory
  );
  return response.data;
};
exports.deleteRecordInventory = async (id) => {
  const response = await axios.post(
    `${google_script_URL}exec?action=deleteInventory`,
    id
  );
  return response.data;
};

exports.getEmployee = async () => {
  const response = await axios.get(
    `${google_script_URL}exec?action=readEmployee`
  );
  return response.data;
};
exports.addEmployee = async (employeeData) => {
  const response = await axios.post(
    `${google_script_URL}exec?action=addEmployee`,
    employeeData
  );
  return response.data;
};

exports.getRecordWorkTime = async () => {
  const response = await axios.get(
    `${google_script_URL}exec?action=readRecordWorkTime`
  );
  return response.data;
};
exports.addRecordWorkTime = async (recordWorkTimeData) => {
  const response = await axios.post(
    `${google_script_URL}exec?action=addRecordWorkTime`,
    recordWorkTimeData
  );
  return response.data;
};
exports.getRecordWorkTimeById = async (id) => {
  const response = await axios.get(
    `${google_script_URL}exec?action=readRecordWorkTime&id=${id}`
  );
  return response.data;
};
exports.updateRecordWorkTime = async (updateRecordWorkTime) => {
  const response = await axios.post(
    `${google_script_URL}exec?action=updateRecordWorkTime`,
    updateRecordWorkTime
  );
  return response.data;
};
