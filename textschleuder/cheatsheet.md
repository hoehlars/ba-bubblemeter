---
title: 'BA Bubble Meter'
date: \today
author: 'Author'
link-citations: true
urlcolor: 'blue'
documentclass: scrreprt
classoption:
  - a4paper
  - 11pt
  - abstract=on
---

# Cheatsheet

## Willkommen

Grundsätzlich funzt Markdown wie gehabt und wie [hier](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links) beschrieben.

### Basics

**Fliesstext** fliesst daher wie ein Fluss von Text. Eiusmod qui esse aute non nostrud non magna nostrud. Sit commodo sit enim amet nulla ut mollit ipsum dolore duis est consectetur. Sunt consequat aliquip ullamco occaecat consectetur irure esse ad.

Header können mit #, ##, ### Definiert werden, **Textauszeichnungen**, _blabla_ klappen auch und Listen sind ebenfalls möglich:

- das
- ist
- doch
- super

1. erstens
2. zweitens
3. und so weiterns

### Code

Auch **code** kommt gut:

#### JavaScript

```javascript
console.log('Hello World!')
```

#### Haskell

```haskell
module Main where

main :: IO ()
main = putStrLn "Hello, World!"
```

\clearpage

### Bilder

Lasst uns zur Freude doch auch mal ein Bild zeigen, das lockert auf:

![BubbleBild \label{fig:1}](./img/Filter-Bubble-World.jpg)

Siehe Abbildung \ref{fig:1}, Dateipfade sind offenbar relativ zum Makefile, welches den Pandoc Befehl ausführen lässt.  
Wenn man Inkscape installiert hat, sollte auch das Verwenden von SVGs möglich sein:

![BubbleSvg \label{fig:2}](./img/bubble.svg)

# LaTeX inside

### Formeln

LaTeX Formeln klappen ganz ok:

$$
f(a)={\frac {1}{2\pi i}}\oint _{\gamma }{\frac {f(z)}{z-a}}\,dz
\tag{1}
\label{1}
$$

Was man sonst noch alles so beformeln kann, ist zum Beispiel [hier](https://jaantollander.com/post/scientific-writing-with-markdown/#creating-documents) beschrieben.

### Zitate

Dank LaTeX und Pandoc können unter anderem bibliografische Verweise (@bierig_special_2019, 11) elegant verpackt werden.  
Leider ecke ich hier noch an. Zum einen wird die Bibliographie in EN ausgegeben, statt wie gewünscht in DE (Bierig **and** Canton, statt **und**). Zum anderen kann ich nur den allgemeinen ieee Zitierstyl integrieren, statt den vom helferlein auf
github abgelegten deIEEEzhaw Styl (weil pandoc nur csl Files supported und nicht mit bst am Hut haben will).

# Quellenverzeichnis
