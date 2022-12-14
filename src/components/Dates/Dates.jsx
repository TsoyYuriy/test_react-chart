import React from 'react';
import DateCard from './DateCard/DateCard';
import './Dates.css';

const Dates = ({dates, removeDate}) => {
	return ( 
		<div className="dates">
			<div className="dates__header">
				<p>#</p>
				<p>Дата отправки</p>
				<p>Прогноз</p>
			</div>
			<div className="dates__items">
				{dates.map( el => {
					return <DateCard
									key={el.id}
									id={el.id}
									dateSend={el.dateOfSend}
									dateStart={el.forecastStart}
									dateEnd={el.forecastEnd}
									btnRemove={() => removeDate( el.id )}
								/>
				})}
			</div>
			
		</div>
	);
}
 
export default Dates;