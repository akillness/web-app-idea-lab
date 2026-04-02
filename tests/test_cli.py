from __future__ import annotations

import json
import os
import subprocess
import sys
from pathlib import Path


def _payload() -> dict[str, object]:
    return {
        "records": [
            {
                "record_id": "rec-1",
                "source_type": "support",
                "source_preset": "support ticket",
                "account_id": "acct-1",
                "account_name": "Acme",
                "arr_importance": 0.95,
                "recency": 0.9,
            }
        ],
        "signals": [
            {
                "signal_id": "sig-1",
                "record_id": "rec-1",
                "theme_id": "theme-roadmap",
                "canonical_label": "Commitment-safe roadmap updates",
                "signal_type": "support_escalation",
                "severity": 0.95,
                "commitment_risk": 1.0,
                "priority_override": 0.8,
                "override_reason": "renewal pressure",
                "evidence_span": "Customer asked for safer roadmap guidance before renewal.",
            }
        ],
    }


def _run_cli(repo_root: Path, *args: str) -> subprocess.CompletedProcess[str]:
    env = {**os.environ, "PYTHONPATH": str(repo_root / 'src')}
    return subprocess.run(
        [sys.executable, "-m", "voc_repository.cli", *args],
        cwd=repo_root,
        env=env,
        text=True,
        capture_output=True,
        check=False,
    )


def test_cli_writes_markdown_to_stdout_and_output_file(tmp_path: Path) -> None:
    repo_root = Path(__file__).resolve().parents[1]
    payload_path = tmp_path / "payload.json"
    payload_path.write_text(json.dumps(_payload()), encoding="utf-8")

    stdout_result = _run_cli(repo_root, str(payload_path))
    assert stdout_result.returncode == 0
    assert "# Build-Next Queue" in stdout_result.stdout
    assert "Commitment-safe roadmap updates" in stdout_result.stdout
    assert stdout_result.stderr == ""

    output_path = tmp_path / "out" / "queue.md"
    file_result = _run_cli(repo_root, str(payload_path), "--output", str(output_path))
    assert file_result.returncode == 0
    assert file_result.stdout == ""
    assert output_path.read_text(encoding="utf-8").startswith("# Build-Next Queue")


def test_cli_returns_non_zero_for_invalid_payload(tmp_path: Path) -> None:
    repo_root = Path(__file__).resolve().parents[1]
    payload_path = tmp_path / "payload.json"
    payload_path.write_text(json.dumps({"records": []}), encoding="utf-8")

    result = _run_cli(repo_root, str(payload_path))

    assert result.returncode == 1
    assert result.stdout == ""
    assert "missing required top-level key 'signals'" in result.stderr


def test_cli_returns_non_zero_for_invalid_json_and_output_write_errors(tmp_path: Path) -> None:
    repo_root = Path(__file__).resolve().parents[1]

    invalid_json_path = tmp_path / "invalid.json"
    invalid_json_path.write_text("{not valid json", encoding="utf-8")
    invalid_json_result = _run_cli(repo_root, str(invalid_json_path))
    assert invalid_json_result.returncode == 1
    assert "is not valid JSON" in invalid_json_result.stderr

    payload_path = tmp_path / "payload.json"
    payload_path.write_text(json.dumps(_payload()), encoding="utf-8")
    occupied_path = tmp_path / "occupied"
    occupied_path.write_text("not a directory", encoding="utf-8")

    write_error_result = _run_cli(repo_root, str(payload_path), "--output", str(occupied_path / "queue.md"))
    assert write_error_result.returncode == 1
    assert write_error_result.stdout == ""
    assert "Error:" in write_error_result.stderr
