from __future__ import annotations

import argparse
import sys
from pathlib import Path
from typing import Sequence

from voc_repository.assembly import AssemblyError
from voc_repository.pipeline import PipelineError, build_next_queue_markdown_from_payload, load_payload
from voc_repository.ranking import RankingError


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="voc-build-next-queue",
        description="Convert raw VOC evidence JSON into build-next queue markdown.",
    )
    parser.add_argument("payload", help="Path to a JSON file with top-level 'records' and 'signals' arrays.")
    parser.add_argument("--output", help="Write markdown to this path instead of stdout.")
    return parser


def main(argv: Sequence[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    try:
        payload = load_payload(args.payload)
        markdown = build_next_queue_markdown_from_payload(payload)

        if args.output:
            output_path = Path(args.output)
            output_path.parent.mkdir(parents=True, exist_ok=True)
            output_path.write_text(markdown, encoding="utf-8")
        else:
            print(markdown)
    except (AssemblyError, OSError, PipelineError, RankingError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    return 0


def run() -> None:
    raise SystemExit(main())


if __name__ == "__main__":
    run()
