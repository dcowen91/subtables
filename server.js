var http = require('http')
var port = process.env.PORT || 1337;

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
    "SOUTHHAMPTON": 12,
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
    "SOUTHHAMPTON",
    "STOKE CITY",
    "SUNDERLAND",
    "SWANSEA CITY",
    "TOTTENHAM HOTSPUR",
    "WATFORD",
    "WEST BROMWICH ALBION",
    "WEST HAM UNITED"
    ];

var _Results = [
    [null, null, [2,0], [0,1], null, [2,1], [2,1], [0,0], [2,1], [3,0], [1,0], null, [0,0], [2,0], [3,1], [1,2], [1,1], null, null, [0,2]],
    [[0,2], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [[0,2], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [[2,0], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [[1,2], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [[2,5], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [[3,3], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [[3,2], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [[0,1], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [[1,1], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [[4,0], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [[0,0], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [[0,3], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [[2,2], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [[0,3], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [[2,1], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ]    
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
    } ;
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
     name : teamName,
     record: record,
     goals: goals
    };
    return teamData;
}

http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  var responseString = "";
  for (var i = 0; i < _TeamNamesByIndex.length; i++)
  {
      var current = getResults(_TeamNamesByIndex[i]);
      var currentString = current.name +"\n" + current.record.WIN + " wins, " + current.record.DRAW + " draws," + current.record.LOSE + " losses\n" + current.goals.GF + " for, " + current.goals.GA + " against (" +  (current.goals.GF- current.goals.GA) + " GD)\n"; 
      responseString += currentString;
  }
  
  res.end(responseString);
}).listen(port);



//git push azure master to deploy
//git push origin master to save

//TODO: finish table
//TODO: convert to react