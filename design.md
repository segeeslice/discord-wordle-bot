# Wordle Bot technical design

Brainstorming doc for design

## Database

* users
    * UserId (PK)
    * Username (varchar)
* scores
    * ScoreId (PK) 
    * ArcId (FK)
    * WorldleDay (int)
    * Score (int)
        * This would be the # of attempts out of 6
    * Success (bool)
        * Signifies whether or not the puzzle was solved in 6 or fewer attempts
* userscores - cross table tracking individual users' scores day-by-day
    *  UserScoreId (PK)
    *  UserId (FK)
    *  ScoreId (FK)
* arcs - represent the beginning and end of a given "arc" of competition
    * ArcId (PK)
    * Name (varchar)
    * StartDate (date)
    * EndDate (date)


## API

For each table we probably just need CRUD operations.


## Bot Commands

* Ability to register a new user with the bot
    * @bot register {username}
* Create a new arc
    * @bot addarc {arcname} {startdate} {enddate}
        * enddate optional as we could have an open-ended arc
* Force end an arc
    * @bot endarc {arcname} {enddate}
        * end date can be optional and default to current day    

## Questions

* Is userscores necessary or should we just track things like wins on the user record?
* Does the scores table need to track success or is the score itself enough?
* Should registration of new users be based on discord name or wordle account name?
* What are the scoring options? This will inform how we want to write a bot command for scoring rule updates.