# SMM2Top150.github.io
This is the repository that will host the front end to the SMM2 top 150 website. The backend will be hosted on a private repository not visible to the public.


# The-Top-150


## Welcome to Super Mario Maker 2's Top 150 Levels List!

### Our Homepage: https://codermerlin.com/users/jacob-jershin/TheTop150/src/HomePage/index.html

Our Discord: https://discord.gg/xVBDxkR9Dx

Our Twitter: https://twitter.com/SMM2top100



## How the point system works

this is my in-depth explanation of how the code for the list processes points. (keep in mind this code is in google app script which is a subset of java script and that I have no formal training in JavaScript or google app script)

So starting it off each level defined in the code has 1 characteristic, that being its placement. Here's what that looks like.

```shell	
while (ListPage.getRange(index, 4).getValues() != "MNF-8Q4-WJG") {
	index += 1
}
Daphnes_Finale = index
```	
	
what those 4 lines of code do is find where the level is on the google sheet based off of its ID, then take that number and make the levels var name eg: Daphnes_Finale and set it equal to that index. Next, each player is defined as such. 

```shell
FakePlayerClears = [Ascension_to_heaven,  Scarlet_Stronghold_Double, ProjectPipes2]
FakePlayerProgressLevel = [Daphnes_Finale, Ozymandias]
FakePlayerProgress = [64, 88]
```
	
These 3 arrays define 3 things, a players clears, the levels they've gotten progress on and the % of said progress. then these arrays are stored in 4 bigger arrays called:

```shell
PlayerNameArray = ["FakePlayer"]
MasterClears = [FakePlayerClears]
MasterProgressLevel = [FakePlayerProgressLevel]
MasterPlayerProgress = [FakePlayerProgress]
```	
	
They do the following in order. Store each name of every player. The clears of every player. The levels that each player has gotten progress on, and lastly the % of their progress. This way I can call for any statistic of any player by simply indexing for the proper stats. Eg: MasterClears[PlayerID][index] which would obviously grab for the player ID and the index in the player clears array. Now that we have all of that setup out of the way lets get in to the actual algebra of this all. I use a couple of different functions here so I'll go over each of them as I show them.

```shell
function PointCalc(PlaceMent) {
  	return Math.pow(1.05, ((PlaceMent/1.3) + 31.67088767815)) // this is the current way we are giving points 
}
```	
	
PointCalc takes in the parameter PlaceMent (PlaceMent xd that typo Isn't the last one either) and it calculates how many points it should be worth based off of the algebraic expression f(PlaceMent) = ((PlaceMent/1.3) + 31.67088767815))^1.05 

```shell
function ClearPoints(Array) {
  	var index = 0
  	var total = 0
 	while (index < Array.length) {
    		total += PointCalc(101 - Array[index])
    		index += 1
  	}
        return total
}
```		
		
The function ClearPoints takes in a players clears and tells you how many total points they should get from those clears.

```shell
function ProgressCalc(x, Progress) {
    	var PointPrecent = ((Progress/10.0)*(Progress/10.0) * 0.01)
    	return (PointCalc(x)*PointPrecent)*0.90  
}
```	
	
the function ProgressCalc takes in 2 parameters those being the level (x) and the players "Precent" (god fuck these typos why the hell did i use x as the level as well xdddddd im such a good dev lmao ill fix that later tho im lazy) So what this function does is kinda complicated, it first finds what f(Progress) = 0.0001Progress^2 which takes the % of the level the player did and turns that in to a proportion of itself that relates 100 to be 1 and 1 to be .0001, then it takes this number and relates it in to the next step which takes that number and multiples it by the PointCalc of the level you have progress on and then multiplies all of that .9 which is there to "*nerf*" how OP progress is. Ok that was really confusing and convoluted but if you know comp-sci just read the code and I'm sure it'll make more sense that what I just said xd

<img src="https://user-images.githubusercontent.com/70407880/167542534-4dabb72b-d0ec-4c35-b3bc-a8c7b19f31c8.png">

```shell
function ProgressPoint(ProgressArray, LevelArray) {
 	index = 0
 	total = 0
 	while (index < ProgressArray.length) {
 	 	  total += ProgressCalc(101 - LevelArray[index], ProgressArray[index])
  		  index += 1
  	}
  return total
}
```
	
ProgressPoint does the exact same thing that ClearPoints does but instead of finding a players total points from their clears it finds the total points they get from their progress. Pretty simple stuff.

```shell
function MasterPoints(ProgressArray, ProgressLevelArray, ClearArray) {
  	return ProgressPoint(ProgressArray, ProgressLevelArray) +  ClearPoints(ClearArray)
}
```	
	
Lastly the function MasterPoints just takes in the 3 parameters of a player, that being their clears, levels they have progress on, and the % of said progress and runs the previously defined functions on those 3 arrays to find a players total points. 


## Special Thanks to all of the following! 

-[Tris](https://github.com/TrisEevee) for making the whole UI

-The VC boys for supporting me (pete231) during the project 

-All of the mods of the Top 150 smm2 discord 
