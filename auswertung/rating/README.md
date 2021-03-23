# Punktesystem Klon-Qualität

Um zu prüfen, wie gut die Qualität unserer Klone ist, brauchen wir einen Algo.
Dieser sollte folgendes tun / berücksichtigen:

- [ ] die X ersten Tweet-IDs von Original und Klon pro Suchabfrage vergleichen
- [ ] wenn der richtige Tweet auf dem richtigen Rang ist, sollte es sehr viele Punkte geben
- [ ] wenn der richtige Tweet auf einem ähnlichen Rang ist, sollte es viele Punkte geben
- [ ] wenn der richtige Tweet auf einem komplett unpassenden Rang ist, sollte es wenig Punkte geben
- [ ] die oben beschriebene Abstufung sollte evtl in den höheren Rängen (Tweets 1 - 3 ?) grosszügiger Punkte verteilen, hinten raus weniger

## Input

X-Dateien mit Suchresultaten des Originals  
X-Dateien mit Suchresultaten des Klons

Zu importieren in neues Array:

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

## Output:

- Meta: @Handles der Verglichenen
- Gesamtscore
- Anz Volltreffer
- Anz Hits
- Pro Suchbegriff: Score, Volltreffer, Hits

## Berechnung Score

### twitNum

Anz zu vergleichende Tweets  
_default: 15_

### base

Basis-Punkteeinheit, vergrössern um eindeutigere Resultate zu erhalten  
_default: 2_

### bonus

Höhere Gewichtung der oberen Resultate  
_default (1 - 3): 3_  
_default (3 - 8): 2_  
_default (8 - 15): 1_

### vtScore

Volltreffer Punkte (gleicher Tweet auf gleichem Rang)  
3 \* bonus \* base

### hitScore

Hit Punkte (gleicher Tweet auf falschem Rang)  
2 \* bonus \* base

### Score

Gesamt Score
vtScore + hitScore
