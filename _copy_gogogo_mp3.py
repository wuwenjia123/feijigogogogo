import shutil, os
ROOT = r"c:\Users\wwfsw\Documents\飞机大战"
AUDIO = os.path.join(ROOT, "audio")
src = os.path.join(AUDIO, "dengchao-gogogo.mp3")
dst = os.path.join(AUDIO, "gogogo.mp3")
if os.path.exists(src):
    shutil.copy2(src, dst)
    print(f"✅ 已拷贝 {os.path.getsize(src)}B  dengchao-gogogo.mp3 → gogogo.mp3")
else:
    print(f"❌ 源文件不存在: {src}")
print("\n当前 audio/ 目录下的文件:")
for f in sorted(os.listdir(AUDIO)):
    p = os.path.join(AUDIO, f)
    if os.path.isfile(p):
        print(f"   {f:45s}  {os.path.getsize(p):>7d}B")
