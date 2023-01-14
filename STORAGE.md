# Storage

*This document intends to provide a high-level design overview for how point
storage is handled. For technical details & implementation, see
`src/storage.ts`*

## Score Types

First, it's important to distinguish the two "types" of scores:

- **Raw** = the base score a user received from Wordle itself
- **Comparative** = the comparative score against others in the server, which
  should calculate absolute wins, etc.

## Raw Score Storage

When a Wordle response is parsed out _(entrypoint -
`src/listeners/messageCreate.ts`)_ it's info is automatically stored to a local
file **`db.json`**.

This is intended to store the minimum amount of information necessary to
calculate comparative scores later.

The format is as follows:

```json
{
    "rawScores": {
        (wordle_number): {
            (username): {
                "score": (int)
            }
        }
    }
}
```

So if I (segeeslice) post the following score:

>Wordle 572 4/6
>  
>⬛⬛🟩⬛🟨  
>⬛⬛⬛⬛🟩  
>⬛🟩🟩🟨🟩  
>🟩🟩🟩🟩🟩

I'd expect the following entry:

```json
{
    "572": {
        "segeeslice": {
            "score": 4
        }
    }
}
```

## Comparative Score Storage

### Relevant Info

The comparative scores will keep everything in terms of **arcs**. These will
keep track of scores over specific periods of time and allow for sectioning off
scores.

Each arc will have 3 pieces of important information:

- Arc name
- Start date
- End date (optional)

### Additional Optimization Notes

In the data, we should designate **"current"** and **"past"** arcs for
optimization. By separating this, we don't need to do all the calculations each
time we add info to an arc. This means we'll need some separate service to move
"current" arcs into the "past" section, which would ideally be some **automated
task** that runs every morning.

### Resulting Data Format

The following will be stored automatically in **`db.json`**.
This is intended to store the minimum amount of information necessary to
retrieve total leadership scores. Daily scores will simply need recalculated for
specific retrieval *(subject to change if this seems to be too much)*.

```json
{
    "arcs": {
        "current": {
            (arcName): {
                "startDate": (date),
                "scores": {
                    (username): (total_score),
                },
            },
            (etc.)
        },
        "past": {
            (same as above...)
        }
    }
}
```
