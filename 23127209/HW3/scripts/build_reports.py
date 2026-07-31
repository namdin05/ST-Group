from pathlib import Path
import re
import sys

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf"
FONT = Path(r"C:\Windows\Fonts\arial.ttf")
FONT_BOLD = Path(r"C:\Windows\Fonts\arialbd.ttf")

pdfmetrics.registerFont(TTFont("Arial", str(FONT)))
pdfmetrics.registerFont(TTFont("Arial-Bold", str(FONT_BOLD)))

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="BodyArial", parent=styles["BodyText"], fontName="Arial", fontSize=9.2, leading=13, spaceAfter=5))
styles.add(ParagraphStyle(name="H1Arial", parent=styles["Heading1"], fontName="Arial-Bold", fontSize=19, leading=23, textColor=colors.HexColor("#17365D"), spaceAfter=12))
styles.add(ParagraphStyle(name="H2Arial", parent=styles["Heading2"], fontName="Arial-Bold", fontSize=13.5, leading=17, textColor=colors.HexColor("#1F4E78"), spaceBefore=8, spaceAfter=6))
styles.add(ParagraphStyle(name="H3Arial", parent=styles["Heading3"], fontName="Arial-Bold", fontSize=11, leading=14, textColor=colors.HexColor("#2F5597"), spaceBefore=6, spaceAfter=4))
styles.add(ParagraphStyle(name="BulletArial", parent=styles["BodyArial"], leftIndent=18, firstLineIndent=-11, bulletIndent=5))
styles.add(ParagraphStyle(name="SmallArial", parent=styles["BodyArial"], fontSize=7.2, leading=9))
styles.add(ParagraphStyle(name="FooterArial", parent=styles["BodyArial"], fontSize=7.5, textColor=colors.HexColor("#667085"), alignment=TA_CENTER))


def clean_inline(text: str) -> str:
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    text = re.sub(r"`([^`]+)`", r"<font name='Courier'>\1</font>", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    return text


def parse_table(lines: list[str], usable_width: float):
    rows = []
    for line in lines:
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if all(re.fullmatch(r":?-{3,}:?", cell or "") for cell in cells):
            continue
        rows.append([Paragraph(clean_inline(cell), styles["SmallArial"]) for cell in cells])
    if not rows:
        return []
    widths = [usable_width / len(rows[0])] * len(rows[0])
    table = Table(rows, colWidths=widths, repeatRows=1, hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#D9EAF7")),
                ("FONTNAME", (0, 0), (-1, 0), "Arial-Bold"),
                ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#AAB7C4")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F7F9FC")]),
            ]
        )
    )
    return [table, Spacer(1, 6)]


def markdown_story(path: Path, usable_width: float):
    lines = path.read_text(encoding="utf-8").splitlines()
    story = []
    i = 0
    paragraph = []

    def flush_paragraph():
        nonlocal paragraph
        if paragraph:
            story.append(Paragraph(clean_inline(" ".join(s.strip() for s in paragraph)), styles["BodyArial"]))
            paragraph = []

    while i < len(lines):
        line = lines[i].rstrip()
        if line.startswith("|"):
            flush_paragraph()
            block = []
            while i < len(lines) and lines[i].lstrip().startswith("|"):
                block.append(lines[i])
                i += 1
            story.extend(parse_table(block, usable_width))
            continue
        if not line.strip():
            flush_paragraph()
        elif line.startswith("# "):
            flush_paragraph()
            story.append(Paragraph(clean_inline(line[2:]), styles["H1Arial"]))
        elif line.startswith("## "):
            flush_paragraph()
            story.append(Paragraph(clean_inline(line[3:]), styles["H2Arial"]))
        elif line.startswith("### "):
            flush_paragraph()
            story.append(Paragraph(clean_inline(line[4:]), styles["H3Arial"]))
        elif line.startswith("- "):
            flush_paragraph()
            bullet_parts = [line[2:].strip()]
            while i + 1 < len(lines) and lines[i + 1].startswith("  "):
                i += 1
                bullet_parts.append(lines[i].strip())
            story.append(
                Paragraph(
                    clean_inline("• " + " ".join(bullet_parts)),
                    styles["BulletArial"],
                )
            )
        else:
            paragraph.append(line)
        i += 1
    flush_paragraph()
    return story


def build(source: Path, target: Path, doc_title: str):
    target.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(target),
        pagesize=A4,
        rightMargin=16 * mm,
        leftMargin=16 * mm,
        topMargin=18 * mm,
        bottomMargin=22 * mm,
        title=doc_title,
        author="23127209",
    )

    def footer(canvas, document):
        canvas.saveState()
        canvas.setStrokeColor(colors.HexColor("#D0D5DD"))
        canvas.line(16 * mm, 15 * mm, A4[0] - 16 * mm, 15 * mm)
        canvas.setFont("Arial", 7.5)
        canvas.setFillColor(colors.HexColor("#667085"))
        canvas.drawCentredString(A4[0] / 2, 10 * mm, f"{doc_title}  |  23127209  |  Page {document.page}")
        canvas.restoreState()

    story = markdown_story(source, A4[0] - 32 * mm)
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(target)


def main():
    targets = [
        (ROOT / "reports" / "Scenario-D-Test-Report.md", OUT / "Scenario-D-Test-Report.pdf", "Scenario D Test Report"),
        (ROOT / "reports" / "AI-Audit-Report.md", OUT / "AI-Audit-Report.pdf", "AI Audit Report"),
        (ROOT / "reports" / "AI-Critique.md", OUT / "AI-Critique.pdf", "AI Critique"),
    ]
    for source, target, title in targets:
        if not source.exists():
            raise FileNotFoundError(source)
        build(source, target, title)


if __name__ == "__main__":
    main()
