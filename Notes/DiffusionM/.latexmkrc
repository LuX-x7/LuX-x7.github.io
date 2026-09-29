# 让 latexmk 默认使用 XeLaTeX（中文字体集在 pdfLaTeX 下不可用）
$pdf_mode = 5;            # 5 = xelatex
$postscript_mode = 0;
$dvi_mode = 0;

# 需要时改用 Biber：$bibtex_use = 2;（当前文档无参考文献，仅用 \section* 列出）
$clean_ext = "synctex.gz synctex(busy) run.xml bbl blg fdb_latexmk fls";
