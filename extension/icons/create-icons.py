#!/usr/bin/env python3
"""
Simple icon generator for Fake Data Extension
Creates basic PNG icons without external dependencies
"""

import base64
from pathlib import Path

# Minimal PNG files (1x1 colored pixels) encoded in base64
# These can be used as placeholders and replaced with better icons later

def create_simple_icon(size, color_r, color_g, color_b):
    """
    Create a simple colored square PNG
    This is a hack using a minimal PNG structure
    For production, use proper image libraries like Pillow
    """
    # For now, we'll create SVG files that Chrome can handle
    svg = f'''<svg width="{size}" height="{size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="{size}" height="{size}" fill="url(#grad)" rx="{size * 0.15}" />
  <rect x="{size * 0.25}" y="{size * 0.2}" width="{size * 0.5}" height="{size * 0.6}" fill="white" rx="{size * 0.05}" />
  <rect x="{size * 0.32}" y="{size * 0.35}" width="{size * 0.36}" height="{size * 0.06}" fill="#667eea" rx="{size * 0.02}" />
  <rect x="{size * 0.32}" y="{size * 0.45}" width="{size * 0.36}" height="{size * 0.06}" fill="#667eea" rx="{size * 0.02}" />
  <rect x="{size * 0.32}" y="{size * 0.55}" width="{size * 0.24}" height="{size * 0.06}" fill="#667eea" rx="{size * 0.02}" />
  <circle cx="{size * 0.75}" cy="{size * 0.25}" r="{size * 0.08}" fill="#ffd700" />
</svg>'''
    return svg

# Create icon files
sizes = [16, 32, 48, 128]
icons_dir = Path(__file__).parent

for size in sizes:
    svg_content = create_simple_icon(size, 102, 126, 234)
    filename = icons_dir / f"icon{size}.svg"
    filename.write_text(svg_content)
    print(f"Created icon{size}.svg")

print("\nSVG icons created!")
print("To convert to PNG, use one of these methods:")
print("1. Use ImageMagick: convert icon.svg icon.png")
print("2. Use an online converter like cloudconvert.com")
print("3. Install Pillow and cairosvg for Python: pip install Pillow cairosvg")
print("\nOr use the generate-icons.html file in a browser and save the canvases as PNG")
