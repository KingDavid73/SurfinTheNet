"""Crop a generated 3x3 contact sheet into nine reusable square-ish assets."""

from pathlib import Path
import argparse

from PIL import Image


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("names", nargs=9)
    parser.add_argument("--inset", type=int, default=12)
    parser.add_argument("--size", type=int, default=0, help="Optional square output size in pixels.")
    args = parser.parse_args()

    args.output.mkdir(parents=True, exist_ok=True)
    with Image.open(args.source) as sheet:
        for index, name in enumerate(args.names):
            column = index % 3
            row = index // 3
            left = round(column * sheet.width / 3) + args.inset
            top = round(row * sheet.height / 3) + args.inset
            right = round((column + 1) * sheet.width / 3) - args.inset
            bottom = round((row + 1) * sheet.height / 3) - args.inset
            cell = sheet.crop((left, top, right, bottom))
            if args.size > 0:
                cell = cell.resize((args.size, args.size), Image.Resampling.LANCZOS)
            cell.save(args.output / f"{name}.png", optimize=True)


if __name__ == "__main__":
    main()
