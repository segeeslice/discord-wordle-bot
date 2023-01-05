# Wordle Discord Bot

A Discord bot for tracking daily Wordle scores in (friendly?) competition.

This project is still in its infancy, but this is intended to start a bot for
use in [Discord](https://discord.com/). This will track messages in a Discord
server and parse out Wordle scores. This will be used in a competition-style
environment, tracking who did the best each day and keeping a running tally of
who is the Wordle master in the server.

## Requirements

### Base

1. Should read and automatically parse out Wordle scores
1. Should store daily Wordle scores on a per-user basis
1. Should calculate comparative scores for each user based on the following criteria:
    - User gets 1 point if they had the lowest guess count in a day (ties allowed)
    - User gets 2 additional points if they have the lowest guess count and are
      the *only* person to have that low of a guess count
1. Should support outputting comparative scores of all users in a leaderboard style

### Stretch

1. Should support "arcs" of comparative scoring
    - *In case new users come in, etc.*
    - Should have a command to end the current "arc"
        - Should store the winner(s) of the current arc, based on comparative score
        - Should internally begin a new "arc", resetting all comparative scores
    - Should have a command to post results of previous "arcs"
1. Should send reminders in the evening to anyone who haven't posted their scores
1. Should have a system in place for supporting server-specific settings
    - *e.g. could modify scoring amounts. Maybe no outright win bonus? etc.*
