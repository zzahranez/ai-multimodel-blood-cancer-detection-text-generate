from ultralytics import YOLO
import cv2
import numpy as np
import base64
from services.nlp_service import text_generate_service


model_dir = "../models/object_detection/best.pt"
model = YOLO(model_dir)
model.to('cuda')

class_names = ['basophil', 'erythroblast', 'monocyte', 'myeloblast', 'segmented_neuthrophil']
class_colors = {
    0: (255, 0, 0),   # basophil
    1: (0, 255, 0),   # erythroblast
    2: (0, 0, 255),   # monocyte
    3: (255, 255, 0), # myeloblast
    4: (255, 0, 255)  # segmented_neuthrophil
}

def detect_cell_service(images_bytes : bytes) -> dict:
    img = cv2.imdecode(np.frombuffer(images_bytes, np.uint8), cv2.IMREAD_COLOR)
    results = model.predict(
        source=img,
        conf=0.1,
        iou=0.7,
        imgsz=1024,
        max_det=300
    )
    r = results[0]

    boxes = r.boxes.xyxy.tolist() if r.boxes else []
    confidences = r.boxes.conf.tolist() if r.boxes else []
    classes_id = r.boxes.cls.tolist() if r.boxes else []
    print(f"Detected Classes: {classes_id}")

    class_names_list = [class_names[int(idx)] for idx in classes_id]
    unique_classes = list(set(class_names_list))
    
    explanations = {}
    for cls in unique_classes:
        result = text_generate_service(cls)   # langsung call function
        explanations[cls] = result
    
    #Canva the bounding box
    for box, conf, cls_id, cls_name in zip(boxes, confidences, classes_id, class_names_list):
        x1, y1, x2, y2 = [int(coord) for coord in box]
    
        color = class_colors[cls_id]
    
        cv2.rectangle(img, (x1, y1), (x2, y2), color, 2)
        label = f"{cls_name}: {conf:.2f}"
        cv2.putText(img, label, (x1, y1-5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
    
    _, buffer = cv2.imencode('.jpg', img)
    img_base64 = base64.b64encode(buffer).decode('utf-8')

    return {
        "classes": class_names_list,
        "image": img_base64,
        "explanations": explanations,
        "message": "Success"
       
    }


def get_api_info():
    return {
        "name": "Blood Cancer Object Detection API",
        "version": "1.0",
        "description": "API for detecting blood cancer cells using YOLO model.",
        "author": "Siska Nabela Putri"
        }
 
 