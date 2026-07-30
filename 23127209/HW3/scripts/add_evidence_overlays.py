from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "evidence" / "screenshots"
OUTPUT = ROOT / "evidence" / "compatibility"
FONT = Path(r"C:\Windows\Fonts\arial.ttf")
FONT_BOLD = Path(r"C:\Windows\Fonts\arialbd.ttf")

CASES = {
    "WIN-01-D1-Chromium-desktop.png": "D1-empty-form-validation.png",
    "WIN-02-D2-Chromium-desktop.png": "D2-request-33-resolved.png",
    "WIN-03-D3-Chromium-desktop.png": "D3-category-filter-unlabeled.png",
    "WIN-04-D4-Chromium-desktop.png": "D4-empty-response-validation.png",
}


def add_overlay(source: Path, target: Path, screen_id: str) -> None:
    image = Image.open(source).convert("RGBA")
    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    body = ImageFont.truetype(str(FONT), 16)
    bold = ImageFont.truetype(str(FONT_BOLD), 17)
    lines = [
        "nakhoa232@clc.fitus.edu.vn",
        f"{screen_id} | Windows | Chromium (in-app) | Desktop 1280x720 | 2026-07-30",
    ]
    margin = 14
    line_gap = 5
    heights = [draw.textbbox((0, 0), line, font=bold if i == 0 else body)[3] for i, line in enumerate(lines)]
    panel_height = sum(heights) + line_gap + margin * 2
    top = image.height - panel_height
    draw.rectangle((0, top, image.width, image.height), fill=(15, 23, 42, 220))
    y = top + margin
    for i, line in enumerate(lines):
        draw.text((margin, y), line, font=bold if i == 0 else body, fill=(255, 255, 255, 255))
        y += heights[i] + line_gap
    target.parent.mkdir(parents=True, exist_ok=True)
    Image.alpha_composite(image, overlay).convert("RGB").save(target, quality=95)


def main() -> None:
    for target_name, source_name in CASES.items():
        screen_id = target_name.split("-")[2]
        add_overlay(SOURCE / source_name, OUTPUT / target_name, screen_id)
        print(OUTPUT / target_name)


if __name__ == "__main__":
    main()
