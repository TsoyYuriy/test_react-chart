import moment from 'moment';
import React, {useState, useEffect} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import Dates from './components/Dates/Dates';
import Button from './components/UI/Button/Button';
import { baseApi } from './helper/baseUrl';
import { getRandomKey } from './helper/createId';

const App = () => {

  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  // const [isActive, setIsActive] = useState(false); // Нужен для постоянного обновления сервера, возможно логика немного неправильная, но чтобы ее отладить не составит проблем. API которое дали скорей всего заглушка, так же немного не понял почему все передается GET методами, насколько я знаю то лучше всего разделять, GET, POST, DELETE 

  const add = async (e) => {
    e.preventDefault();

    const newDate = {
      id: getRandomKey(),
      dateOfSend: moment(date).format('YYYY-MM-DD'),
      forecastStart: moment(startDate).format('YYYY-MM-DD'),
      forecastEnd: moment(endDate).format('YYYY-MM-DD')
    }

    setDates([...dates, newDate]);

    try {
      await	baseApi.get('/addNewForecastPlannerItem', {params: newDate});
    } catch (err) {
      console.log(err, 'Произошла ошибка');
      alert('УПС...что-то пошло не так');
    }
    // setIsActive(true)
  };

  const get = async () => {
    try {
      const resp = await baseApi.get ('/findAllForecastPlanerItems');
      setDates(resp.data);
    } catch (err) {
      console.log(err, 'Произошла ошибка');
      alert('УПС...что-то пошло не так');
    } 
    // setIsActive(false)
  };

  const removeDate = async (id) => {
    const i = dates.findIndex( el => el.id === id);
    const datesCopy = [...dates];
    datesCopy.splice(i, 1);
    setDates(datesCopy);

    try {
      await baseApi.get( `/deleteForecastPlannerItemById?itemId=${id}`);
    } catch (err) {
      console.log(err, 'Произошла ошибка');
      alert('УПС...что-то пошло не так');
    }
    // setIsActive(true)
  };
  
  useEffect(() => {
    get();
  }, []);

  // useEffect(() => {
  //   get();
  // }, [isActive]);

  return (
    <div className="App">
      <div className="container">
        <Dates 
          dates={dates}
          removeDate={removeDate}
        />
        <h3>Планировщик</h3>
        <form className="date" onSubmit={e => add(e)}>
          <div className="datepicker">
            <DatePicker dateFormat="d MMMM, yyyy" selected={date} onChange={date => setDate(date)} />
          </div>
          
          <div className="range">
            <DatePicker
              dateFormat="d MMMM, yyyy"
              selected={startDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              onChange={date => setStartDate(date)}
            />
            <DatePicker
              dateFormat="d MMMM, yyyy"
              selected={endDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              onChange={date => setEndDate(date)}
            />
          </div>

          <Button className={'btn-add'}/>
        </form>
        
      </div>
    </div>
  );
}

export default App;
