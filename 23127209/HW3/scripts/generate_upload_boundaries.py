from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "evidence" / "test-assets"
SOURCE = ASSETS / "scenario-d-upload-test.png"


def main() -> None:
    image = SOURCE.read_bytes()
    oversize = bytearray(5 * 1024 * 1024 + 1024)
    oversize[: len(image)] = image
    (ASSETS / "scenario-d-oversize.png").write_bytes(oversize)
    for index in range(1, 7):
        (ASSETS / f"scenario-d-multi-{index}.png").write_bytes(image)
    print("Generated one >5 MB PNG and six count-boundary PNGs.")


if __name__ == "__main__":
    main()
