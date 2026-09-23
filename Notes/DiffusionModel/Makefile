# =============================================================================
#  Makefile —— 本机 TeX Live 2026 / XeLaTeX 工作流
#     make          编译（含 biber 与交叉引用，自动多遍）
#     make clean    清掉中间文件
#     make cleanall 连 PDF 一起清掉
#     make view     用 macOS 预览打开
# =============================================================================

MAIN   := main
TEXBIN := /Library/TeX/texbin

LATEXMK := $(TEXBIN)/latexmk
XELATEX := $(TEXBIN)/xelatex
BIBER   := $(TEXBIN)/biber

.PHONY: all view clean cleanall wordcount

all: $(MAIN).pdf

# latexmk 会自动处理“xelatex → biber → xelatex×2”的所有遍数
$(MAIN).pdf: $(MAIN).tex preamble.tex refs.bib $(wildcard sections/*.tex)
	$(LATEXMK) -xelatex -interaction=nonstopmode -halt-on-error $(MAIN).tex

# 不用 latexmk 的等价写法
manual:
	$(XELATEX) -interaction=nonstopmode $(MAIN).tex
	$(BIBER)   $(MAIN)
	$(XELATEX) -interaction=nonstopmode $(MAIN).tex
	$(XELATEX) -interaction=nonstopmode $(MAIN).tex

view: $(MAIN).pdf
	open $(MAIN).pdf

# 粗略统计正文字数（按中文字符数估）
wordcount:
	@for f in sections/*.tex; do \
	  n=$$(python3 -c "import re,sys;print(len(re.findall(r'[\u4e00-\u9fff]',open('$$f',encoding='utf-8').read())))"); \
	  printf '%-40s %6s\n' "$$f" "$$n"; \
	done

clean:
	$(LATEXMK) -c $(MAIN).tex
	rm -f $(MAIN).bbl $(MAIN).bcf $(MAIN).run.xml $(MAIN).blg $(MAIN).fdb_latexmk $(MAIN).fls

cleanall: clean
	rm -f $(MAIN).pdf
