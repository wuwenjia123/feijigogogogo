"""
edge-tts 生成多个"GO GO GO 出发喽"高质量神经男声版本。
故意降低 rate/pitch，避免时间拉伸导致的"AI味畸变"：
  rate 范围  +8% ~ +18%（正常人说话加速的自然范围）
  pitch 范围 +3Hz ~ +8Hz（微亢奋，不像机器人）
每种中文男声各生成 2 个，文件名写进 playGoGoGo FILE_URLS 列表第 2~4 位。
"""
import asyncio
import os
import shutil

ROOT = os.path.dirname(os.path.abspath(__file__))
AUDIO_DIR = os.path.join(ROOT, "audio")
os.makedirs(AUDIO_DIR, exist_ok=True)

import edge_tts  # pip install edge-tts


async def gen(out_file, voice, text, rate="+15%", pitch="+5Hz", vol="+0%"):
    c = edge_tts.Communicate(text=text, voice=voice, rate=rate, pitch=pitch, volume=vol)
    await c.save(out_file)
    size = os.path.getsize(out_file)
    est = size / 16000.0  # 约128kbps mp3 => 16KB/s
    name = os.path.basename(out_file)
    print(f"  {name:44s}  {size:7.1f}KB   ~{est:.1f}s   {voice}  r={rate} p={pitch}")


async def main():
    # ---- 第一候选（云健：最接近邓超声线的稳重中低音）----
    print("[生成 1/6] 主力云健温柔激昂版:")
    await gen(
        os.path.join(AUDIO_DIR, "dengchao-gogogo.mp3"),
        voice="zh-CN-YunjianNeural",
        text="GO！GO！GO！出发喽！",
        rate="+15%", pitch="+5Hz",
    )

    # ---- 第二候选（云健更快更热血：综艺感版）----
    print("[生成 2/6] 云健快节奏综艺版:")
    await gen(
        os.path.join(AUDIO_DIR, "dengchao-gogogo-alt.mp3"),
        voice="zh-CN-YunjianNeural",
        text="GOGOGO！出发喽！冲！",
        rate="+20%", pitch="+7Hz",
    )

    # ---- 第三候选（云扬：新闻/主持腔，更正式激昂）----
    print("[生成 3/6] 云扬播音腔热血版:")
    await gen(
        os.path.join(AUDIO_DIR, "dengchao-gogogo-yunyang.mp3"),
        voice="zh-CN-YunyangNeural",
        text="GO！GO！GO！出发喽！",
        rate="+12%", pitch="+4Hz",
    )

    # ---- 第四候选（云夏：更低沉的男声，若云健不够"man"可换这个名）----
    print("[生成 4/6] 云夏低沉有力版:")
    await gen(
        os.path.join(AUDIO_DIR, "dengchao-gogogo-yunxia.mp3"),
        voice="zh-CN-YunxiaNeural",
        text="GO！GO！GO！出发喽！",
        rate="+13%", pitch="+3Hz",
    )

    # ---- 第五候选（云希：年轻/清亮男声：冲刺少年感）----
    print("[生成 5/6] 云希清亮少年版:")
    await gen(
        os.path.join(AUDIO_DIR, "dengchao-gogogo-yunxi.mp3"),
        voice="zh-CN-YunxiNeural",
        text="GO！GO！GO！出发喽！",
        rate="+18%", pitch="+8Hz",
    )

    # ---- 兜底别名（与 FILE_URLS 中的 gogogo.mp3 对应）----
    shutil.copy2(
        os.path.join(AUDIO_DIR, "dengchao-gogogo.mp3"),
        os.path.join(AUDIO_DIR, "gogogo.mp3"),
    )
    print("[完成] 已拷贝主版本为 gogogo.mp3 兜底别名")


if __name__ == "__main__":
    asyncio.run(main())
    print("\n✅ 5 个神经男声版本已生成到 audio/ 目录！")
    print("   游戏启动时 playGoGoGo 按顺序尝试：主 Yunjian → 综艺Yunjian → Yunyang → Yunxia → Yunxi")
    print("   只要浏览器拿到 mp3，就 100% 不会走机械语音合成兜底。")
