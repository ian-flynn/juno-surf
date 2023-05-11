import React, { useEffect } from 'react';
import { useState } from 'react';
import fetch from 'isomorphic-fetch';
import arrow from '../images/arrow.png';
import button1 from '../images/button1.png';
import button2 from '../images/button2.png';
import compass from '../images/compass.png';
import DataBlob from './DataBlob.jsx';
import InfoBox from './InfoBox.jsx';
const info = {
  'Wave Height':
    '3-9ft means a great day to go surfing. Under 3ft, great for beginners. Over 6, beginner beware',
  Swell:
    'Dominate Swell is measured in a 20 second period. It measures the period of the dominant swell. The longer the time, the more momentum on the big swell and less interference from competing swells. 8 is okay, over 12 is great. The higher the better',
  'Wave Period':
    'The average time between swells. The more spread out, the more momentum being built and the cleaner the waves. 10-12 - good to great, 13+ incredible',
  'Wind Speed':
    'This is the average wind recorded over a 20 second period. Kite size should be sized according to the gust, especially as a beginner. Assuming 170lbs Rider at beginner riding level, 10-18mph => 16m Kite, 15-25mph => 12m Kite, 22-30mph => 9m Kite. Speeds above 30mph are safe for advanced riders',
  'Gust Speed':
    'This is the top wind speed recorded over a 20 second sample period. Size kites according to the gust speed not the average speed.',
};
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

  const [infoDisplay, setInfoDisplay] = useState('none');
  const [infoPara, setInfoPara] = useState('loading...');
  const [infoTitle, setInfoTitle] = useState('Stat...');
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
            // setRawData(result.ocean);
            // setLatest(result.ocean[2]);
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

  const handleClick = (label) => {
    setInfoTitle(label);
    setInfoDisplay('flex');
    setInfoPara(info[label]);
  };
  const infoClick = () => {
    setInfoDisplay('none');
  };
  return (
    <div id='surf-data'>
      <InfoBox
        display={infoDisplay}
        title={infoTitle}
        info={infoPara}
        handleClick={infoClick}
      />
      {/* WAVE DATA SECTION */}
      <div id='wave-data'>
        <div className='row'>
          <DataBlob
            label={'Wave Height'}
            stat={Math.round(wvht * 3.28084) + 'ft'}
            button={button1}
            handleClick={handleClick}
          />
          <DataBlob
            label={'Swell'}
            stat={Math.round(dpd) + 's'}
            button={button2}
            handleClick={handleClick}
          />
          <DataBlob
            label={'Wave Period'}
            stat={Math.round(apd) + 's'}
            button={button1}
            handleClick={handleClick}
          />
        </div>
        <div className='row'>
          <DataBlob
            label={'Water Temp'}
            stat={Math.round((wtmp * 9) / 5 + 32) + '\u00b0'}
            button={button1}
            handleClick={handleClick}
          />
          <DataBlob
            label={'Direction'}
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
            handleClick={handleClick}
          />
          <DataBlob
            label={'Gust Speed'}
            stat={Math.round(gst * 2.237)}
            button={button1}
            handleClick={handleClick}
          />
        </div>
        <div className='row'>
          <DataBlob
            label={'Air Temp'}
            stat={Math.round((atmp * 9) / 5 + 32) + '\u00b0'}
            button={button2}
            handleClick={handleClick}
          />
          <DataBlob
            label={'Wind Direction'}
            stat={
              <img
                src={arrow}
                style={{ transform: `rotate( ${-90 + wdir}deg )` }}
              />
            }
            button={compass}
          />
        </div>
      </div>
      <h5>Last Update: {date}</h5>
    </div>
  );
};

export default SurfData;
