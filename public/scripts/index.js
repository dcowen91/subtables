import 'babel-polyfill'
import React from 'react'
import ReactDOM  from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import GroupsContainer from './components/GroupsContainer'

var _TeamNameToIndexMapping = {
	"ARSENAL" : 0, 
	"ASTON VILLA": 1, 
	"BOURNEMOUTH": 2, 
	"CHELSEA": 3, 
	"CRYSTAL PALACE": 4,
	"EVERTON": 5,
	"LEICESTER CITY": 6,
	"LIVERPOOL": 7,
	"MANCHESTER CITY": 8,
	"MANCHESTER UNITED": 9,
	"NEWCASTLE UNITED": 10,
	"NORWICH CITY": 11,
	"SOUTHAMPTON": 12,
	"STOKE CITY": 13,
	"SUNDERLAND": 14,
	"SWANSEA CITY": 15,
	"TOTTENHAM HOTSPUR": 16,
	"WATFORD": 17,
	"WEST BROMWICH ALBION": 18,
	"WEST HAM UNITED": 19
};

var _TeamNamesByIndex = [
	"ARSENAL", 
	"ASTON VILLA", 
	"BOURNEMOUTH", 
	"CHELSEA", 
	"CRYSTAL PALACE",
	"EVERTON",
	"LEICESTER CITY",
	"LIVERPOOL",
	"MANCHESTER CITY",
	"MANCHESTER UNITED",
	"NEWCASTLE UNITED",
	"NORWICH CITY",
	"SOUTHAMPTON",
	"STOKE CITY",
	"SUNDERLAND",
	"SWANSEA CITY",
	"TOTTENHAM HOTSPUR",
	"WATFORD",
	"WEST BROMWICH ALBION",
	"WEST HAM UNITED"
	];

var _Results = [
	[null,null,[2,0],[0,1],null,[2,1],[2,1],[0,0],[2,1],[3,0],[1,0],null,[0,0],[2,0],[3,1],[1,2],[1,1],null,null,[0,2]],
	[[0,2],null,null,null,[1,0],[1,3],[1,1],[0,6],[0,0],[0,1],null,[2,0],null,[0,1],[2,2],[1,2],[0,2],[2,3],[0,1],[1,1]],
	[[0,2],[0,1],null,null,[0,0],[3,3],[1,1],null,null,[2,1],[0,1],[3,0],[2,0],[1,3],[2,0],[3,2],[1,5],[1,1],null,[1,3]],
	[[2,0],[2,0],[0,1],null,[1,2],[3,3],null,[1,3],null,[1,1],[5,1],[1,0],[1,3],[1,1],[3,1],[2,2],null,[2,2],[2,2],[2,2]],
	[[1,2],[2,1],[1,2],[0,3],null,null,[0,1],[1,2],[0,1],[0,0],[5,1],null,[1,0],null,[0,1],[0,0],[1,3],[1,2],[2,0],[1,3]],
	[[0,2],[4,0],null,[3,1],[1,1],null,[2,3],[1,1],[0,2],[0,3],[3,0],null,null,[3,4],[6,2],[1,2],[1,1],[2,2],[0,1],[2,3]],
	[[2,5],[3,2],[0,0],[2,1],[1,0],null,null,[2,0],[0,0],[1,1],[1,0],[1,0],null,[3,0],[4,2],null,[1,1],[2,1],[2,2],null],
	[[3,3],[3,2],[1,0],null,[1,2],null,[1,0],null,[3,0],[0,1],null,[1,1],[1,1],null,[2,2],[1,0],null,null,[2,2],[0,3]],
	[null,[4,0],[5,1],[3,0],[4,0],[0,0],[1,3],[1,4],null,null,[6,1],[2,1],[3,1],null,[4,1],[2,1],[1,2],[2,0],null,[1,2]],
	[[3,2],null,null,[0,0],null,null,null,[3,1],[0,0],null,[0,0],[1,2],[0,1],[3,0],[3,0],[2,1],[1,0],[1,0],[2,0],[0,0]],
	[[0,1],[1,1],[1,3],[2,2],null,[0,1],[0,3],[2,0],null,[3,3],null,[6,2],[2,2],[0,0],null,null,null,[1,2],[1,0],[2,1]],
	[[1,1],[2,0],[3,1],[1,2],[1,3],[1,1],[1,2],[4,5],[0,0],null,null,null,[1,0],[1,1],null,[1,0],[0,3],null,[0,1],[2,2]],
	[[4,0],[1,1],[2,0],[1,2],null,[0,3],[2,2],null,null,[2,3],null,[3,0],null,[0,1],[1,1],[3,1],[0,2],[2,0],[3,0],[1,0]],
	[[0,0],[2,1],[2,1],[1,0],[1,2],[0,3],[2,2],[0,1],[2,0],[2,0],[1,0],[3,1],[1,2],null,null,null,null,[0,2],[0,1],null],
	[null,[3,1],[1,1],null,[2,2],null,null,[0,1],[0,1],[2,1],[3,0],[1,3],[0,1],[2,0],null,[1,1],[0,1],[0,1],null,[2,2]],
	[[0,3],[1,0],[2,2],null,[1,1],[0,0],[0,3],null,null,[2,1],[2,0],[1,0],[0,1],[0,1],[2,4],null,[2,2],[1,0],[1,0],[0,0]],
	[[2,2],[3,1],null,[0,0],[1,0],[0,0],[0,1],[0,0],[4,1],null,[1,2],[3,0],null,[2,2],[4,1],[2,1],null,[1,0],null,[4,1]],
	[[0,3],null,[0,0],[0,0],[0,1],null,[0,1],[3,0],[1,2],[1,2],[2,1],[2,0],[0,0],[1,2],null,[1,0],[1,2],null,[0,0],[2,0]],
	[[2,1],[0,0],[1,2],[2,3],[3,2],[2,3],[2,3],null,[0,3],[1,0],[1,0],[0,1],[0,0],[2,1],[1,0],[1,1],[1,1],null,null,null],
	[null,[2,0],[3,4],[2,1],null,[1,1],[1,2],[2,0],[2,2],null,[2,0],[2,2],[2,1],[0,0],[1,0],null,[1,0],null,[1,1],null]
	];

