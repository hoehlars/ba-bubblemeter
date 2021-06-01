# Punktesystem Klon-Qualität

Um zu prüfen, wie gut die Qualität unserer Klone ist, brauchen wir einen Algo.
Dieser sollte folgendes tun / berücksichtigen:

- [ ] die X ersten Tweet-IDs von Original und Klon pro Suchabfrage vergleichen
- [ ] wenn der richtige Tweet auf dem richtigen Rang ist, sollte es sehr viele Punkte geben
- [ ] wenn der richtige Tweet auf einem ähnlichen Rang ist, sollte es viele Punkte geben
- [ ] wenn der richtige Tweet auf einem komplett unpassenden Rang ist, sollte es wenig Punkte geben
- [ ] die oben beschriebene Abstufung sollte evtl in den höheren Rängen (Tweets 1 - 3 ?) grosszügiger Punkte verteilen, hinten raus weniger

## Datenstruktur

Input: X-Dateien mit Suchresultaten des Originals, X-Dateien mit Suchresultaten des Klons,
importieren in neues Array:

```json
{
  "data": [
    {
      "original": [
        {
          "query1results": ["tweetId", "tweetId", "tweetId"]
        },
        {
          "query2results": ["tweetId", "tweetId", "tweetId"]
        },
        {
          "query3results": ["tweetId", "tweetId", "tweetId"]
        }
      ]
    },
    {
      "klon": [
        {
          "query1results": ["tweetId", "tweetId", "tweetId"]
        },
        {
          "query2results": ["tweetId", "tweetId", "tweetId"]
        },
        {
          "query3results": ["tweetId", "tweetId", "tweetId"]
        }
      ]
    }
  ]
}
```

Output:

- Meta: @Handles der Verglichenen
- Gesamtscore
- Anz Volltreffer
- Anz Hits
- Pro Suchbegriff: Score, Volltreffer, Hits

## Berechnung Score

Variabeln:

twitNum
Anz zu vergleichende Tweets
default: 15

base
Basis-Punkteeinheit
default: 2

bonus
TopRank Bonus
default (1 - 3): 3
default (3 - 8): 2
default (8 - 15): 1

vtScore
Volltreffer Punkte (gleicher Tweet auf gleichem Rang)
3 _ bonus _ base

hitScore
Hit Punkte (gleicher Tweet auf falschem Rang)
2 _ bonus _ base
