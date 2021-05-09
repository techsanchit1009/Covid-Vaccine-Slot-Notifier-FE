import React from 'react';
import Modal from './Modal/Modal';
import TelegramJoin from '../images/join-logo.jpg';

const InfoModal = (props) => {
  const {heading, size, closeModalHandler, show} = props;
  return (
    <Modal heading={heading} size={size} show={show} closeModalHandler={closeModalHandler}>
      <ul className="info--modal">
        <li>This service allows user to get notified once there is vaccination slot available in their locality.</li>
        <li>All you have to do is fill in your Pincode in the form and choose the age group you want to know the availability for.</li>
        <li>Once your enquiry is submitted, we will notify you on the telegram channel which you can join at <a href="https://t.me/cowinnotifier" target="_blank" rel="noreferrer">https://t.me/cowinnotifier</a></li>
      </ul>
      <div>
      <a href="https://t.me/cowinnotifier" target="_blank" rel="noreferrer">
        <img className="telegram-join" src={TelegramJoin} alt="Telegram-Join"/>
      </a>
      </div>
    </Modal>
  );
}

export default InfoModal