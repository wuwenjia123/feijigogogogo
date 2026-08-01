"""
edge-tts V2: 更贴合邓超声线的参数
邓超特征分析：
  - 音域：中低音（不是男高音！所以 pitch 要偏低）
  - 音色：略带沙哑/磁性（edge-tts 没法加沙哑，但 Yunxia/Yunjian 的低频更足）
  - 节奏：综艺腔，GOGOGO 是"逐字加重"，不是一串平调
  - 语调：每一个 GO 的语调略微上扬，最后"出发喽"要往下压（像喊口号）
所以：
  1) pitch 全部下调：-2Hz ~ +4Hz（之前是 +3~+8，太高了像少年音）
  2) rate 也略降：+8% ~ +16%（之前 +12~+20，太快了不够 man）
  3) 文本中间加停顿：用逗号分隔 GO, GO, GO, 出发喽！让 TTS 逐字加重
  4) 优先用 Yunxia（低沉男中音）和 Yunjian（稳重中低音），Yunyang 偏新闻腔放后面
"""
import asyncio
import os
import shutil

ROOT = os.path.dirname(os.path.abspath(__file__))
AUDIO_DIR = os.path.join(ROOT, "audio")
os.makedirs(AUDIO_DIR, exist_ok=True)

import edge_tts


async def gen(out_file, voice, text, rate="+12%", pitch="+2Hz", vol="+0%"):
    c = edge_tts.Communicate(text=text, voice=voice, rate=rate, pitch=pitch, volume=vol)
    await c.save(out_file)
    size = os.path.getsize(out_file)
    est = size / 16000.0
    name = os.path.basename(out_file)
    print(f"  {name:44s}  {size:7.1f}KB   ~{est:.1f}s   {voice}  r={rate} p={pitch}")


async def main():
    # ---- 第一主力：Yunxia（最低沉的中文男声，最接近邓超中低音）----
    print("[生成 1/7] 主版本 Yunxia 低沉磁性版（最像邓超的中低音）:")
    await gen(
        os.path.join(AUDIO_DIR, "dengchao-gogogo.mp3"),
        voice="zh-CN-YunxiaNeural",
        text="GO，GO，GO！出发喽！",
        rate="+10%", pitch="-1Hz", vol="+5%",
    )

    # ---- 第二主力：Yunjian（综艺感+低沉之间的平衡）----
    print("[生成 2/7] Yunjian 温柔激昂版（主力备选）:")
    await gen(
        os.path.join(AUDIO_DIR, "dengchao-gogogo-alt.mp3"),
        voice="zh-CN-YunjianNeural",
        text="GO，GO，GO！出发喽！",
        rate="+13%", pitch="+1Hz", vol="+3%",
    )

    # ---- 第三：Yunxia 更快节奏（喊口号的爆发力版，带"冲啊"尾音）----
    print("[生成 3/7] Yunxia 爆发力综艺版（加了语气词）:")
    await gen(
        os.path.join(AUDIO_DIR, "dengchao-gogogo-yunxia.mp3"),
        voice="zh-CN-YunxiaNeural",
        text="Go！Go！Go！出发喽，冲！",
        rate="+16%", pitch="+1Hz", vol="+8%",
    )

    # ---- 第四：Yunjian 念"狗狗狗 出发咯"（谐音梗更贴近原版）----
    print("[生成 4/7] Yunjian 谐音梗版（狗狗狗 出发咯）:")
    await gen(
        os.path.join(AUDIO_DIR, "dengchao-gogogo-yunjian-alt.mp3"),
        voice="zh-CN-YunjianNeural",
        text="狗！狗！狗！出发咯！",
        rate="+11%", pitch="+0Hz", vol="+4%",
    )

    # ---- 第五：Yunyang（新闻腔/播音腔，实在不喜欢低音时用）----
    print("[生成 5/7] Yunyang 播音腔热血版:")
    await gen(
        os.path.join(AUDIO_DIR, "dengchao-gogogo-yunyang.mp3"),
        voice="zh-CN-YunyangNeural",
        text="GO，GO，GO！出发喽！",
        rate="+9%", pitch="-2Hz", vol="+2%",
    )

    # ---- 第六：Yunxi（少年感冲刺版，给喜欢年轻声线的备选）----
    print("[生成 6/7] Yunxi 少年冲刺版（备选）:")
    await gen(
        os.path.join(AUDIO_DIR, "dengchao-gogogo-yunxi.mp3"),
        voice="zh-CN-YunxiNeural",
        text="GO！GO！GO！出发喽！",
        rate="+14%", pitch="+3Hz", vol="+0%",
    )

    # ---- 兜底别名（= 主版本拷贝）----
    shutil.copy2(
        os.path.join(AUDIO_DIR, "dengchao-gogogo.mp3"),
        os.path.join(AUDIO_DIR, "gogogo.mp3"),
    )
    print("[完成] 已拷贝 Yunxia 主版本为 gogogo.mp3 兜底别名")


if __name__ == "__main__":
    asyncio.run(main())
    print("\n✅ V2 版本（邓超声线优化）已生成！")
    print("   播放优先级: Yunxia低沉 → Yunjian平衡 → Yunxia爆发力 → Yunjian谐音 → Yunyang播音腔 → Yunxi少年")
    print("   如果觉得 Yunxia 太低沉不够燃 → 把 dengchao-gogogo-yunxia.mp3 重命名覆盖 dengchao-gogogo.mp3")
    print("   如果想要 100% 邓超原声 → 看旁边的 3 种无需VIP获取方法.txt")
