# AI Multimodal Blood Cancer Detection

#### **YOLO + GPT-2** | Multimodal AI for blood cancer detection and automated medical report generation

[![YOLO](https://img.shields.io/badge/YOLO-v11-blue)](https://github.com/ultralytics/ultralytics)
[![GPT-2](https://img.shields.io/badge/GPT-2-green)](https://github.com/openai/gpt-2)
=======
[![YOLO](https://img.shields.io/badge/YOLO-v11n-blue)](https://github.com/ultralytics/ultralytics)
[![GPT-2](https://img.shields.io/badge/GPT-2-Small--Indonesian-green)](https://huggingface.co/flax-community/gpt2-small-indonesian)
[![LoRA](https://img.shields.io/badge/LoRA-PEFT-orange)](https://github.com/huggingface/peft)
[![FastAPI](https://img.shields.io/badge/FastAPI-blue)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-cyan)](https://tailwindcss.com/)

## 📋 Description

Multimodal AI for blood cancer detection using **YOLO11n** (computer vision) + **GPT-2 Small Indonesian** (text generation) with **LoRA** fine-tuning.

### 5 Blood Cell Classes:

| Class | Description |
|-------|-------------|
| 🟣 `myeloblast` | Leukemia indicator (AML) |
| 🔵 `seg_neutrophil` | Segmented neutrophil |
| 🟡 `monocyte` | Monocyte |
| 🟢 `basophil` | Basophil |
| 🔴 `erythroblast` | Red blood cell precursor |

## 🧠 Models & Architecture

| Component | Model |
|-----------|-------|
| **Computer Vision** | YOLO11n (Ultralytics) |
| **Text Generation** | GPT-2 Small Indonesian (flax-community) |
| **Fine-tuning** | LoRA (PEFT) |
| **Backend** | FastAPI |
| **Frontend** | React + TailwindCSS v4 |

## 🔄 Multimodal Pipeline
Input Image → YOLO11n → Cell Detection → Feature Extraction → GPT-2 (LoRA) → Medical Report

## 📊 Dataset

**Source:** [Blood Cell Images for Cancer Detection]([https://www.kaggle.com/datasets/your-link](https://www.kaggle.com/datasets?search=blood+cell+cancer+image)) by Sumith Singh Kothwal (Kaggle)

**Modifications:**
- Re-labeled with bounding boxes (YOLO format)
- 5 cell classes: myeloblast, basophil, monocyte, erythroblast, seg_neutrophil
- Custom annotation for object detection

**License:** Open source (Kaggle / CC)

## 🙏 Acknowledgment

Thanks to **Sumith Singh Kothwal** for the original blood cell dataset on Kaggle.
Dataset used with modifications for bounding box object detection.


## 📁 Project Structure
```
app/
├── backend/
│ ├── main.py # FastAPI entry point
│ ├── models/ # YOLO & GPT-2 models
│ ├── services/ # NLP service
│ └── route/ # API routes
└── frontend/
├── src/ # React components
└── vite.config.ts # Vite + TailwindCSS

training/
├── object-detection-yolo/
│ ├── data.yaml # 5 class dataset config
│ ├── main.ipynb # YOLO11n training notebook
│ └── runs/ # Training results
└── text-generation/
├── main.ipynb # GPT-2 LoRA fine-tuning notebook
├── dataset_final.csv # Training data
└── lora/ # LoRA weights

data_test/ # Sample test images
```

## 🚀 How to Run

### 1. Backend (FastAPI)

```
cd app/backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. FrontEnd (React)
```
cd app/frontend
npm install
npm run dev
```

### 3. Train YOLO11n
```
cd training/object-detection-yolo
# Open main.ipynb in Jupyter/VS Code
```

### 4. Train GPT-2 with LoRA
```
cd training/text-generation
# Open main.ipynb
```

📊 Sample Output
Input: Blood microscope image
Output: Abnormal blast cell detection report with medical recommendations (in Indonesian language)

📝 Notes
Dataset images not included (large files)

Model weights stored separately

GPT-2 base model auto-downloads from HuggingFace

👩‍💻 Author
zzahranez

⭐ Star this repo if you find it useful!
