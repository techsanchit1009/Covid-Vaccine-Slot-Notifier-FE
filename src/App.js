import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import InfoModal from './Components/InfoModal';
import VaccineLogo from './images/vaccine-logo.png';
import TelegramJoin from './images/join-logo.jpg';

const ageGroupOptions = [
  {
    value: '18',
    label: '18 - 44',
  },
  {
    value: '45',
    label: 'Above 45',
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
function App() {
  const classes = useStyles();
  const [pincode, setPincode] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);

  const pincodeChangeHandler = (e) => {
    setPincode(e.target.value);
  }

  const ageGroupChangeHandler = (e) => {
    setAgeGroup(e.target.value);
  }

  const submitDetails = (e) => {
    e.preventDefault();
    if (pincode.length && pincode.length <= 6) {
      axios.post('http://65.2.79.198/add-pincode', {
        pincode,
      })
      .then(resp => {
        if (resp.data && resp.data.pincodes) {
          toast.dark('✅ Join us at Telegram to get notified for slots!');
        }
        setPincode('');
        setAgeGroup('');
      });
    } 
  }

  const closeInfoModal = () => {
    setShowInfoModal(false);
  };

  return (
    <div className="App">
      <ToastContainer 
        position='bottom-center'
        autoClose={8000}
        closeOnClick
        pauseOnHover
        transition={Slide}
      />
      <div className="header">
        <img className="vaccine-logo" src={VaccineLogo} alt="Vaccine-Logo"/> <h1>Vaccine Slot Notifier</h1>
      </div>
      <h3 style={{ textAlign: "center" }}>
        Please enter valid Pincode to start receiving slot availability
        notification
      </h3>
      <p className="help-link" onClick={() => setShowInfoModal(true)}>How does it work?</p>
      <InfoModal heading="How does it work❓" size='large' show={showInfoModal} closeModalHandler={closeInfoModal}/>
      <form autoComplete="off" className={classes.root} onSubmit={(e) => submitDetails(e)}>
        <TextField
          label="Pincode"
          type="number"
          variant="outlined"
          value={pincode}
          onChange={pincodeChangeHandler}
          error={pincode.length > 6 ? true : false}
          helperText={pincode.length > 6 ? 'Pincode length exceeded' : ''}
          inputProps={{ maxLength: 6 }}
          required
        />
        <TextField
          select
          label="Age group"
          value={ageGroup}
          onChange={ageGroupChangeHandler}
          variant="outlined"
        >
          {ageGroupOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <Button
          style={{ width: "15rem", marginTop: "20px", fontWeight: "bold" }}
          variant="contained"
          color="primary"
          type="submit"
          disabled={!pincode.length || pincode.length > 6 ? true : false}
        >
          Submit Details
        </Button>
      </form>
      <div className="footer">
        <a href="https://t.me/cowinnotifier" target="_blank" rel="noreferrer">
          <img className="telegram-join" src={TelegramJoin} alt="Telegram-Join"/>
        </a>
      </div>
    </div>
  );
}

export default App;
