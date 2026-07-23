"""Crop the fixed 3x2 dealer photo sheets produced for the 1999 car-lot sites."""

from pathlib import Path
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SHEET_DIRECTORY = ROOT / "artwork" / "dealer-sheets"
OUTPUT_DIRECTORY = ROOT / "assets" / "images" / "dealer-web"

SHEETS = {
    "king-cal-campaign-sheet.png": [
        "cal-owner.png",
        "cal-sedan.png",
        "cal-minivan.png",
        "cal-pickup.png",
        "cal-office.png",
        "cal-lot.png",
    ],
    "honest-earl-campaign-sheet.png": [
        "earl-owner.png",
        "earl-hatchback.png",
        "earl-convertible.png",
        "earl-wagon.png",
        "earl-office.png",
        "earl-lot.png",
    ],
}

# The generated 1536x1024 sheets use eight-pixel outer borders and gutters.
CROP_BOXES = [
    (8, 8, 509, 508),
    (518, 8, 1018, 508),
    (1027, 8, 1528, 508),
    (8, 517, 509, 1016),
    (518, 517, 1018, 1016),
    (1027, 517, 1528, 1016),
]


def main() -> None:
    OUTPUT_DIRECTORY.mkdir(parents=True, exist_ok=True)
    for sheet_name, output_names in SHEETS.items():
        sheet_path = SHEET_DIRECTORY / sheet_name
        with Image.open(sheet_path) as image:
            if image.size != (1536, 1024):
                raise ValueError(f"{sheet_path} is {image.size}; expected 1536x1024")
            for box, output_name in zip(CROP_BOXES, output_names, strict=True):
                output_path = OUTPUT_DIRECTORY / output_name
                image.crop(box).save(output_path, optimize=True)
                print(f"Wrote {output_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
