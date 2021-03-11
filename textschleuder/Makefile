BUILDDIR=build
# FILENAME=cheatsheet.md
FILENAME=`cat index.txt`

pdf: 
	mkdir $(BUILDDIR) -p
		pandoc $(FILENAME) \
		--filter pandoc-citeproc \
		--bibliography bubble-meter.bib     	\
		--csl ieee.csl \
		--from=markdown+tex_math_single_backslash+tex_math_dollars+raw_tex \
		--to=latex \
		--output=$(BUILDDIR)/ba-bubblemeter.pdf \
		--pdf-engine=xelatex \
		--include-in-header="template.tex"