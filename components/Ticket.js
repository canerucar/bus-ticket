import { BsArrowRightShort } from "react-icons/bs";

export default function Ticket({ data }) {

  return (
    <section className="ticket-wrapper">
      <div className="ticket-wrapper-top">
        <div className="departure">
          <div className="departure-title">Kalkış</div>
          <div className="departure-clock">{data.journey.departure.slice(11, 16)}</div>
        </div>
        <div className="icon"><BsArrowRightShort /></div>
        <div className="arrival">
          <div className="departure-title">VARIŞ</div>
          <div className="departure-clock">{data.journey.arrival.slice(11, 16)}</div>
        </div>
        <div className="price">
          <button>{data.journey['original-price']} {data.journey.currency}</button>
        </div>
      </div>
      <div className="ticket-wrapper-bottom">{data['origin-location']} - {data['destination-location']}</div>
    </section>
  )
}