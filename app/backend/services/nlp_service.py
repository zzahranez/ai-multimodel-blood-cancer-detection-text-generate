# import torch
# from transformers import AutoModelForCausalLM, AutoTokenizer
# from peft import PeftModel
# import re

# print("Loading GPT-2 Indonesian LoRA model...")

# BASE_MODEL = "flax-community/gpt2-small-indonesian"
# ADAPTER_PATH = "./models/analysis_result"
# DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL)
# base_model = AutoModelForCausalLM.from_pretrained(
#     BASE_MODEL,
#     use_safetensors=True,
#     torch_dtype=torch.float16,
#     ignore_mismatched_sizes=True
# )
# model = PeftModel.from_pretrained(base_model, ADAPTER_PATH)
# model = model.to(DEVICE)
# model.eval()
# print(f"Model loaded on {DEVICE}. Precomputing explanations...")

# # Fungsi internal untuk generate teks (tanpa cache)
# def _generate_text(prompt: str, max_length: int = 150) -> str:
#     formatted_prompt = f"### Jenis Sel: {prompt} ### Penjelasan:"
#     inputs = tokenizer(formatted_prompt, return_tensors="pt").to(DEVICE)
#     with torch.no_grad():
#         outputs = model.generate(
#             **inputs,
#             max_length=max_length,
#             do_sample=False,  # greedy untuk deterministik dan cepat
#             repetition_penalty=1.2,
#             no_repeat_ngram_size=3,
#             eos_token_id=tokenizer.eos_token_id,
#             pad_token_id=tokenizer.eos_token_id
#         )
#     hasil_raw = tokenizer.decode(outputs[0], skip_special_tokens=True)
#     if "### Penjelasan:" in hasil_raw:
#         jawaban = hasil_raw.split("### Penjelasan:")[1].strip()
#     else:
#         jawaban = hasil_raw
#     # bersihkan stop symbols
#     stop_symbols = ["].", "]]", "}}", "_____"]
#     for sym in stop_symbols:
#         if sym in jawaban:
#             pos = jawaban.find(sym)
#             if pos > 50:
#                 jawaban = jawaban[:pos + len(sym)]
#                 break
#     jawaban = jawaban.split("<|endoftext|>")[0].strip()
#     return jawaban

# # Precompute untuk semua kemungkinan prompt
# precomputed_cache = {}

# # Daftar kelas sel darah
# cell_types = [
#     "monocyte", "basophil", "erythroblast", 
#     "myeloblast", "segmented_neutrophil"
# ]

# # Generate untuk setiap kelas sel
# for cell in cell_types:
#     print(f"  Precomputing for {cell}...")
#     precomputed_cache[cell] = _generate_text(cell, max_length=150)

# # Untuk pertanyaan identitas (label "system_info")
# # Kita akan gunakan prompt "system_info" (atau "siapa zahran")
# system_prompts = [
#     "system_info",
#     "siapa zahran?",
#     "Zahran Ezaldi Nakhwan itu siapa?"
# ]
# # Cukup generate satu kali untuk kategori ini
# print("  Precomputing for system_info...")
# system_answer = _generate_text("system_info", max_length=150)
# for p in system_prompts:
#     precomputed_cache[p] = system_answer

# print(f"Cache ready with {len(precomputed_cache)} entries.")

# # Daftar pertanyaan identitas (untuk deteksi)
# pertanyaan_identitas = [
#     "Siapa yang membuat sistem ini?",
#     "Siapa pencipta AI ini?",
#     "Ini buatan siapa?",
#     "Siapa developer sistem deteksi leukemia ini?",
#     "Siapa arsitek di balik model ini?",
#     "Zahran Ezaldi Nakhwan itu siapa?",
#     "Siapa yang mengembangkan program ini?",
#     "Siapa pengembang aplikasi ini?",
#     "Boleh tahu siapa pembuatnya?",
#     "Ini karya siapa ya?",
#     "Siapa yang bertanggung jawab atas pengembangan sistem ini?",
#     "Siapa yang melatih model GPT-2 ini?",
#     "Sistem ini dirancang oleh siapa?",
#     "Siapa admin atau pemilik sistem ini?",
#     "Zahran itu siapa sih?",
# ]



