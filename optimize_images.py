#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
优化大尺寸PNG图片,转换为WebP格式以提升移动端加载速度
"""

from PIL import Image
import os
import sys

# 设置输出编码为UTF-8
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def optimize_large_images():
    """优化public目录下的大尺寸PNG图片"""

    # 需要优化的图片列表
    images_to_optimize = [
        '2061.png',
        '2062.png',
        '2063.png',
        '2064.png',
        '2065.png'
    ]

    # 确保optimized目录存在
    os.makedirs('public/optimized', exist_ok=True)

    total_saved = 0

    for filename in images_to_optimize:
        source_path = f'public/{filename}'
        # 转换为webp格式
        target_filename = filename.replace('.png', '.webp')
        target_path = f'public/optimized/{target_filename}'

        if not os.path.exists(source_path):
            print(f"[SKIP] {filename} (file not found)")
            continue

        try:
            with Image.open(source_path) as img:
                # 转换RGBA为RGB
                if img.mode == 'RGBA':
                    # 创建白色背景
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    background.paste(img, mask=img.split()[3] if len(img.split()) == 4 else None)
                    img = background
                elif img.mode != 'RGB':
                    img = img.convert('RGB')

                # 如果图片太大,先缩小尺寸
                max_dimension = 1920
                if img.width > max_dimension or img.height > max_dimension:
                    ratio = min(max_dimension / img.width, max_dimension / img.height)
                    new_size = (int(img.width * ratio), int(img.height * ratio))
                    img = img.resize(new_size, Image.Resampling.LANCZOS)
                    print(f"   [RESIZE] {new_size[0]}x{new_size[1]}")

                # 保存为WebP,质量80%
                img.save(target_path, 'WebP', quality=80, method=6, optimize=True)

            # 显示压缩效果
            original_size = os.path.getsize(source_path)
            webp_size = os.path.getsize(target_path)
            saved = original_size - webp_size
            total_saved += saved
            compression_ratio = (1 - webp_size / original_size) * 100

            print(f"[OK] {filename} -> {target_filename}")
            print(f"   Original: {original_size/1024/1024:.2f}MB -> WebP: {webp_size/1024:.0f}KB")
            print(f"   Saved: {saved/1024/1024:.2f}MB ({compression_ratio:.1f}%)")
            print()

        except Exception as e:
            print(f"[ERROR] Failed to convert {filename}: {e}")
            print()

    print(f"Total saved: {total_saved/1024/1024:.2f}MB")
    print(f"\nSuggestion: Update image paths from /2061.png to /optimized/2061.webp")

if __name__ == "__main__":
    print("Starting image optimization...\n")
    optimize_large_images()
    print("\nOptimization complete!")

