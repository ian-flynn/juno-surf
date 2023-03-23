import React, { useEffect } from 'react';
import { useState } from 'react';
import fetch from 'isomorphic-fetch';
import arrow from '../images/arrow.png';
import button1 from '../images/button1.png';
import button2 from '../images/button2.png';

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
      <div id='wave-data'>
        <div className='row'>
          <div className='stat'>
            <span className='stat-label'>Wave Height</span>
            <div className='blob' onClick={() => console.log('clicked')}>
              <img src={button1} />
              <div className='centered'>{Math.round(wvht * 3.28084)}ft</div>
            </div>
          </div>
          <div className='stat'>
            <span className='stat-label'>Swell</span>
            <div className='blob'>
              <img src={button2} />
              <div className='centered'>{Math.round(dpd)}s</div>
            </div>
          </div>
          <div className='stat'>
            <span className='stat-label'>Wave Period</span>
            <div className='blob'>
              <img src={button1} />
              <div className='centered'>{Math.round(apd)}s</div>
            </div>
          </div>
        </div>

        <button className='stat-box'>
          Wave Origin: {Math.round(mwd)} degrees from north
        </button>
        <button className='stat-box'>
          Water Temp: {Math.round((wtmp * 9) / 5 + 32)} &deg;F
        </button>
        <button className='cardinal-arrow'>
          <img src={arrow} style={{ transform: `rotate( ${-90 + mwd}deg )` }} />
        </button>
      </div>
      <div id='wind-data'>
        <div className='row'>
          <div className='stat'>
            <span className='stat-label'>Wind Speed</span>
            <div className='blob'>
              <img src={button2} />
              <div className='centered'>{Math.round(wspd * 2.237)}</div>
            </div>
          </div>
          <div className='stat'>
            <span className='stat-label'>Gust Speed</span>
            <div className='blob'>
              <img src={button1} />
              <div className='centered'>{Math.round(gst * 2.237)}</div>
            </div>
          </div>
          <div className='stat'>
            <span className='stat-label'>Air Temp</span>
            <div className='blob'>
              <img src={button2} />
              <div className='centered'>
                {Math.round((atmp * 9) / 5 + 32)}&deg;F
              </div>
            </div>
          </div>
        </div>
        <div className='stat'>
          <span className='stat-label'></span>
          <div className='blob'>
            <img src={button2} />
            <div className='centered'>
              <img
                src={arrow}
                style={{ transform: `rotate( ${-90 + wdir}deg )` }}
              />
            </div>
          </div>
        </div>
        <button className='stat-box'>
          Wind Origin: {wdir} degrees from north
        </button>
      </div>
      <h5>Last Update: {date}</h5>
    </div>
  );
};

export default SurfData;
