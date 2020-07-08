import React from 'react';

const Rank = ({name, entries}) => {
	return (
		<div>
			  <div className="center white f3">
			    {`${name}, Your current rank is: `}
			  </div>
			  <div className=" center white f3">
			    {entries}
			  </div>
		</div>

		);
}

export default Rank;