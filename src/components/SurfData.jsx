import React, { useEffect } from "react";
import { useState } from "react";
import fetch from "isomorphic-fetch";

const apiURL = 'https://www.ndbc.noaa.gov/data/realtime2/41114.txt';
// const apiURL = `https://api.github.com/users/eunit99/repos`;
const SurfData = () => {
  const [ data, setData ] = useState('wait here for data');
  const [ year, setYear ] = useState('202')

  const buoyFormat = (rawData) => {
    return { 
      year: rawData[0],
      month: rawData[1],
      day: rawData[2],
      wvht: rawData[8],
      dpd: rawData[9],
      mwd: rawData[11],
      wtmp: rawData[14]
    }
  }
  useEffect(() => {
    fetch('/api/buoy')
      .then(res => res.json())
      .then(
        (result) => { 
          console.log('RESULT: ', result)
          setYear(result[0])
          setData(buoyFormat(result))
          console.log('DATA: ', data)}, 
        (error) => {
          console.log(error)
          setData('whoops error getting that data')
        }
      )
  }, []);

  return (
    <div id='surf-data'>
      <h3>{ data.month }/{ data.day }/{ data.year}</h3>
      <p>Wave Height: { data.wvht }</p>
      <p>Dominant Wave Period: { data.dpd }</p>
      <p>Main Wave Direction: { data.mwd }</p>
      <p>Sea Surface Temperature: { data.wtmp }</p>
    </div>
  )
}

export default SurfData;

// const NDBC_WS_API = 'http://www.ndbc.noaa.gov/data/';

// export function getNDBCEndpoint(
//   apiResourcePath: string,
//   queryParams: QueryParams = {},
// ): string {
//   return buildURL(NDBC_WS_API, apiResourcePath, queryParams);
// }

// const endpoint = getNDBCEndpoint(`realtime2/${options.buoyID}.txt`);