import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
	if(isSignedIn) {
		return (
		<div>
			<nav className="dt w-100 border-box pa3 ph5-ns">
			  <div className="dtc v-mid w-75 tr">
			    <p onClick = {() => onRouteChange('signout')}className="link dim black underline f6 f5-ns dib">Sign Out</p>
			  </div>
			</nav>
		</div>

		);

	} else{
		return (
		<div>
			<nav className="dt w-100 border-box pa3 ph5-ns">
			  <div className="dtc v-mid w-100 ph5-l tr">
			    <p onClick = {() => onRouteChange('signin')}className="link dim black underline f6 f5-ns dib">Sign In</p>
			  </div>
			  <div className="dtc v-mid tr">
			    <p onClick = {() => onRouteChange('register')}className="link dim black underline f6 f5-ns dib">Register</p>
			  </div>
			</nav>
		</div>

		);
	}
	
}

export default Navigation;