function getResults(teamName)
{
	var teamIndex = _TeamNameToIndexMapping[teamName];
	var record= 
	{
		WIN: 0,
		LOSE: 0,
		DRAW: 0
	};
	var goals = 
	{
		GF: 0,
		GA: 0
	};
	for (var i = 0; i < _Results.length; i++)
	{
		var currentResult;
		if ( i == teamIndex)
		{
			//Get HOME results
			for (var j = 0; j < _Results[i].length; j++)
			{
				currentResult = _Results[i][j];
				if (!!currentResult)
				{
					goals.GA += currentResult[1]; 
					goals.GF += currentResult[0];
					
					if (currentResult[1] > currentResult[0])
					{
						record.LOSE++;
					}
					else if (currentResult[1] < currentResult[0])
					{
						record.WIN++;
					}
					else
					{
						record.DRAW++;
					}
				}
			}
		}
		else
		{
			//get AWAY result
			currentResult = _Results[i][teamIndex];
			if (!!currentResult)
			{
				goals.GA += currentResult[0]; 
				goals.GF += currentResult[1];
				
				if (currentResult[0] > currentResult[1])
				{
					record.LOSE++;
				}
				else if (currentResult[0] < currentResult[1])
				{
					record.WIN++;
				}
				else
				{
					record.DRAW++;
				}
			}
		}
	}
	var teamData = 
	{
	teamName : teamName,
	record: record,
	goals: goals,
	points: record.WIN * 3 + record.DRAW,
	id: teamIndex
	};
	return teamData;
}

var sortfunction = function(a,b)
{
	return b.points -  a.points;
}
var PrepareTeamData = function()
{
	var data = [];
	for (var i = 0; i < _TeamNamesByIndex.length; i++)
	{
		data.push(getResults(_TeamNamesByIndex[i]));
	}
	data.sort(sortfunction);
	
	var highNum = data[0].points;
	var pointRowData = new Array(highNum);
	for (var j = 0; j < data.length; j++)
	{
		var index = data[j].points;
		if (!!pointRowData[index])
		{
			pointRowData[index].push(data[j]);
		}
		else
		{
			var obj = {index: index}
			pointRowData[index] = [obj, data[j]];
		}
	}
	return pointRowData.reverse();
}

// var data = PrepareTeamData();

// ReactDOM.render(
// 	<RowsContainer data={data} />,
// 	document.getElementById('content')
// );

var data =
{
	pointValue : 58,
	teams : [getResults("TOTTENHAM HOTSPUR"), getResults("ARSENAL")]
};
var data2 =
{
	pointValue : 57,
	teams: []
};

var data3 =
{
	pointValue : 56,
	teams : [getResults("LEICESTER CITY") ]
};

var combined = [data, data2, data3];

ReactDOM.render(
	<GroupsContainer groups ={combined}/>,
	document.getElementById('content')
)

//DOM structure
// App
// <TODO filter components>
// <PointRowCollection>
//   <PointsGroup>
//     <Team>
//    ..

//git push azure master to deploy
//git push origin master to save