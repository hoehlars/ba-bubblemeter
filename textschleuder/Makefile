BUILDDIR=build
FILENAME=cheatsheet

pdf: 
	mkdir $(BUILDDIR) -p
		pandoc $(FILENAME).md \
		--filter pandoc-citeproc \
		--bibliography bubble-meter.bib     	\
		--csl ieee.csl \
		--from=markdown+tex_math_single_backslash+tex_math_dollars+raw_tex \
		--to=latex \
		--output=$(BUILDDIR)/$(FILENAME).pdf \
		--pdf-engine=xelatex \
		--include-in-header="template.tex"