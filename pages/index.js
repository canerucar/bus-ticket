/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Router from 'next/router';

import Select from 'react-select';
import { ImLocation, ImLocation2 } from "react-icons/im";
import DatePicker from "react-datepicker";
import { MdDateRange } from "react-icons/md";

import Comment from '../components/Comment';

import getBusLocationss from '../utils/getBusLocations';
import getSession from '../utils/getSession';

import "react-datepicker/dist/react-datepicker.css";

const options = [];

export default function Home() {
  const [firstSelectedOption, setFirstSelectedOption] = useState(null);
  const [secondSelectedOption, setSecondSelectedOption] = useState(null);
  const [isFirstButtonActive, setFirstButtonActive] = useState(false);
  const [isSecondButtonActive, setSecondButtonActive] = useState(true);

  const [loading, setLoading] = useState(false);

  const [buslocations, setBuslocations] = useState(null);
  const [error, setError] = useState(false);

  const [startDate, setStartDate] = useState(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000));

  useEffect(() => {
    handleSession();
  }, []);

  const handleSession = async () => {
    if (!localStorage.getItem('sessionId')) {
      const getSessions = await getSession();
      console.log('getSessions', getSessions);
      localStorage.setItem('sessionId', getSessions.data.data['session-id']);
      localStorage.setItem('deviceId', getSessions.data.data['device-id']);
    }
    const sessionId = localStorage.getItem('sessionId');
    const deviceId = localStorage.getItem('deviceId');

    try {
      if (sessionId && deviceId != undefined) {
        const getBusLocations = await getBusLocationss(startDate);
        setBuslocations(getBusLocations);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (buslocations != null) {
      for (let i = 0; i < buslocations.data.data?.length; i++) {
        options.push({ id: buslocations.data.data[i].id, label: buslocations.data.data[i].name });
      }
    }
  }, [buslocations]);

  if (firstSelectedOption != null && secondSelectedOption != null) {
    localStorage.setItem('firstSelectedOptions', JSON.stringify({
      firstSelectedOption
    }));
    localStorage.setItem('secondSelectedOptions', JSON.stringify({
      secondSelectedOption
    }));
  }

  const handleJourney = async () => {
    try {
      Router.push({
        pathname: '/journey',
      }, `/journey/${firstSelectedOption.id}-${secondSelectedOption.id}/${startDate.toISOString().split('T')[0]}`);

      setLoading(true);
    } catch (e) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
    }
  }

  const firstButtonToggleClass = () => {
    setFirstButtonActive(true);
    setSecondButtonActive(false);
    setStartDate(() => new Date(Date.now()));
  };

  const secondButtonToggleClass = () => {
    setSecondButtonActive(true);
    setFirstButtonActive(false);
    setStartDate(() => new Date(Date.now() + 1 * 24 * 60 * 60 * 1000));
  };

  return (
    <div className="home-wrapper">
      <div className="content">
        <div className="content-header"></div>
        <div className="content-group">
          <div className="content-group-item">
            <div className='icon'><ImLocation /></div>
            <div className="content-group-item-wrapper">
              <div className="content-group-item-title">Nereden</div>
              <Select
                id="first-value-select"
                instanceId="first-value-select"
                defaultValue={firstSelectedOption}
                onChange={setFirstSelectedOption}
                options={options}
                placeholder={'Seçiniz'}
              />
            </div>
          </div>
          <div className="content-group-item">
            <div className='icon'><ImLocation2 /></div>
            <div className="content-group-item-wrapper">
              <div className="content-group-item-title">Nereye</div>
              <Select
                id="first-value-select"
                instanceId="first-value-select"
                defaultValue={secondSelectedOption}
                onChange={setSecondSelectedOption}
                options={options}
                placeholder={'Seçiniz'}
              />
            </div>
          </div>
          <div className="content-group-item date">
            <div className='icon'><MdDateRange /></div>
            <div className="content-group-item-wrapper">
              <div className="content-group-item-title">Tarih</div>
              <DatePicker selected={startDate} minDate={new Date(Date.now())} onChange={(date) => setStartDate(date)} />
            </div>
            <div className="content-group-item-right">
              <button className={isFirstButtonActive ? 'active' : null} onClick={firstButtonToggleClass}>Bugün</button>
              <button className={isSecondButtonActive ? 'active' : null} onClick={secondButtonToggleClass}>Yarın</button>
            </div>
          </div>
          <div className="content-group-button">
            <button onClick={() => { handleJourney() }}>
              {loading == true ? 'Yükleniyor...' : 'Bilet Bul'}
            </button>
          </div>
          {error && <div className="error">Lütfen Nereden ve Nereye bilgilerinizi giriniz.</div>}
          <Comment />
        </div>
      </div>
    </div>
  )
}
