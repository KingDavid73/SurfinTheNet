"""Crop a regular generated contact sheet into named image assets."""

from pathlib import Path
import argparse

from PIL import Image


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("names", nargs="+")
    parser.add_argument("--columns", type=int, required=True)
    parser.add_argument("--rows", type=int, required=True)
    parser.add_argument("--inset-x", type=int, default=8)
    parser.add_argument("--inset-y", type=int, default=8)
    parser.add_argument("--size", type=int)
    args = parser.parse_args()

    if len(args.names) > args.columns * args.rows:
        parser.error("more names were supplied than the grid contains")

    args.output.mkdir(parents=True, exist_ok=True)
    with Image.open(args.source) as sheet:
        for index, name in enumerate(args.names):
            column = index % args.columns
            row = index // args.columns
            left = round(column * sheet.width / args.columns) + args.inset_x
            top = round(row * sheet.height / args.rows) + args.inset_y
            right = round((column + 1) * sheet.width / args.columns) - args.inset_x
            bottom = round((row + 1) * sheet.height / args.rows) - args.inset_y
            crop = sheet.crop((left, top, right, bottom))
            if args.size:
                crop.thumbnail((args.size, args.size), Image.Resampling.LANCZOS)
            crop.save(args.output / f"{name}.png", optimize=True)


if __name__ == "__main__":
    main()
