#!/usr/bin/env python3
"""
Create simple PNG icons without external dependencies
Uses only Python standard library
"""

import struct
import zlib
from pathlib import Path

def create_png(width, height, pixels):
    """
    Create a PNG file from scratch using only stdlib
    pixels: list of (r,g,b,a) tuples for each pixel
    """
    def png_chunk(chunk_type, data):
        chunk = chunk_type + data
        return struct.pack('>I', len(data)) + chunk + struct.pack('>I', zlib.crc32(chunk))

    # PNG signature
    png_data = b'\x89PNG\r\n\x1a\n'

    # IHDR chunk
    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)  # 6 = RGBA
    png_data += png_chunk(b'IHDR', ihdr)

    # IDAT chunk (image data)
    raw_data = b''
    for y in range(height):
        raw_data += b'\x00'  # Filter type
        for x in range(width):
            idx = y * width + x
            if idx < len(pixels):
                r, g, b, a = pixels[idx]
                raw_data += bytes([r, g, b, a])
            else:
                raw_data += bytes([0, 0, 0, 0])

    compressed = zlib.compress(raw_data, 9)
    png_data += png_chunk(b'IDAT', compressed)

    # IEND chunk
    png_data += png_chunk(b'IEND', b'')

    return png_data

def create_gradient_icon(size):
    """Create an icon with a gradient background and document symbol"""
    pixels = []

    for y in range(size):
        for x in range(size):
            # Gradient from purple to blue
            t = (x + y) / (2 * size)
            r = int(102 + (118 - 102) * t)
            g = int(126 + (75 - 126) * t)
            b = int(234 + (162 - 234) * t)
            a = 255

            # Document shape (white rectangle in center)
            doc_margin = size // 4
            doc_width = size // 2
            doc_height = int(size * 0.6)
            doc_x = (size - doc_width) // 2
            doc_y = (size - doc_height) // 2

            if (doc_x <= x < doc_x + doc_width and
                doc_y <= y < doc_y + doc_height):
                # Inside document area
                r, g, b = 255, 255, 255

                # Add horizontal lines for text
                line_height = max(1, size // 16)
                line_margin = doc_width // 8
                line_width = doc_width - 2 * line_margin

                for line_num in range(3):
                    line_y = doc_y + doc_height // 4 + line_num * (line_height * 2)
                    if (doc_x + line_margin <= x < doc_x + line_margin + line_width and
                        line_y <= y < line_y + line_height):
                        r, g, b = 102, 126, 234

            # Gold sparkle in corner
            sparkle_x = int(size * 0.75)
            sparkle_y = int(size * 0.25)
            sparkle_r = max(1, size // 8)

            dist_sq = (x - sparkle_x) ** 2 + (y - sparkle_y) ** 2
            if dist_sq < sparkle_r ** 2:
                r, g, b = 255, 215, 0  # Gold

            pixels.append((r, g, b, a))

    return create_png(size, size, pixels)

# Create icons
sizes = [16, 32, 48, 128]
icons_dir = Path(__file__).parent

for size in sizes:
    print(f"Creating icon{size}.png...")
    png_data = create_gradient_icon(size)
    filename = icons_dir / f"icon{size}.png"
    filename.write_bytes(png_data)
    print(f"✓ Created icon{size}.png ({len(png_data)} bytes)")

print("\n✓ All PNG icons created successfully!")