# def clean_generated_text(text: str) -> str:
#     text = re.sub(r'\[[^\]]+\]', '', text)
#     text = re.sub(r'_{2,}', '', text)
#     text = re.sub(r'eritropoiesis lanjutan\.\s*angiogenesis\.', '', text)
#     text = re.sub(r'\s+', ' ', text).strip()
#     if not text:
#         text = "Penjelasan tidak tersedia."
    
#     return text

# def text_generate_service(input_user: str):
#     input_clean = input_user.strip().lower()
#     is_identity = any(p.lower() in input_clean for p in pertanyaan_identitas) or "zahran" in input_clean
    
#     if is_identity:
#         return {
#             "message": "Success (cached)",
#             "response": precomputed_cache.get("system_info", "Maaf, informasi tidak tersedia.")
#         }
#     else:

#         if input_user in precomputed_cache:
#             return {
#                 "message": "Success (cached)",
#                 "response": precomputed_cache[input_user]
#             }
#         else:
    
#             jawaban = _generate_text(input_user, max_length=150)
#             jawaban = clean_generated_text(jawaban)
#             precomputed_cache[input_user] = jawaban
#             return {
#                 "message": "Success (generated on-the-fly)",
#                 "response": jawaban
#             }


import torch
import re
from transformers import AutoModelForCausalLM, AutoTokenizer

MODEL_PATH = "./models/gpt2-merged-temp"
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
tokenizer.pad_token = tokenizer.eos_token

model = AutoModelForCausalLM.from_pretrained(
    MODEL_PATH,
    torch_dtype=torch.float16,
    device_map="auto"
)
model.eval()

_cache = {}


TRIGGER_PHRASES = [
    "siapa yang membangun",
    "siapa yang membuat",
    "siapa pembuat",
    "siapa yang mengembangkan",
    "pembuat sistem",
    "yang bikin",
    # tambahkan variasi lain jika perlu
]


FALLBACK_MESSAGE = "Maaf saya tidak bisa memberikan informasi pribadi beliau 😅"



def clean_text(text: str) -> str:

    text = re.sub(r'\[[^\]]+\]', '', text)        
    text = re.sub(r'_{2,}', '', text)                     
    text = re.sub(r'\.\s*\]', '', text)                       
    text = re.sub(r'\s*\]\.?', '', text)                
    text = re.sub(r'[A-Z]{2,}[_A-Z0-9.]+', '', text)          
    text = re.sub(r'[A-Z]+_[A-Z_]+', '', text)           
    text = re.sub(r'\b[A-Z]{4,}\b', '', text)                 

    text = re.sub(r'[<>{}[\]]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    if text.endswith('.'):
        pass
    else:

        pass
    return text if text else "Penjelasan tidak tersedia"

def text_generate_service(prompt: str, max_length: int = 80) -> str:
    norm = prompt.strip().lower()

    if norm in _cache:
        return _cache[norm]
    print(f"Generating explanation for {prompt}...")

    formatted = f"### Jenis Sel: {prompt} ### Penjelasan:"
    inputs = tokenizer(formatted, return_tensors="pt").to(DEVICE)
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_length=max_length,
            do_sample=False,
            repetition_penalty=1.2,
            no_repeat_ngram_size=3,
            pad_token_id=tokenizer.eos_token_id
        )
   
    full_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    if "### Penjelasan:" in full_text:
        result = full_text.split("### Penjelasan:")[1].strip()
    else:
        result = full_text

    result = clean_text(result)

    # Tambahkan pesan fallback jika prompt mengandung kata kunci
    if any(phrase in norm for phrase in TRIGGER_PHRASES):
        result = f"{result}\n\n{FALLBACK_MESSAGE}"

    _cache[norm] = result

    return result



# Precompute untuk 5 jenis sel (biar pertama request sudah langsung ambil cache)
cell_types = ['monocyte', 'basophil', 'erythroblast', 'myeloblast', 'segmented_neutrophil']
for cell in cell_types:
    _cache[cell] = text_generate_service(cell)
print("Precomputed explanations for 5 cell types.")