import asyncio, os, shutil
ROOT = r"c:\Users\wwfsw\Documents\飞机大战"
AUDIO_DIR = os.path.join(ROOT, "audio")
import edge_tts

async def gen(out_file, voice, text, rate, pitch, vol="+0%"):
    c = edge_tts.Communicate(text=text, voice=voice, rate=rate, pitch=pitch, volume=vol)
    await c.save(out_file)
    size = os.path.getsize(out_file)
    print(f"  {os.path.basename(out_file)}  {size}B  voice={voice}")

async def main():
    # 补 yunxi（少年版）
    print("补生成 yunxi 少年冲刺版...")
    await gen(
        os.path.join(AUDIO_DIR, "dengchao-gogogo-yunxi.mp3"),
        voice="zh-CN-YunxiNeural",
        text="GO！GO！GO！出发喽！",
        rate="+14%", pitch="+3Hz", vol="+0%",
    )
    # 更新 gogogo.mp3 为最新主版本（yunxia）
    shutil.copy2(
        os.path.join(AUDIO_DIR, "dengchao-gogogo.mp3"),
        os.path.join(AUDIO_DIR, "gogogo.mp3"),
    )
    print("gogogo.mp3 已同步为 yunxia 主版本")

    # 验证所有文件非0
    for f in sorted(os.listdir(AUDIO_DIR)):
        if f.endswith(".mp3"):
            p = os.path.join(AUDIO_DIR, f)
            print(f"  ✅ {f:40s}  {os.path.getsize(p):>7d}B")

asyncio.run(main())
print("\n完成！")
