"""
简化版 edge-tts 生成：先不用 SSML/style，只用直接参数，避免时长异常。
目标：短于 3 秒、激昂的 GO GO GO 出发喽。
"""
import asyncio
import os
import shutil

AUDIO_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "audio")
os.makedirs(AUDIO_DIR, exist_ok=True)

import edge_tts


async def gen_mp3_simple(out_path, voice, rate, pitch, text):
    # 不用 SSML，直接传文本+参数，避免时长异常
    communicate = edge_tts.Communicate(
        text=text,
        voice=voice,
        rate=rate,
        pitch=pitch,
        volume="+0%",
    )
    await communicate.save(out_path)
    size = os.path.getsize(out_path)
    print(f"[OK] {out_path}  size={size/1024:.1f}KB  est_dur≈{size/16000:.1f}s")


async def main():
    # 1) 主力：Yunjian 男声（偏低沉，接近邓超声线）
    #    rate +35% = 喊口号的快速节奏
    #    pitch +10Hz = 更亢奋，更像综艺口号
    await gen_mp3_simple(
        os.path.join(AUDIO_DIR, "dengchao-gogogo.mp3"),
        voice="zh-CN-YunjianNeural",
        rate="+35%",
        pitch="+10Hz",
        text="GO！GO！GO！出发喽！",
    )

    # 2) 备选：更激昂的 Yunxi 男声（如果 Yunjian 不够热血）
    await gen_mp3_simple(
        os.path.join(AUDIO_DIR, "dengchao-gogogo-alt.mp3"),
        voice="zh-CN-YunxiNeural",
        rate="+40%",
        pitch="+14Hz",
        text="GOGOGO！出发喽！冲！",
    )

    shutil.copy2(
        os.path.join(AUDIO_DIR, "dengchao-gogogo.mp3"),
        os.path.join(AUDIO_DIR, "gogogo.mp3"),
    )
    print("[OK] copy to gogogo.mp3")


if __name__ == "__main__":
    asyncio.run(main())
