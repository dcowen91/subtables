import React, { PropTypes } from 'react'
import TeamBox from './TeamBox'

const PointsGroup = ({pointValue, teams}) => (
	<div className = "PointsRow">
	<h2>{pointValue} Points </h2>
	{teams.map(team => 
		<TeamBox key={team.id} {...team}/>
	)}
	</div>
)
PointsGroup.propTypes = {
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
		}
		).isRequired)
}

export default PointsGroup

// <TeamBox key={team.id} record={data.record} goals={data.goals} teamName={data.teamName}/>