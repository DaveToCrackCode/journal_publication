import React from "react";
import "../style/developer.css";
import Alphonse from "../img/developers/alphonse.png";
import Akash from "../img/developers/akash.jpeg";
import Govind from "../img/developers/govind.jpg";

const Developers = () => {
  return (
    <div className="developer_wrapper">
      <table>
        <tr>
          <td rowSpan={2}>
            <img src={Alphonse} alt="" />
          </td>
          <td>
            <b>Dr.PJ.A Alphonse</b>
          </td>
        </tr>
        <tr>
          <td>Professor</td>
        </tr>

        <tr>
          <td rowSpan={2}>
            <img src={Akash} alt="" />
          </td>
          <td>
            <b>Akash Dave</b>
          </td>
        </tr>
        <tr>
          <td>MCA'24 NITT</td>
        </tr>
        <tr>
          <td rowSpan={2}>
            <img src={Govind} alt="" />
          </td>
          <td>
            <b>Govind Dangi</b>
          </td>
        </tr>
        <tr>
          <td>MCA'24 NITT</td>
        </tr>
      </table>
    </div>
  );
};

export default Developers;
