"""Crop the fixed 3x3 King Cal CRT/VHS commercial archive sheet."""

from pathlib import Path
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "artwork" / "dealer-sheets" / "king-cal-commercial-archive-sheet.png"
OUTPUT_DIRECTORY = ROOT / "assets" / "images" / "dealer-web" / "cal-commercials"
OUTPUT_NAMES = [
    "cal-commercial-1982.png",
    "cal-commercial-1985.png",
    "cal-commercial-1988.png",
    "cal-commercial-1990.png",
    "cal-commercial-1992.png",
    "cal-commercial-1994.png",
    "cal-commercial-1996.png",
    "cal-commercial-1999.png",
    "cal-greatest-hits-cd.png",
]

# The generated square sheet is 1254px: three 418px cells. Seven pixels of
# inset trims the black contact-sheet gutters while preserving each CRT bezel.
CELL_SIZE = 418
INSET = 7


def main() -> None:
    OUTPUT_DIRECTORY.mkdir(parents=True, exist_ok=True)
    with Image.open(SOURCE) as image:
        if image.size != (1254, 1254):
            raise ValueError(f"{SOURCE} is {image.size}; expected 1254x1254")
        for index, output_name in enumerate(OUTPUT_NAMES):
            column = index % 3
            row = index // 3
            left = column * CELL_SIZE + INSET
            top = row * CELL_SIZE + INSET
            right = (column + 1) * CELL_SIZE - INSET
            bottom = (row + 1) * CELL_SIZE - INSET
            output_path = OUTPUT_DIRECTORY / output_name
            image.crop((left, top, right, bottom)).save(output_path, optimize=True)
            print(f"Wrote {output_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
