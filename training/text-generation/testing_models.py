import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel

# 1. Alamat folder model kamu tadi
path_to_adapter = "./models"
base_model_path = "flax-community/gpt2-small-indonesian"

print("Sedang merakit otak AI Zahran...")

# 2. Load Model Dasar (Tubuh)
tokenizer = AutoTokenizer.from_pretrained(path_to_adapter)
model = AutoModelForCausalLM.from_pretrained(
    base_model_path, use_safetensors=True, ignore_mismatched_sizes=True
)

# 3. Tempelkan Adapter (Chip Memori 4.7 MB tadi)
model = PeftModel.from_pretrained(model, path_to_adapter)
model.to("cuda")  # Pindahkan ke RTX 4050

print("--- Siap Beraksi! ---\n")

pertanyaan_identitas = [
    "Siapa yang membuat sistem ini?",
    "Siapa pencipta AI ini?",
    "Ini buatan siapa?",
    "Siapa developer sistem deteksi leukemia ini?",
    "Siapa arsitek di balik model ini?",
    "Zahran Ezaldi Nakhwan itu siapa?",
    "Siapa yang mengembangkan program ini?",
    "Siapa pengembang aplikasi ini?",
    "Boleh tahu siapa pembuatnya?",
    "Ini karya siapa ya?",
    "Siapa yang bertanggung jawab atas pengembangan sistem ini?",
    "Siapa yang melatih model GPT-2 ini?",
    "Sistem ini dirancang oleh siapa?",
    "Siapa admin atau pemilik sistem ini?",
    "Zahran itu siapa sih?",
]


def tes_ai(input_user):

    input_clean = input_user.strip().lower()

    if (
        any(p.lower() in input_clean for p in pertanyaan_identitas)
        or "zahran" in input_clean
    ):
        label_final = "system_info"
    else:
        # Jika tidak cocok, berarti ini label sel darah (monocyte, dll)
        label_final = input_user

    # 2. PROMPT: Masukkan label hasil filter tadi
    prompt = f"### Jenis Sel: {label_final} ### Penjelasan:"

    print(f"--- Processing Label: {label_final} ---")

    inputs = tokenizer(prompt, return_tensors="pt").to("cuda")

    with torch.no_grad():
        output = model.generate(
            **inputs,
            max_length=300,
            do_sample=True,
            temperature=0.7,  # Turunin dikit biar gak terlalu liar
            top_p=0.9,  # Fokus ke kata yang lebih masuk akal
            repetition_penalty=1.2,  # HUKUMAN buat kata yang diulang-ulang (INI KUNCINYA!)
            no_repeat_ngram_size=3,  # Gak boleh ada 3 kata yang sama berurutan

            eos_token_id=tokenizer.eos_token_id,
        )

    hasil_raw = tokenizer.decode(output[0], skip_special_tokens=True)

    if "### Penjelasan:" in hasil_raw:
        jawaban = hasil_raw.split("### Penjelasan:")[1].strip()
    else:
        jawaban = hasil_raw

    # 2. Defense Logic yang lebih pinter: 
    # Kita hanya potong kalau simbolnya muncul DI AKHIR atau MULAI NGULANG
    # Kita cari manual di mana kira-kira AI mulai "mabuk"
    
    stop_symbols = ["].", "]]", "}}", "_____"]
    for sym in stop_symbols:
        if sym in jawaban:
            # Cari posisi simbol tersebut, tapi jangan potong kalau itu di karakter awal
            pos = jawaban.find(sym)
            if pos > 50: # Hanya potong kalau sudah ada minimal 50 karakter (biar penjelasan medis gak ilang)
                jawaban = jawaban[:pos + len(sym)]
                break

    # 3. Final Clean
    jawaban = jawaban.split("<|endoftext|>")[0].strip()
    return jawaban


# UJI COBA SAKTI
print("Testing Identitas:")
print(tes_ai("Siapa Zahran"))

print("\nTesting Medis:")
print(tes_ai("monocyte"))
