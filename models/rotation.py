from PIL import Image
import numpy as np

def rotate_img(filename,angle):
    image = Image.open(filename)
    img_rotated_data = image.rotate(angle)
    img_rotated_data.save("rotated_"+filename)
    
if __name__ == '__main__':
    
    rotate_img("jpeg_trial.jpg",180)
