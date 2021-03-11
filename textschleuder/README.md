# Textschleuder

Die Textschleuder setzt sich zur Zeit aus folgenden Bausteinen zusammen:

## Markdown, LaTeX, Pandoc

Die in Markdown geschriebenen Parts können mit Pandoc nach LaTeX und anschliessend in ein PDF umgewandelt werden.
Leider klappt noch nicht ganz alles reibungslos, allerdings doch schon einiges ;-)

Details dazu im Kapitel Cheatsheet.

## Zum Compilen

Ein Makefile sorgt dafür, dass die Magie startet, dazu muss Pandoc, LaTeX und Inkscape (für Vektorgrafiken) installiert sein.

## Index, Parts, Ressources, Img und Build

Im Index file werden die Markdown Files bestimmt, die zum PDF kombiniert werden sollen. In setup.md werden vorab ein paar Einstellungen festgelegt.

Unter Parts findet ihr die einzelnen Kapitel als Markdown Files, unter Ressourcen ein Paar Admin-Files (Selbstständigkeitserklärung etc), Bilder liegen im Img-Ordner und im Build wird dann das pdf ausgespuckt.

## Bibliografie und Zitate

Die Bubble-Meter.bib Datei ist auf Zotero exportiert, wo wir ja eine gemeinsame Bibliothek aufbauen werden. Der Zitierstil wird noch in ieee.csl definiert, mit etwas Glück werde ich am Montag eine Lösung finden, um den eigentlich gewünschten deIEEEzhaw.bst Styl anwenden zu können...
