# Wordle Bot technical design

Brainstorming doc for design

## Database

* users
    * UserId (PK)
    * Username (varchar)
    * DiscordUsername (varchar)
        * Is this necessary or can we just use Username?
* scores
    * WorldleDay (int)
    * Score (int)
        * This would be the # of attempts out of 6
    * Success (bool)
        * Signifies whether or not the puzzle was solved in 6 or fewer attempts
        * Is this necessary? Probably not?
* userscores - cross table tracking individual users' scores day-by-day
    *  UserScoreId (pk)
    *  UserId (fk)
    *  ScoreId (fk)
* arcs - represent the beginning and end of a given "arc" of competition
    * ArcId (PK)
    * Name (varchar)
    * StartDate (date)
    * EndDate (date)

## Open Questions

* Is userscores necessary or should we just track things like wins on the user record?

