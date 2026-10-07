"""Maakt de voorleesbestanden in audio/ met de natuurlijke Nederlandse ElevenLabs-stem 'Roos'.
Alleen gewijzigde teksten worden opnieuw gemaakt (audio/teksten.json houdt bij wat er al is).
Gebruik (vanuit de projectmap, node nodig):
  ../pizza-app/promo/.venv/bin/python tools/maak_audio.py
API-sleutel: ~/.config/elevenlabs/api_key"""
import json, pathlib, re, subprocess
from concurrent.futures import ThreadPoolExecutor
from elevenlabs.client import ElevenLabs

STEM = "7qdUFMklKPaaAVMsBTBt"  # Roos - Kind, Articulate and Confident (NL)
MODEL = "eleven_multilingual_v2"
INSTELLINGEN = {"stability": 0.45, "similarity_boost": 0.8, "style": 0.3, "use_speaker_boost": True}
EXTRA = {
    "tijd-om": "De tijd is om! Tik op het scherm voor de volgende stap.",
    "klaar": "Wauw, je slijm is klaar! Goed gedaan, echte slijm-professor!",
}


def spreekbaar(t):
    for a, b in [("1½", "anderhalve"), ("½", "halve"), ("¼", "kwart"), ("±", "ongeveer"), (" à ", " tot "),
                 (" ml", " milliliter"), ("'", "")]:
        t = t.replace(a, b)
    return re.sub(r"\s+", " ", t).strip()


data = json.loads(subprocess.check_output(["node", "-e",
    "eval(require('fs').readFileSync('data.js','utf8')+';process.stdout.write(JSON.stringify(RECEPTEN))')"]))
teksten = {f"{r['id']}-{i}": spreekbaar(s["t"] + (" " + s["x"] if s.get("x") else ""))
           for r in data for i, s in enumerate(r["stappen"])}
teksten.update(EXTRA)

map_ = pathlib.Path("audio"); map_.mkdir(exist_ok=True)
register_pad = map_ / "teksten.json"
register = json.loads(register_pad.read_text()) if register_pad.exists() else {}
taken = [(k, t) for k, t in teksten.items() if register.get(k) != t or not (map_ / f"{k}.mp3").exists()]

el = ElevenLabs(api_key=(pathlib.Path.home() / ".config/elevenlabs/api_key").read_text().strip())


def maak(taak):
    naam, tekst = taak
    for poging in range(3):
        try:
            audio = el.text_to_speech.convert(voice_id=STEM, model_id=MODEL, text=tekst,
                                              output_format="mp3_44100_96", voice_settings=INSTELLINGEN)
            (map_ / f"{naam}.mp3").write_bytes(b"".join(audio)); return
        except Exception:
            if poging == 2: raise


with ThreadPoolExecutor(3) as pool:
    list(pool.map(maak, taken))
# oude bestanden van verwijderde stappen opruimen
for f in map_.glob("*.mp3"):
    if f.stem not in teksten: f.unlink()
register_pad.write_text(json.dumps(teksten, ensure_ascii=False, indent=1))
print(len(taken), "nieuw gemaakt,", len(teksten), "totaal")
