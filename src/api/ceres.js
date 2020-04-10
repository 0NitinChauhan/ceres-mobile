import axios from "axios";
import Constants from "../utils/Constants";

export default axios.create({
  baseURL: Constants.getNgrokUrl(),
});
