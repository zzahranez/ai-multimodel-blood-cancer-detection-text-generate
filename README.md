# 🩸 AI Multimodal Blood Cancer Detection

> **YOLO + GPT-2** | Multimodal AI for blood cancer detection and automated medical report generation

[![YOLO](https://img.shields.io/badge/YOLO-v8-blue)](https://github.com/ultralytics/ultralytics)
[![GPT-2](https://img.shields.io/badge/GPT-2-green)](https://github.com/openai/gpt-2)
[![FastAPI](https://img.shields.io/badge/FastAPI-blue)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)

## 📋 Description

This project uses **multimodal AI** (YOLO for vision + GPT-2 for language) to detect blood cancer cells from microscope images and automatically generate medical reports.

### 5 Blood Cell Classes:

| Class | Description |
|-------|-------------|
| 🟣 `myeloblast` | Key indicator of leukemia (AML) |
| 🔵 `seg_neutrophil` | Segmented neutrophil |
| 🟡 `monocyte` | Monocyte |
| 🟢 `basophil` | Basophil |
| 🔴 `erythroblast` | Red blood cell precursor |

## 🧠 Multimodal Architecture

## 📁 Project Structure
├── app/
│ ├── backend/ # FastAPI backend
│ └── frontend/ # React frontend
├── training/
│ ├── object-detection-yolo/ # YOLO training
│ └── text-generation/ # GPT-2 fine-tuning
└── data_test/ # Sample images


## 🚀 How to Run

### Backend (FastAPI)
```bash
cd app/backend
pip install -r requirements.txt
uvicorn main:app --reload


📊 Sample Output
Input: Microscope blood image
Output: Detection of abnormal blast cells with medical recommendations

📝 Notes
Dataset images not included in this repository (large files)

GPT-2 model (200MB) will be downloaded automatically when running

👩‍💻 Author
zzahranez

⭐ Star this repo if you find it useful!

---