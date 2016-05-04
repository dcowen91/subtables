import React, { PropTypes } from 'react'

const TeamBox = ({record, goals, teamName}) =>
(
	<div className="teamBox">
		<span>
			{teamName}
		</span>
		<span className="teamData">
			<br />
			{record.WIN}W : {record.DRAW}D : {record.LOSE}L
			<br />
			{goals.GF} GF : {goals.GA} GA  ({goals.GF - goals.GA})
		</span>
	</div>
)

TeamBox.PropTypes = {
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

export default TeamBox