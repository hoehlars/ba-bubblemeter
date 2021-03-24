# Punktesystem Klon-Qualität

## Anforderungen

- [x] wenn der richtige Tweet auf dem richtigen Rang ist, sollte es sehr viele Punkte geben
- [ ] wenn der richtige Tweet auf einem ähnlichen Rang ist, sollte es viele Punkte geben
- [ ] wenn der richtige Tweet auf einem komplett unpassenden Rang ist, sollte es wenig Punkte geben
- [x] die oben beschriebene Abstufung sollte in den höheren Rängen (Tweets 1 - 3 ?) grosszügiger Punkte verteilen, hinten raus weniger

## Berechnung Score

### tweetDepth

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

### Matches

Volltreffer Punkte (gleicher Tweet auf gleichem Rang)  
bonus \* base

### Hits

Hit Punkte (gleicher Tweet auf falschem Rang)  
bonus \* base

### Score

Gesamt Score
MatchesScore + HitScore
