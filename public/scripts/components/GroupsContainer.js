import React, { PropTypes } from 'react'
import PointsGroup from './PointsGroup'

const GroupsContainer = ({groups}) => (
	<div className="groupsContainer">
	{groups.map(group => 
		<PointsGroup key={group.pointValue} {...group}/>
		)}
	</div>
)

GroupsContainer.propTypes = {
	groups: PropTypes.arrayOf(PropTypes.shape({
		pointValue: PropTypes.number.isRequired,
		teams: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number.isRequired,
			record: PropTypes.shape({
				WIN: PropTypes.number.isRequired,
				DRAW: PropTypes.number.isRequired,
				LOSE: PropTypes.number.isRequired
			}).isRequired,
			goals: PropTypes.shape({
				GF: PropTypes.number.isRequired,
				GA: PropTypes.number.isRequired
			}).isRequired, 
			teamName: PropTypes.string.isRequired
			}).isRequired)
		}).isRequired)
}

export default GroupsContainer