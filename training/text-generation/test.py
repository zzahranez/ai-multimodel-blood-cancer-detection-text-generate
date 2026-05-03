from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Menggunakan device: {device}")

# Load model
print("Loading model...")
model = AutoModelForCausalLM.from_pretrained(
    "flax-community/gpt2-small-indonesian",
    use_safetensors=True,
    ignore_mismatched_sizes=True
)
tokenizer = AutoTokenizer.from_pretrained("flax-community/gpt2-small-indonesian")
tokenizer.pad_token = tokenizer.eos_token
model = model.to(device)

print("Model siap!")
print("="*50)

# Test langsung tanpa loop
prompt = "apa itu myloblast ?"
inputs = tokenizer(prompt, return_tensors="pt").to(device)


outputs = model.generate(
    inputs.input_ids,
    attention_mask=inputs.attention_mask,
    max_new_tokens=50,
    do_sample=True,
    temperature=0.7,
)

result = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(f"Prompt: {prompt}")
print(f"Hasil: {result}")