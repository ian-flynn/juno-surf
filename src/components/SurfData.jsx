import React, { useEffect } from 'react';
import { useState } from 'react';
import fetch from 'isomorphic-fetch';
import arrow from '../images/arrow.png';
import button1 from '../images/button1.png';
import button2 from '../images/button2.png';
import compass from '../images/compass.png';
import DataBlob from './DataBlob.jsx';

const SurfData = () => {
  // ++ OCEAN DATA ++
  const [rawData, setRawData] = useState(null);
  const [latest, setLatest] = useState(null);
  const [date, setDate] = useState('0/0/0');
  const [wvht, setWvht] = useState(0);
  const [dpd, setDpd] = useState(0);
  const [apd, setApd] = useState(0);
  const [mwd, setMwd] = useState(0);
  const [wtmp, setWtmp] = useState(0);
  // ++ AIR DATA ++
  const [wdir, setWdir] = useState(0);
  const [wspd, setWspd] = useState(0);
  const [gst, setGst] = useState(0);
  const [atmp, setAtmp] = useState(0);

  useEffect(() => {
    try {
      fetch('/api/buoy')
        .then((res) => res.json())
        .then(
          (result) => {
            let ocean = result.ocean[2].split(' ').filter((el) => el !== '');
            setRawData(result.ocean);
            setLatest(result.ocean[2]);
            setDate(
              `${ocean[1]}/${ocean[2]}/${ocean[0].slice(2)} ${
                ocean[3] < 12
                  ? ocean[3] - 3 + 'AM'
                  : ocean[3] === 12
                  ? ocean[3] - 3 + 'PM'
                  : ocean[3] - 15 + 'PM'
              }`
            );
            setWvht(ocean[8]);
            setDpd(ocean[9]);
            setApd(ocean[10]);
            setMwd(ocean[11]);
            setWtmp(ocean[14]);

            let pier = result.pier[2].split(' ').filter((el) => el !== '');
            setWdir(pier[5]);
            setWspd(pier[6]);
            setGst(pier[7]);
            setAtmp(pier[13]);
          },
          (error) => {
            console.log(error);
            setRawData('whoops error getting that data');
          }
        );
    } catch (err) {
      console.log('error getting buoy data: ', err);
    }
  }, []);

  return (
    <div id='surf-data'>
      {/* WAVE DATA SECTION */}
      <div id='wave-data'>
        <div className='row'>
          <DataBlob
            label={'Wave Height'}
            stat={Math.round(wvht * 3.28084) + 'ft'}
            button={button1}
          />
          <DataBlob
            label={'Swell'}
            stat={Math.round(dpd) + 's'}
            button={button2}
          />
          <DataBlob
            label={'Wave Period'}
            stat={Math.round(apd) + 's'}
            button={button1}
          />
        </div>
        <div className='row'>
          <DataBlob
            label={'Water Temp'}
            stat={Math.round((wtmp * 9) / 5 + 32) + '\u00b0'}
            button={button1}
          />
          <DataBlob
            label={''}
            stat={
              <img
                src={arrow}
                style={{ transform: `rotate( ${-90 + mwd}deg )` }}
              />
            }
            button={compass}
          />
        </div>
      </div>

      {/* WIND DATA SECTION  */}
      <div id='wind-data'>
        <div className='row'>
          <DataBlob
            label={'Wind Speed'}
            stat={Math.round(wspd * 2.237)}
            button={button2}
          />
          <DataBlob
            label={'Gust Speed'}
            stat={Math.round(gst * 2.237)}
            button={button1}
          />
          <DataBlob
            label={'Air Temp'}
            stat={Math.round((atmp * 9) / 5 + 32) + '\u00b0'}
            button={button2}
          />
        </div>
        <DataBlob
          label={''}
          stat={
            <img
              src={arrow}
              style={{ transform: `rotate( ${-90 + wdir}deg )` }}
            />
          }
          button={compass}
        />
      </div>
      <h5>Last Update: {date}</h5>
    </div>
  );
};

export default SurfData;
