import { useRouter } from 'next/router';
import Image from 'next/image'
import { useState, useEffect } from "react";

import { IoArrowBackOutline } from "react-icons/io5";
import { format } from 'date-fns';

import Ticket from "../../components/Ticket";
import getJourneyss from '../../utils/getJourneys';
import LoadingGIF from "../../public/loading.gif";

export default function Journey() {
  const [journeys, setJourneys] = useState();
  const router = useRouter()

  async function getJourneys() {
    const params = window.location.pathname.replace('/journey/', '').split('/');
    const locations = params[0].split('-');

    const getJourney = await getJourneyss(locations[0], locations[1], params[1]);

    setJourneys(getJourney);
  }

  useEffect(() => {
    getJourneys();
  }, []);

  return (
    <div className="journey-wrapper">
      <div className="content">
        <div className="content-header">
          <div className="content-header-back">
            <button onClick={() => (router.push('/'), null, { shallow: true })}>
              <IoArrowBackOutline />
            </button>
          </div>
          <div className="content-header-title">
            {journeys == undefined ? '' : journeys?.data?.data?.length > 0 ? <><div className="top">{journeys.data.data[0]['origin-location']} - {journeys.data.data[0]['destination-location']}</div>
              <div className="bottom">{format(new Date(journeys.data.data[0].journey.departure), "d MMMM yyyy")}</div></> : 'Maalesef sefer bulamadık :('}
          </div>
        </div>
        <div className="content-item">
          {journeys == undefined ? <div className='loading'><Image src={LoadingGIF} alt="Loading gif" /></div>
            : journeys?.data?.data?.length > 0 ? journeys.data.data.map((item, index) => <Ticket key={index} data={item} />) : <div className="content-item-empty">Bu sefere ait bilet bulunmamaktadır.</div>}
        </div>
      </div>
    </div>
  )
}
