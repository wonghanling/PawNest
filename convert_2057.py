#!/usr/bin/env python3
"""
临时脚本：仅处理2057.jpg转换为WebP格式
"""

from PIL import Image
import os

def convert_single_image():
    """只转换2057.jpg这一张图片"""
    source_path = 'public/2057.jpg'
    target_path = 'public/details/2057.webp'

    # 检查源文件是否存在
    if not os.path.exists(source_path):
        print(f"错误：找不到源文件 {source_path}")
        return False

    # 确保目标目录存在
    os.makedirs('public/details', exist_ok=True)

    try:
        # 打开并转换图片
        with Image.open(source_path) as img:
            # 如果是RGBA模式，转换为RGB
            if img.mode == 'RGBA':
                img = img.convert('RGB')

            # 保存为WebP格式，质量85%
            img.save(target_path, 'WebP', quality=85, optimize=True)

        # 显示文件大小信息
        original_size = os.path.getsize(source_path)
        webp_size = os.path.getsize(target_path)
        compression_ratio = (1 - webp_size / original_size) * 100

        print(f"✅ 成功转换 2057.jpg → 2057.webp")
        print(f"   原始大小: {original_size:,} bytes")
        print(f"   WebP大小: {webp_size:,} bytes")
        print(f"   压缩率: {compression_ratio:.1f}%")

        return True

    except Exception as e:
        print(f"❌ 转换失败: {e}")
        return False

if __name__ == "__main__":
    print("开始转换 2057.jpg...")
    success = convert_single_image()
    if success:
        print("转换完成！")
    else:
        print("转换失败！")