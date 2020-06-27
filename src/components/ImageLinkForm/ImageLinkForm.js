import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return (
		<div>
			<p className="center f3">
				{'This Magic Brain will detect faces in your pictures, give it a try!'}
			</p>
			<div className="center">
				<div className="form pa4 br3 shadow-5">
					<input className="f4 pa2 w-70"type="text" placeholder="Paste Link Here" onChange = {onInputChange}/>
					<button className="f4 grow w-30 link ph3 pv2 dib white bg-blue" onClick = {onButtonSubmit}>Detect</button>
				</div>
			</div>
		</div>

		);
}

export default ImageLinkForm;