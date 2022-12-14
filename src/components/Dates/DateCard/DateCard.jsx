import React from 'react';
import Button from '../../UI/Button/Button';
import './DateCard.css';

const DateCard = (props) => {
	return ( 
		<div className="dateCard">
			<p>{props.id}</p>
			<p className='dateCard__dateSend'>{props.dateSend}</p>
			<p>
				<span>{props.dateStart}</span> / <span>{props.dateEnd}</span>
			</p>
			<Button className={'btn-remove'} onClick={props.btnRemove}/>

		</div>
	);
}
 
export default DateCard;

