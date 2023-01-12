# Storage

*This document intends to provide a high-level design overview for how point
storage is handled. For technical details & implementation, see
`src/storage.ts`*

First, it's important to distinguish the two "types" of scores:

- **Raw** = the base score a user received from Wordle itself
- **Comparative** = the comparative score against others in the server, which
  should calculate absolute wins, etc.

## Raw Score Storage

When a Wordle response is parsed out _(entrypoint -
`src/listeners/messageCreate.ts`)_ it's info is automatically stored to a local
file **`raw_scores.json`**.

The format is as follows:

```json
{
    (wordle_number): {
        (username): {
            "score": (int)
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

When comparative scores are calculated, they should (ideally) be stored for
immediate re-use so we don't need to keep re-calculating.

*Formatting TBD*

